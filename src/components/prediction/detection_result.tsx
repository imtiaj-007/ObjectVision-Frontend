'use client'
import React, { JSX, useCallback, useEffect, useMemo, useState } from "react";
import { Results } from "@/types/predictions";
import ResultCard from "./result-card";
import ObjectDetectionSummary from "./detection-summary";
import ClassificationSummary from "./classification-summary";
import PoseSummary from "./pose-summary";
import { useDetection } from "@/hooks/use-detection";
import { File_Storage } from "../../../cache/file_storage";
import { useFileStates } from "@/hooks/use-file-states";
import { toast } from "@/hooks/use-toast";


export interface DetectionResultsDisplayProps {
    file_name: string;
    isPredictionData?: boolean;
};

const DetectionResultsDisplay: React.FC<DetectionResultsDisplayProps> = ({ file_name, isPredictionData = false }) => {
    const { queued_image, resetImageQueue } = useDetection();
    const { presignedURLs, fileURLs, generatePresignedURL, storeFileURLs } = useFileStates();
    const [resultsState, setResultsState] = useState<Results | null>(null);
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    const [outputPaths, setOutputPaths] = useState<string[]>([]);
    const [isDataInitialized, setIsDataInitialized] = useState(false);

    const fetchFileAndCreateBlob = useCallback(async (presignedUrl: string, outputPath: string) => {
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
        storeFileURLs([outputPath, fileId]);

        return fileId;
    }, [storeFileURLs]);

    const fetchImageForPath = useCallback(async (outputPath: string) => {
        setIsLoading(prev => ({ ...prev, [outputPath]: true }));
        try {
            const newPresignedUrl = presignedURLs[outputPath]?.url;
            if (!newPresignedUrl)
                await generatePresignedURL(outputPath, undefined, isPredictionData);
            return true;

        } catch (error) {
            console.error(`Error processing ${outputPath}:`, error);
            return false;

        } finally {
            setIsLoading(prev => ({ ...prev, [outputPath]: false }));
        }
    }, [generatePresignedURL, isPredictionData, presignedURLs]);


    const handleRetry = useCallback(async (outputPath: string) => {
        try {
            if (!presignedURLs[outputPath])
                await fetchImageForPath(outputPath);
            else if (!isPredictionData)
                await fetchFileAndCreateBlob(presignedURLs[outputPath].url, outputPath);
        } catch (error) {
            console.error(`Retry failed for ${outputPath}:`, error);
        }
    }, [fetchFileAndCreateBlob, fetchImageForPath, isPredictionData, presignedURLs]);


    const renderResultCards = useMemo(() => {
        if (!resultsState) return [];

        const cards: JSX.Element[] = [];
        const { DETECTION, SEGMENTATION, CLASSIFICATION, POSE } = resultsState;

        if (DETECTION && DETECTION.predictions) {
            cards.push(
                <ResultCard
                    key={`detection_${DETECTION.output_path}`}
                    title="Detection"
                    outputPath={DETECTION.output_path}
                    processingTime={DETECTION.processing_time}
                    renderSummary={() => <ObjectDetectionSummary title={'Detection'} data={DETECTION} />}
                    isLoading={isLoading[DETECTION.output_path] || false}
                    isPredictionData={isPredictionData}
                    onRetry={() => handleRetry(DETECTION.output_path)}
                />
            );
        }

        if (SEGMENTATION && SEGMENTATION.predictions) {
            cards.push(
                <ResultCard
                    key={`segmentation_${SEGMENTATION.output_path}`}
                    title="Segmentation"
                    outputPath={SEGMENTATION.output_path}
                    processingTime={SEGMENTATION.processing_time}
                    renderSummary={() => <ObjectDetectionSummary title={'Segmentation'} data={SEGMENTATION} />}
                    isLoading={isLoading[SEGMENTATION.output_path] || false}
                    isPredictionData={isPredictionData}
                    onRetry={() => handleRetry(SEGMENTATION.output_path)}
                />
            );
        }

        if (CLASSIFICATION && CLASSIFICATION.predictions) {
            cards.push(
                <ResultCard
                    key={`classification_${CLASSIFICATION.output_path}`}
                    title="Classification"
                    outputPath={CLASSIFICATION.output_path}
                    processingTime={CLASSIFICATION.processing_time}
                    renderSummary={() => <ClassificationSummary data={CLASSIFICATION} />}
                    isLoading={isLoading[CLASSIFICATION.output_path] || false}
                    isPredictionData={isPredictionData}
                    onRetry={() => handleRetry(CLASSIFICATION.output_path)}
                />
            );
        }

        if (POSE) {
            cards.push(
                <ResultCard
                    key={`pose_${POSE.output_path}`}
                    title="Pose Estimation"
                    outputPath={POSE.output_path}
                    processingTime={POSE.processing_time}
                    renderSummary={() => <PoseSummary data={POSE} />}
                    isLoading={isLoading[POSE.output_path] || false}
                    isPredictionData={isPredictionData}
                    onRetry={() => handleRetry(POSE.output_path)}
                />
            );
        }
        return cards;
    }, [resultsState, isLoading, isPredictionData, handleRetry]);


    const initializeLoaders = useCallback((data: Results) => {
        const { DETECTION, SEGMENTATION, CLASSIFICATION, POSE } = data;

        // Collect all output paths that need presigned URLs
        const outputPaths = [
            DETECTION?.output_path,
            SEGMENTATION?.output_path,
            CLASSIFICATION?.output_path,
            POSE?.output_path
        ].filter(Boolean) as string[];

        // Set Loading states for available services
        if (outputPaths.length > 0) {
            setOutputPaths(outputPaths);

            const newLoadingState = outputPaths.reduce((acc, path) => {
                acc[path] = true;
                return acc;
            }, {} as Record<string, boolean>);
            setIsLoading(newLoadingState);
        }
    }, []);

    useEffect(() => {
        if (queued_image && queued_image.filename === file_name) {
            const data = queued_image.results;

            if (!data) {
                toast({
                    variant: "destructive",
                    description: "Unexpected Error: Detection data not found. Please try again."
                });
                return;
            }
            setResultsState(data);
            initializeLoaders(data);
            setIsDataInitialized(true);
        }
    }, [file_name, queued_image, initializeLoaders]);

    useEffect(() => {
        if (outputPaths.length > 0) {
            outputPaths.forEach(outputPath => {
                const presignedUrl = presignedURLs[outputPath];
                if (!fileURLs[outputPath] && presignedUrl && !isPredictionData)
                    fetchFileAndCreateBlob(presignedUrl.url, outputPath);
            });
        }
    }, [outputPaths, presignedURLs, fileURLs, fetchFileAndCreateBlob, isPredictionData]);

    useEffect(() => {
        if (outputPaths.length > 0) {
            const fetchImages = async () => {
                await new Promise(resolve =>
                    setTimeout(() =>
                        resolve(console.log("Fetching Images"))
                        , 10000));
                await Promise.all(outputPaths.map(path => fetchImageForPath(path)));
            };
            fetchImages();
        }
    }, [outputPaths, fetchImageForPath]);

    // Clean up object URLs and Files when component unmounts
    useEffect(() => {
        return () => {
            resetImageQueue();
            Object.values(fileURLs).forEach(fileId => {
                const file = File_Storage.getFile(fileId);
                if (file) {
                    URL.revokeObjectURL(URL.createObjectURL(file));
                }
                File_Storage.removeFile(fileId);
            });
        };
    }, [fileURLs, resetImageQueue]);

    if (!isDataInitialized) {
        return <div className="w-full flex justify-center p-8">Loading results...</div>;
    }

    return (
        <div className="w-full space-y-6">
            {resultsState && renderResultCards.length > 0 ? (
                renderResultCards
            ) : (
                <div className="w-full flex justify-center p-8">No results available</div>
            )}
        </div>
    );
};

export default React.memo(DetectionResultsDisplay);