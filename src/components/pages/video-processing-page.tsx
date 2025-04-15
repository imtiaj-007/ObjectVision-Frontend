'use client'
import { useState, useCallback } from "react";
import { UploadCloud, X, ArrowRight, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

import { AVAILABLE_MODELS, DetectionOperation, OPERATIONS } from "@/types/detection";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


const VideoProcessingComponent: React.FC = () => {
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);
    const [selectedOps, setSelectedOps] = useState<string[]>(OPERATIONS.map(op => op.name));
    const [confidence, setConfidence] = useState<number>(0.5);

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
            setVideoFile(file);

            const reader = new FileReader();
            reader.onload = () => {
                setVideoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            toast({
                variant: "destructive",
                title: "Unsupported Video Format",
                description: "Please upload a valid video file."
            });
        }
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const MAX_FILE_SIZE = 25 * 1024 * 1024;
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            toast({
                variant: "destructive",
                title: "Unsupported Video Format",
                description: "Please upload a valid video file."
            });
            return;
        }
        else if (file.size > MAX_FILE_SIZE) {
            toast({
                variant: "destructive",
                title: "File Too Large",
                description: "Maximum allowed file size is 25MB."
            });
            return;
        }
        else {
            setVideoFile(file);

            const reader = new FileReader();
            reader.onload = () => {
                setVideoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const toggleOperation = useCallback((opId: string) => {
        setSelectedOps(prev =>
            prev.includes(opId)
                ? prev.filter(id => id !== opId)
                : [...prev, opId]
        );
    }, []);

    const handleConfidenceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setConfidence(Number(e.target.value));
    }, []);

    const resetConfig = useCallback(() => {
        setVideoPreview(null);
        setVideoFile(null);
        setSelectedModel(AVAILABLE_MODELS[0]);
        setSelectedOps(OPERATIONS.map(op => op.name));
        setConfidence(0.5);
    }, []);

    const handleModelChange = (model_name: string) => {
        const model = AVAILABLE_MODELS.find(model => model.name === model_name) || AVAILABLE_MODELS[0];
        setSelectedModel(model);
    };

    const handleProcessVideo = useCallback(() => {
        toast({
            variant: "info",
            title: "Not Implemented",
            description: "Video processing coming soon!"
        });
    }, []);

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="header">
                <h2 className="flex items-start text-2xl font-bold">
                    <i className="inline-flex mr-2"><Video className="w-7 h-7" /></i>
                    Video Processing
                </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <div>
                                Upload Video
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-300 mt-2 md:flex items-center md:space-x-4">
                                    <p>Supported formats: MP4, AVI, MKV, WebM.</p>
                                    <p>Max size: 25MB.</p>
                                </div>
                            </div>
                            {videoPreview &&
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="hover:bg-red-500 hover:text-white"
                                    onClick={() => setVideoPreview(null)}
                                >
                                    <X className="size-5" />
                                </Button>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!videoPreview ? (
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
                                    <Button variant="ghost" onClick={() => document.getElementById('file-input')?.click()}>
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
                            <div className="flex justify-center">
                                <video
                                    src={videoPreview}
                                    controls
                                    className="w-full max-w-96 h-full max-h-80 object-cover object-center rounded-lg shadow-md border"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>


                {/* Configuration Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Processing Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Model Selection and Confidence Threshold */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Model Selection</label>
                                <Select value={selectedModel?.name} onValueChange={handleModelChange}>
                                    <SelectTrigger>
                                        <div className="flex items-center space-x-3">
                                            <span>{selectedModel ? <selectedModel.icon className="w-4 h-4" /> : null}</span>
                                            <span>{selectedModel ? selectedModel.label : "Select a model"}</span>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AVAILABLE_MODELS.map(model => (
                                            <SelectItem
                                                key={model.name}
                                                value={model.name}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="hidden md:block w-4 h-4">{<model.icon className="w-4 h-4" />}</div>
                                                    <div className="flex flex-col items-start">
                                                        <div className="font-medium">{model.label}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {model.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Confidence Threshold: {confidence}
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={confidence}
                                    onChange={handleConfidenceChange}
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Adjust the minimum confidence score for detection results
                                </p>
                            </div>
                        </div>

                        {/* Operations Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Operations</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {OPERATIONS.map((op: DetectionOperation) => (
                                    <div key={`operation_${op.name}`} className="flex items-start space-x-3">
                                        <Checkbox
                                            id={op.name}
                                            checked={selectedOps.includes(op.name)}
                                            onCheckedChange={() => toggleOperation(op.name)}
                                            className="mt-[6px]"
                                        />
                                        <div>
                                            <label
                                                htmlFor={op.name}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {op.label}
                                            </label>
                                            <p className="text-xs text-muted-foreground">
                                                {op.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <Button
                    variant="outline"
                    onClick={resetConfig}
                >
                    Reset All
                </Button>
                <Button
                    type="submit"
                    onClick={handleProcessVideo}
                    disabled={
                        !videoFile ||
                        !selectedModel ||
                        !selectedOps ||
                        selectedOps.length === 0
                    }
                >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Continue to Processing
                </Button>
            </div>
        </div>
    );
};

export default VideoProcessingComponent;