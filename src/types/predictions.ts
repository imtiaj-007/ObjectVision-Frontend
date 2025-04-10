import { DbImageData } from "./media";
import { RequestParams } from "./detection";


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
    DETECTION?: DetectionResult;
    SEGMENTATION?: DetectionResult;
    CLASSIFICATION?: ClassificationResult;
    POSE?: PoseResult;
}

export interface ResultsState extends DbImageData {
    results: Results | null;
}

export interface ResultsStateResponse {
    data: ResultsState[];
    total_count: number;
    meta: RequestParams;
}

export interface PresignedUrlRequest{
    file_path: string;
    expiry_minutes?: number;
}

export interface PresignedUrlResponse{
    url: string;
    file_path?: string;
    expires_at?: string;
}