import { PathLike } from "fs";
import { JSX } from "react";

export interface Prediction {
    class_name: string;
    confidence: number;
}

export interface DetectionResult {
    predictions: Prediction[];
    total_objects: number;
    output_path: string;
    processing_time: number;
}

export interface ClassificationResult {
    predictions: {
        primary_class: Prediction;
        top_5_predictions: Prediction[];
    }[];
    output_path: string;
    processing_time: number;
}


interface PosePrediction extends Prediction {
    bbox: number[];
    keypoints: Array<[number, number, number]>;
}

export interface PoseResult {
    predictions: PosePrediction[];
    total_objects: number;
    output_path: string;
    processing_time: number;
}

export interface Results {
    detection?: DetectionResult;
    segmentation?: DetectionResult;
    classification?: ClassificationResult;
    pose?: PoseResult;
}

export interface ResultsStateResponse {
    filename: string;
    results: {
        detection?: DetectionResult;
        segmentation?: DetectionResult;
        classification?: ClassificationResult;
        pose?: PoseResult;
    } | null;
}


export interface ResultCardProps {
    title: string;
    fileIds: Record<string, string>;
    outputPath: string;
    processingTime: number;
    renderSummary: () => JSX.Element;
    isLoading: boolean;
    onRetry: () => void;
}

export interface PresignedUrlRequest{
    file_path: PathLike;
    expiry_minutes?: number;
}

export interface PresignedUrlResponse{
    url?: PathLike;
    file_path?: PathLike;
    expires_at?: string;
}