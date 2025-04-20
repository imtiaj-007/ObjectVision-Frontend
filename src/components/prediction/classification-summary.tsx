'use client'
import React from "react";
import { ClassificationResult } from "@/types/predictions";
import { CircleCheckBig, CircleAlert, Star, Trophy, Clock } from "lucide-react";

interface ClassificationSummaryProps {
    data: ClassificationResult;
}

const ClassificationSummary: React.FC<ClassificationSummaryProps> = ({ data }) => {
    if (!data || !data.predictions || data.predictions.length === 0) {
        return (
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                    <CircleAlert className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 font-medium">No classification results available</p>
                    <p className="text-sm text-gray-400 mt-1">Try uploading a different image</p>
                </div>
            </div>
        );
    }

    const { primary_class, top_5_predictions } = data.predictions[0];

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <CircleCheckBig className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-300">Classification Results</h3>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{data.processing_time.toFixed(2)}s</span>
                </div>
            </div>

            {/* Primary Classification */}
            <div className="bg-blue-50 dark:bg-blue-100 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-800">Primary Classification</h4>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-base font-semibold text-gray-800 capitalize">
                        {primary_class.class_name}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-300 rounded-full h-2 mt-1">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${primary_class.confidence * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-end">
                        <span className="text-sm font-medium text-blue-800">
                            {(primary_class.confidence * 100).toFixed(1)}% confidence
                        </span>
                    </div>
                </div>
            </div>

            {/* Top 5 Classifications */}
            <div className="bg-gray-50 dark:bg-nav p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-amber-500" />
                    <h4 className="font-medium text-gray-700 dark:text-gray-400">Other Possibilities</h4>
                </div>
                <div className="space-y-3">
                    {top_5_predictions.filter((_, i) => i > 0).map((pred, index) => {
                        const opacity = 1 - (index * 0.15);
                        return (
                            <div key={index} className="flex flex-col">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="capitalize text-sm font-medium text-gray-700 dark:text-gray-400">{pred.class_name}</span>
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                        {(pred.confidence * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-400 rounded-full h-2">
                                    <div
                                        className="bg-gray-500 dark:bg-gray-600 h-2 rounded-full"
                                        style={{
                                            width: `${pred.confidence * 100}%`,
                                            opacity: opacity
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ClassificationSummary;