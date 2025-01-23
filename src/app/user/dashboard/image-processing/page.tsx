'use client'
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    UploadCloud,
    Image as ImageIcon,
    X,
    Loader2,
    ZoomIn,
    RotateCw,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ImageProcessing() {
    const [image, setImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedImage, setProcessedImage] = useState<string | null>(null);

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
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setProcessedImage(null);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setProcessedImage(null);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const processImage = useCallback(async () => {
        if (!image) return;

        setIsProcessing(true);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProcessedImage(image);
        setIsProcessing(false);
    }, [image]);

    const resetImages = useCallback(() => {
        setImage(null);
        setProcessedImage(null);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    <ImageIcon className="flex mr-3 h-10 w-10 mb-2" />
                    Image Processing
                </h1>
                <p className="text-muted-foreground">
                    Upload an image to detect and analyze objects
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Original Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!image ? (
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
                                    <p className="text-lg font-medium">Drag & Drop Image</p>
                                    <p className="text-sm text-muted-foreground">or</p>
                                    <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                                        Choose File
                                    </Button>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileInput}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <Image
                                    src={image}
                                    alt="Original"
                                    width={100}
                                    height={100}
                                    className="w-full h-auto rounded-lg"
                                />
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="absolute top-2 right-2"
                                    onClick={resetImages}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Processed Image Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Processed Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!processedImage ? (
                            <div className="border-2 border-dashed rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <p className="text-lg font-medium">Processing Image...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                                        <p className="text-lg font-medium">Processed image will appear here</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative">
                                <Image
                                    src={processedImage}
                                    width={100}
                                    height={100}
                                    alt="Processed"
                                    className="w-full h-auto rounded-lg"
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <Button size="icon" variant="outline">
                                        <ZoomIn className="h-4 w-4" />
                                    </Button>
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
                    onClick={resetImages}
                    disabled={!image || isProcessing}
                >
                    Reset
                </Button>
                <Button
                    onClick={processImage}
                    disabled={!image || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <RotateCw className="mr-2 h-4 w-4" />
                            Process Image
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}