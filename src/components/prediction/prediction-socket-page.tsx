/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useCallback, useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useDetection } from "@/hooks/use-detection";
import { useSocket } from "@/hooks/use-socket";
import { toast } from "@/hooks/use-toast";
import { RefreshCwIcon, ServerCrashIcon, TriangleAlertIcon, X, XCircleIcon } from "lucide-react";
import {
    addMessage, resetSocketState, setError,
    setProgress, setResults, setStatus, setTaskId
} from "@/store/features/socket_processing/socketSlice";
import { WebSocketMessage } from "@/types/general";
import { ModelSizeEnum, WebSocketMessageTypeEnum } from "@/types/enums";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageInfo, { ImageInfoProps } from "@/components/sections/image-info";
import DetectionResultsDisplay from "@/components/prediction/detection_result";
import { Button } from "@/components/ui/button";
import { File_Storage } from "../../../cache/file_storage";
import { formatFileSize } from "@/utils/file_utils";
import Link from "next/link";


interface ImageDetectionResultProps {
    clientId: string;
    socketUrl: string;
    imageInfo: ImageInfoProps;
    setImageInfo: React.Dispatch<React.SetStateAction<ImageInfoProps>>;
}

const ImageDetectionResult: React.FC<ImageDetectionResultProps> = (
    { clientId, socketUrl, imageInfo, setImageInfo }
) => {
    const dispatch = useDispatch<AppDispatch>();
    const { taskId, status, progress, error, data } = useSelector((state: RootState) => state.socketProcessing, isEqual);
    const { image_form_data, addImagetoQueue, performImageDetection, error: detectionError, resetErrors } = useDetection();
    const { isConnected, isConnecting, messages } = useSocket(clientId, socketUrl);
    const detectionInitiated = useRef(false);


    const processImage = useCallback(async (file: File, modelSize: string, requestedServices: string[]) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            setImageInfo({
                preview: objectUrl,
                name: file.name,
                size: formatFileSize(file.size),
                dimensions: `${img.width} × ${img.height}`,
                type: file.type,
                uploadedAt: new Date().toLocaleString(),
                model: Object.entries(ModelSizeEnum).find(([_, value]) => value === modelSize)?.[0] || "ov_model_s",
                services: requestedServices ? requestedServices : []
            });
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            toast({
                variant: "destructive",
                description: "Failed to load Image Preview."
            });
        };

        img.src = objectUrl;

        if (!clientId || !isConnected) {
            if (!isConnected) {
                dispatch(setStatus('Waiting for connection to be established...'));
            }
            return;
        }

        const updatedFormData = new FormData();
        updatedFormData.append("file", file);
        updatedFormData.append("model_size", modelSize);
        updatedFormData.append("requested_services", JSON.stringify(requestedServices));
        updatedFormData.append("client_id", clientId);

        dispatch(setStatus('Sending image for processing...'));
        try {
            await new Promise((resolve) => { setTimeout(() => resolve(null), 3000) });
            await performImageDetection(updatedFormData);
        } catch (error) {
            dispatch(setError('Failed to initiate image detection'));
            console.error('Image detection error:', error);
        }
    }, [clientId, dispatch, performImageDetection, setImageInfo, isConnected]);

    const processWebSocketMessage = useCallback((message: WebSocketMessage) => {
        dispatch(addMessage(message));

        if (message.taskId && message.taskId !== taskId) {
            dispatch(setTaskId(message.taskId));
        }

        const messageType = message.type?.trim().toLowerCase();
        switch (messageType) {
            case WebSocketMessageTypeEnum.STATUS:
                if (message.message) {
                    dispatch(setStatus(message.message));
                }
                break;

            case WebSocketMessageTypeEnum.PROGRESS:
                dispatch(setProgress({
                    progress: message.progress ?? progress,
                    message: message.message
                }));
                break;

            case WebSocketMessageTypeEnum.RESULT:
                if (message.data && !isEqual(data, message.data)) {
                    dispatch(setResults(message.data));
                    addImagetoQueue(message.data);
                }
                break;

            case WebSocketMessageTypeEnum.ERROR:
                dispatch(setError(message.message || "An error occurred during processing"));
                break;

            default:
                console.log("Unknown message type:", message);
        }
    }, [taskId, progress, data, dispatch, addImagetoQueue]);

    const handleRetry = ()=> {
        
    }

    useEffect(() => {
        if (clientId && image_form_data?.file_id && !detectionInitiated.current && isConnected) {
            const img_file = File_Storage.getFile(image_form_data.file_id);
            if (!img_file) return;

            console.log("WebSocket connected, proceeding with image detection");
            processImage(
                img_file,
                image_form_data.model_size,
                image_form_data.requested_services
            );
            detectionInitiated.current = true;
        }
    }, [clientId, image_form_data, processImage, isConnected]);

    useEffect(() => {
        if (isConnecting && clientId && image_form_data?.file_id && !detectionInitiated.current) {
            dispatch(setStatus('Establishing WebSocket connection...'));
        }
    }, [isConnecting, clientId, image_form_data, dispatch]);

    useEffect(() => {
        if (messages.length > 0) {
            try {
                const latestMessage = messages[messages.length - 1];
                processWebSocketMessage(latestMessage);
            } catch (error) {
                console.error("Error processing WebSocket message:", error);
                dispatch(setError('Failed to process server message'));
            }
        }
    }, [messages, processWebSocketMessage, dispatch]);

    useEffect(() => {
        dispatch(resetSocketState());
        return () => {
            if (imageInfo.preview) {
                URL.revokeObjectURL(imageInfo.preview);
            }
            dispatch(resetSocketState());
            resetErrors();
        };
    }, []);

    return (
        <div className="space-y-6">
            <Card className="grid grid-cols-1 p-6 rounded-lg shadow-md">
                <ImageInfo {...imageInfo} />

                <div className="mb-6">
                    <h2 className="text-base font-bold mb-2">Image Processing Status</h2>
                    <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                        <span className="text-base">{isConnected ? "Connected" : "Not Connected"}</span>
                    </div>
                    {taskId && (
                        <p className="text-sm text-gray-500 mt-1">Task ID: {taskId}</p>
                    )}
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                {detectionError ?
                    detectionError?.status_code === 403 ? (
                        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl shadow-md text-center">
                            <div className="flex flex-col items-center">
                                <TriangleAlertIcon className="text-red-500 w-10 h-10 mb-3" />
                                <p className="text-lg font-semibold text-red-700">
                                    You&apos;ve reached your detection limit!
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    To continue using the detection feature, upgrade your plan or buy a top-up.
                                </p>
                            </div>
                            <div className="mt-4 flex justify-center gap-3">
                                <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Upgrade Plan
                                </Button>
                                <Button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                    Buy Top-up
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl shadow-lg text-center">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-6">
                                    <ServerCrashIcon className="text-red-500 w-16 h-16 animate-pulse" />
                                    <XCircleIcon className="text-orange-500 w-8 h-8 absolute -top-2 -right-2 animate-bounce" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Server Error
                                </h3>

                                <p className="text-gray-600 max-w-md mx-auto mb-6">
                                    Please retry. If this error persists, try again after some time.
                                </p>

                                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xs mx-auto">
                                    <Button
                                        onClick={handleRetry}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <RefreshCwIcon className="w-4 h-4" />
                                        Retry
                                    </Button>

                                    <Link href='/user/dashboard'>
                                        <Button
                                            variant="outline"
                                            className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-6">
                            <p className="text-base font-semibold mb-2">{status}</p>
                            <Progress value={progress} className="w-full h-2 mb-4" />
                            <p className="text-right text-sm text-gray-600">{progress}% complete</p>
                        </div>
                    )}
            </Card>

            {progress === 100 && data
                ? <DetectionResultsDisplay file_name={data.filename} />
                : null
            }
        </div>
    );
};

export default ImageDetectionResult;