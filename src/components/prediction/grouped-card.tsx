'use client'
import React from "react";
import { Prediction } from "@/types/predictions";

interface GroupedPredictionsProps {
    predictions: Prediction[];
}

const GroupedPredictions: React.FC<GroupedPredictionsProps> = ({ predictions }) => {
    const grouped = predictions.reduce<Record<string, { count: number; confidences: number[]; highestConfidence: number }>>((acc, pred) => {
        if (!acc[pred.class_name]) {
            acc[pred.class_name] = { count: 0, confidences: [], highestConfidence: 0 };
        }
        acc[pred.class_name].count += 1;
        const confidence = parseFloat(pred.confidence.toFixed(2));
        acc[pred.class_name].confidences.push(confidence);
        acc[pred.class_name].highestConfidence = Math.max(acc[pred.class_name].highestConfidence, confidence);
        return acc;
    }, {});

    const sortedEntries = Object.entries(grouped).sort((a, b) => b[1].count - a[1].count);

    return (
        <div className="flex-1 space-y-3 max-h-80 overflow-y-auto">
            {sortedEntries.map(([className, info]) => {
                const confidenceColor = getConfidenceColor(info.highestConfidence);

                return (
                    <div key={className} className="p-3 bg-gray-100 dark:bg-nav rounded-lg transition-colors">
                        <div className="flex text-nav-foreground justify-between items-center mb-2">
                            <span className="capitalize font-medium">{className}</span>
                            <span className="px-2 py-1 bg-gray-200 text-gray-800 dark:bg-gray-700/90 dark:text-yellow-500 rounded-md text-sm">
                                {info.count} {info.count === 1 ? 'instance' : 'instances'}
                            </span>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Confidence</span>
                                <span className={`font-medium ${confidenceColor}`}>
                                    {(info.highestConfidence * 100).toFixed(0)}%
                                </span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`${getConfidenceBarColor(info.highestConfidence)} h-2 rounded-full`}
                                    style={{ width: `${info.highestConfidence * 100}%` }}
                                ></div>
                            </div>

                            {info.confidences.length > 1 && (
                                <div className="text-xs text-gray-400 mt-1">
                                    All confidences: {info.confidences.sort((a, b) => b - a).map(conf =>
                                        `${(conf * 100).toFixed(0)}%`
                                    ).join(', ')}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Helper functions for confidence colors
function getConfidenceColor(confidence: number): string {
    if (confidence >= 0.9) return "text-green-600";
    if (confidence >= 0.7) return "text-blue-600";
    if (confidence >= 0.5) return "text-yellow-600";
    return "text-red-600 dark:text-red-500";
}

function getConfidenceBarColor(confidence: number): string {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.7) return "bg-blue-500";
    if (confidence >= 0.5) return "bg-yellow-500";
    return "bg-red-500 dark:text-red-500";
}

export default GroupedPredictions;