'use client'
import React, { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Results } from "@/types/predictions";
import ResultCard from "./result-card";
import ObjectDetectionSummary from "./detection-summary";
import ClassificationSummary from "./classification-summary";
import PoseSummary from "./pose-summary";
import { useDetection } from "@/hooks/use-detection";
import { File_Storage } from "../../../cache/file_storage";
import { FileService } from "@/services/file_service";


export interface DetectionResultsDisplayProps {
    file_name: string;
};

const DetectionResultsDisplay: React.FC<DetectionResultsDisplayProps> = ({ file_name }) => {
    const [resultsState, setResultsState] = useState<Results | null>(null);
    const [presignedURLs, setPresignedURLs] = useState<Record<string, string>>({});
    const [fileIds, setFileIds] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    const { image_history } = useDetection();
    const detectionInitiatedRef = useRef<boolean>(false);
    const outputPathsRef = useRef<string[]>([]);


    const generatePresignedUrlForPath = useCallback(async (outputPath: string) => {
        const urlResult = await FileService.localPresignedURL({
            file_path: outputPath,
            expiry_minutes: 60
        });

        const presignedUrl = urlResult?.url?.toString();
        if (!presignedUrl) {
            throw new Error(`Failed to get presigned URL for ${outputPath}`);
        }

        setPresignedURLs(prev => ({ ...prev, [outputPath]: presignedUrl }));
        return presignedUrl;
    }, []);

    const fetchFileAndCreateBlob = async (presignedUrl: string, outputPath: string) => {
        const response = await fetch(presignedUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image from presigned URL: ${response.statusText}`);
        }
    
        const blob = await response.blob();
        const mimeType = blob.type || 'image/webp';
        const fileName = outputPath.split('/').pop() || 'image';
        const file = new File([blob], fileName, { type: mimeType });
    
        const fileId = outputPath;
        File_Storage.storeFile(fileId, file);
    
        return fileId;
    };

    const fetchImageForPath = useCallback(async (outputPath: string) => {
        setIsLoading(prev => ({ ...prev, [outputPath] : true }));
        try {
            let newPresignedUrl = presignedURLs[outputPath];            
            if (!newPresignedUrl)
                newPresignedUrl = await generatePresignedUrlForPath(outputPath);
            
            let newFileId = fileIds[outputPath];
            if (!newFileId && newPresignedUrl)
                newFileId = await fetchFileAndCreateBlob(newPresignedUrl, outputPath);

            if (newPresignedUrl !== presignedURLs[outputPath]) {
                setPresignedURLs(prev => ({ ...prev, [outputPath]: newPresignedUrl }));
            }
            
            if (newFileId && newFileId !== fileIds[outputPath]) {
                setFileIds(prev => ({ ...prev, [outputPath]: newFileId }));
            }
            return true;

        } catch (error) {
            return false;

        } finally {
            setIsLoading(prev => ({ ...prev, [outputPath]: false }));            
        }
    }, [fileIds, generatePresignedUrlForPath, presignedURLs]);


    const handleRetry = useCallback(async (outputPath: string) => {
        try {
            await fetchImageForPath(outputPath);
        } catch (error) {
            console.error(`Retry failed for ${outputPath}:`, error);
        }
    }, [fetchImageForPath]);


    const renderResultCards = useMemo(() => {
        if (!resultsState) return [];

        const cards: JSX.Element[] = [];
        const { detection, segmentation, classification, pose } = resultsState;

        if (detection && detection.predictions) {
            cards.push(
                <ResultCard
                    key={`detection_${detection.output_path}`}
                    title="Detection"
                    fileIds={fileIds}
                    outputPath={detection.output_path}
                    processingTime={detection.processing_time}
                    renderSummary={() => <ObjectDetectionSummary title={'Detection'} data={detection} />}
                    isLoading={isLoading[detection.output_path] || false}
                    onRetry={() => handleRetry(detection.output_path)}
                />
            );
        }

        if (segmentation && segmentation.predictions) {
            cards.push(
                <ResultCard
                    key={`segmentation_${segmentation.output_path}`}
                    title="Segmentation"
                    fileIds={fileIds}
                    outputPath={segmentation.output_path}
                    processingTime={segmentation.processing_time}
                    renderSummary={() => <ObjectDetectionSummary title={'Segmentation'} data={segmentation} />}
                    isLoading={isLoading[segmentation.output_path] || false}
                    onRetry={() => handleRetry(segmentation.output_path)}
                />
            );
        }

        if (classification && classification.predictions) {
            cards.push(
                <ResultCard
                    key={`classification_${classification.output_path}`}
                    title="Classification"
                    fileIds={fileIds}
                    outputPath={classification.output_path}
                    processingTime={classification.processing_time}
                    renderSummary={() => <ClassificationSummary data={classification} />}
                    isLoading={isLoading[classification.output_path] || false}
                    onRetry={() => handleRetry(classification.output_path)}
                />
            );
        }

        if (pose) {
            cards.push(
                <ResultCard
                    key={`pose_${pose.output_path}`}
                    title="Pose Estimation"
                    fileIds={fileIds}
                    outputPath={pose.output_path}
                    processingTime={pose.processing_time}
                    renderSummary={() => <PoseSummary data={pose} />}
                    isLoading={isLoading[pose.output_path] || false}
                    onRetry={() => handleRetry(pose.output_path)}
                />
            );
        }

        return cards;
    }, [resultsState, fileIds, isLoading, handleRetry]);

    useEffect(() => {
        if (image_history && !detectionInitiatedRef.current) {
            detectionInitiatedRef.current = true;
            const data = image_history[file_name] || null;
            setResultsState(data);
            console.log(data)

            if (data) {
                const { detection, segmentation, classification, pose } = data;

                // Collect all output paths that need presigned URLs
                const outputPaths = [
                    detection?.output_path,
                    segmentation?.output_path,
                    classification?.output_path,
                    pose?.output_path
                ].filter(Boolean) as string[];

                // Set Loading states for available services
                if (outputPaths.length > 0) {
                    outputPathsRef.current = outputPaths;

                    const newLoadingState = outputPaths.reduce((acc, path) => {
                        acc[path] = true;
                        return acc;
                    }, {} as Record<string, boolean>);
                    setIsLoading(newLoadingState);
                }
            }
        }
    }, [image_history, file_name]);

    useEffect(() => {
        if (outputPathsRef.current.length > 0) {
            const outputPaths = outputPathsRef.current;
            const fetchImages = async () => {
                await new Promise(resolve => setTimeout(resolve, 10000));
                await Promise.all(outputPaths.map(path => fetchImageForPath(path)));
            };
            fetchImages();
        }
    }, [fetchImageForPath]);

    // Clean up object URLs and Files when component unmounts
    useEffect(() => {
        return () => {
            Object.values(fileIds).forEach(fileId => {
                const file = File_Storage.getFile(fileId);
                if (file) {
                    URL.revokeObjectURL(URL.createObjectURL(file));
                }
                File_Storage.removeFile(fileId);
            });
            setPresignedURLs({});
            setFileIds({});
        };
    }, []);

    return (
        <div className="w-full space-y-6">
            {resultsState && renderResultCards}
        </div>
    );
};

export default DetectionResultsDisplay;