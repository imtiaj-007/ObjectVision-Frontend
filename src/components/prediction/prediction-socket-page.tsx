'use client'
import React, { useCallback, useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";

import { settings } from "@/configuration/config";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "@/hooks/use-socket";
import { useDetection } from "@/hooks/use-detection";
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
import { TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { File_Storage } from "../../../cache/file_storage";
import { toast } from "@/hooks/use-toast";
import { formatFileSize } from "@/utils/file_utils";


interface ImageDetectionResultProps {
    clientId: string;
    socketUrl: string;
    imageInfo: ImageInfoProps;
    setImageInfo: React.Dispatch<React.SetStateAction<ImageInfoProps>>;
}

const ImageDetectionResult: React.FC<ImageDetectionResultProps> = ({ clientId, socketUrl, imageInfo, setImageInfo }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        taskId,
        status,
        progress,
        error,
        data
    } = useSelector((state: RootState) => state.socketProcessing, isEqual);

    const { image_form_data, addImagetoQueue, performImageDetection, error: detectionError, resetErrors } = useDetection();
    const detectionInitiated = useRef(false);
    const reconnectAttempts = useRef(0);

    // Handle image processing
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
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                model: Object.entries(ModelSizeEnum).find(([_, value]) => value === modelSize)?.[0] || "ov_model_s",
                services: requestedServices ? requestedServices : []
            });
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            toast({
                variant: "destructive",
                description: "Failed to load Image Preview."
            })
            return;
        };

        img.src = objectUrl;
        if (!clientId) return;

        const updatedFormData = new FormData();
        updatedFormData.append("file", file);
        updatedFormData.append("model_size", modelSize);
        updatedFormData.append("requested_services", JSON.stringify(requestedServices));
        updatedFormData.append("client_id", clientId);

        dispatch(setStatus('Sending image for processing...'));
        try {
            await performImageDetection(updatedFormData);
        } catch (error) {
            dispatch(setError('Failed to initiate image detection'));
            console.error('Image detection error:', error);
        }
    }, [clientId, dispatch, performImageDetection, setImageInfo]);


    useEffect(() => {
        if (clientId && image_form_data?.file_id && !detectionInitiated.current) {
            const img_file = File_Storage.getFile(image_form_data.file_id);
            if (!img_file) return;

            processImage(
                img_file,
                image_form_data.model_size,
                image_form_data.requested_services
            );
            detectionInitiated.current = true;
        }
    }, [clientId, image_form_data, processImage]);

    const { isConnected, messages } = useSocket(socketUrl || "");


    useEffect(() => {
        if (!isConnected && detectionInitiated.current) {
            const reconnectTimer = setTimeout(() => {
                if (reconnectAttempts.current < settings.MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts.current += 1;
                    dispatch(setStatus(`Connection lost. Reconnecting (${reconnectAttempts.current}/${settings.MAX_RECONNECT_ATTEMPTS})...`));
                } else {
                    dispatch(setError('Connection lost and failed to reconnect. Please try again.'));
                }
            }, settings.RECONNECT_DELAY);

            return () => clearTimeout(reconnectTimer);
        } else if (isConnected) {
            reconnectAttempts.current = 0;
        }
    }, [isConnected, dispatch]);


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
            resetErrors();
        };
    }, []);


    return (
        <div className="space-y-6">
            <Card className="grid grid-cols-1 p-6 rounded-lg shadow-md">
                {/* Image Info Component */}
                <ImageInfo {...imageInfo} />

                {/* Processing Status Section */}
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

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Progress Section */}
                {detectionError ? (
                    <div className="p-6 bg-red-50 border border-red-200 rounded-2xl shadow-md text-center">
                        <div className="flex flex-col items-center">
                            <TriangleAlertIcon className="text-red-500 w-10 h-10 mb-3" />
                            <p className="text-lg font-semibold text-red-700">
                                You’ve reached your detection limit!
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
                    <div className="mb-6">
                        <p className="text-base font-semibold mb-2">{status}</p>
                        <Progress value={progress} className="w-full h-2 mb-4" />
                        <p className="text-right text-sm text-gray-600">{progress}% complete</p>
                    </div>
                )}

            </Card>

            {/* Results Section */}
            {progress === 100 && data
                ? <DetectionResultsDisplay file_name={data.filename} />
                : null
            }
        </div>
    );
};

export default ImageDetectionResult;