'use client'
import React from "react";
import { DetectionResult } from "@/types/predictions";
import GroupedPredictions from "./grouped-card";
import { CircleCheckBig, CircleAlert, Clock } from "lucide-react";
import { CardContent } from "../ui/card";

interface ObjectDetectionSummaryProps {
    title: string;
    data: DetectionResult;
}

const ObjectDetectionSummary: React.FC<ObjectDetectionSummaryProps> = ({ title, data }) => {
    if (!data || !data.predictions || data.predictions.length === 0) {
        return (
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                    <CircleAlert className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 font-medium">No objects detected</p>
                    <p className="text-sm text-gray-400 mt-1">Try uploading a different image</p>
                </div>
            </div>
        );
    }

    const sortedPredictions = [...data.predictions].sort((a, b) => {
        const countA = data.predictions.filter(p => p.class_name === a.class_name).length;
        const countB = data.predictions.filter(p => p.class_name === b.class_name).length;
        return countB - countA;
    });

    return (
        <CardContent className="space-y-4 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <CircleCheckBig className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-300">{title} Results</h3>
                </div>
                <div className="flex items-center gap-6">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                        {data.total_objects} objects
                    </span>
                    <span className="hidden text-xs text-gray-500 dark:text-gray-400 md:flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {data.processing_time.toFixed(2)}s
                    </span>
                </div>
            </div>
            <GroupedPredictions predictions={sortedPredictions} />
        </CardContent>
    );
};

export default ObjectDetectionSummary;