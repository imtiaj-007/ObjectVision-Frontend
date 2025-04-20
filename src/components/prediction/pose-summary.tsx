'use client'
import React from "react";
import { PoseResult } from "@/types/predictions";
import { CircleCheckBig, CircleAlert, Activity, Users, Clock } from "lucide-react";

interface PoseSummaryProps {
    data: PoseResult;
}


const PoseSummary: React.FC<PoseSummaryProps> = ({ data }) => {
    if (!data || !data.predictions || data.predictions.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center p-6 rounded-t-lg bg-gray-100 dark:bg-gray-400">
                <div className="text-center">
                    <CircleAlert className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-700 mb-2" />
                    <p className="text-gray-500 dark:text-gray-800 font-medium">No pose data available</p>
                    <p className="text-sm text-gray-400 dark:text-gray-700 mt-1">Try uploading an image with people</p>
                </div>
            </div>
        );
    }

    // Assuming we have 17 keypoints per person (standard for COCO pose format)
    const keypointsPerPerson = 17;

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <CircleCheckBig className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-300">Pose Detection Results</h3>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                        {data.total_objects} {data.total_objects === 1 ? 'person' : 'people'}
                    </span>
                    <span className="hidden text-xs text-gray-500 dark:text-gray-400 md:flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{data.processing_time.toFixed(2)}s</span>
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
                {/* Person Count Card */}
                <div className="bg-purple-50 dark:bg-purple-200 p-4 rounded-lg border border-purple-100">
                    <div className="flex flex-col items-center">
                        <Users className="h-8 w-8 text-purple-600 mb-2" />
                        <span className="text-2xl font-bold text-purple-800">{data.total_objects}</span>
                        <span className="text-sm text-purple-700">
                            {data.total_objects === 1 ? 'Person' : 'People'} Detected
                        </span>
                    </div>
                </div>

                {/* Keypoints Card */}
                <div className="bg-indigo-50 dark:bg-indigo-200 p-4 rounded-lg border border-indigo-100">
                    <div className="flex flex-col items-center">
                        <Activity className="h-8 w-8 text-indigo-600 mb-2" />
                        <span className="text-2xl font-bold text-indigo-800">{keypointsPerPerson}</span>
                        <span className="text-sm text-indigo-700">Total Keypoints</span>
                    </div>
                </div>
            </div>

            {/* People List */}
            <div className="px-2">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Detected People</h4>
                <div className="space-y-3 max-h-72 overflow-y-auto">
                    {data.predictions.map((person, index) => {
                        const validKeypoints = person.keypoints.filter(kp => kp[0] !== 0 && kp[1] !== 0);
                        const validKeypointsCount = validKeypoints.length;
                        const avgConfidence = validKeypoints.reduce((sum, kp) => sum + kp[2], 0) / validKeypointsCount || 0;
                        const confidencePercent = (person.confidence * 100).toFixed(1);
                        const keypointConfidencePercent = (avgConfidence * 100).toFixed(1);

                        return (
                            <div key={index} className="p-3 bg-nav rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-gray-800 dark:text-gray-300">Person {index + 1}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-700/90 dark:text-yellow-500 px-2 py-1 rounded">
                                            {person.class_name}
                                        </span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {validKeypointsCount}/{keypointsPerPerson} keypoints
                                        </span>
                                    </div>
                                </div>

                                {/* Detection Confidence */}
                                <div className="space-y-1 mb-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Detection Confidence</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-400">{confidencePercent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-300 rounded-full h-2">
                                        <div
                                            className="bg-indigo-500 h-2 rounded-full"
                                            style={{ width: `${person.confidence * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Keypoint Confidence */}
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Keypoint Confidence</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-400">{keypointConfidencePercent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-300 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: `${avgConfidence * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PoseSummary;