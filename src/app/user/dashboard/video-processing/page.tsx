'use client';
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    UploadCloud,
    Video as VideoIcon,
    X,
    Loader2,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function VideoProcessing() {
    const [video, setVideo] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedVideo, setProcessedVideo] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setVideo(reader.result as string);
                setProcessedVideo(null);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setVideo(reader.result as string);
                setProcessedVideo(null);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const processVideo = useCallback(async () => {
        if (!video) return;

        setIsProcessing(true);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProcessedVideo(video); // In a real scenario, you would process the video here
        setIsProcessing(false);
    }, [video]);

    const resetVideos = useCallback(() => {
        setVideo(null);
        setProcessedVideo(null);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    <VideoIcon className="flex mr-3 h-10 w-10 mb-2" />
                    Video Processing
                </h1>
                <p className="text-muted-foreground">
                    Upload a video to process and analyze it
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Original Video</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!video ? (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={cn(
                                    "border-2 border-dashed rounded-lg p-8 text-center",
                                    "transition-colors duration-200",
                                    isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25"
                                )}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <UploadCloud className="h-12 w-12 text-muted-foreground/50" />
                                    <p className="text-lg font-medium">Drag & Drop Video</p>
                                    <p className="text-sm text-muted-foreground">or</p>
                                    <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                                        Choose File
                                    </Button>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handleFileInput}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <video
                                    src={video}
                                    controls
                                    className="w-full h-auto rounded-lg"
                                />
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="absolute top-2 right-2"
                                    onClick={resetVideos}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Processed Video Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Processed Video</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!processedVideo ? (
                            <div className="border-2 border-dashed rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <p className="text-lg font-medium">Processing Video...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <VideoIcon className="h-12 w-12 text-muted-foreground/50" />
                                        <p className="text-lg font-medium">Processed video will appear here</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative">
                                <video
                                    src={processedVideo}
                                    controls
                                    className="w-full h-auto rounded-lg"
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <Button size="icon" variant="outline">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <Button
                    variant="outline"
                    onClick={resetVideos}
                    disabled={!video || isProcessing}
                >
                    Reset
                </Button>
                <Button
                    onClick={processVideo}
                    disabled={!video || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <VideoIcon className="mr-2 h-4 w-4" />
                            Process Video
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};