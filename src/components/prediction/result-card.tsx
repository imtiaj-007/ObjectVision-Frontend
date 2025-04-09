'use client';
import React, { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, RefreshCw } from 'lucide-react';
import Loader from '../ui/loader';
import { Button } from '../ui/button';
import { File_Storage } from '../../../cache/file_storage';
import ImageDownloader from '../sections/image-downloader';
import { Card } from '../ui/card';
import { useFileStates } from '@/hooks/use-file-states';


export interface ResultCardProps {
    title: string;
    outputPath: string;
    processingTime: number;
    renderSummary: () => JSX.Element;
    isLoading: boolean;
    isPredictionData?: boolean;
    onRetry: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
    outputPath,
    renderSummary,
    isLoading,
    isPredictionData = false,
    onRetry
}) => {
    const { presignedURLs, fileURLs } = useFileStates();
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        if (imageURL) return;

        let url: string | undefined | null = presignedURLs[outputPath]?.url;
        if (!isPredictionData && fileURLs[outputPath]) 
            url = File_Storage.getBlobUrl(outputPath);
        if (url) setImageURL(url);

    }, [fileURLs, imageURL, isPredictionData, outputPath, presignedURLs]);

    useEffect(() => {
        return () => {
            if (imageURL && !isPredictionData) {
                URL.revokeObjectURL(imageURL);
            }
        };
    }, [])

    return (
        <>
            {/* Full-Screen Zoom Modal */}
            <AnimatePresence>
                {isZoomed && imageURL && (
                    <motion.div
                        className="fixed inset-0 w-full h-full bg-black/75 flex items-center justify-center z-50"
                        style={{ margin: "0px" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomed(false)}
                    >
                        <motion.img
                            src={imageURL}
                            alt="Zoomed Image"
                            className="w-11/12 md:w-2/3 max-h-[95vh] object-contain cursor-pointer"
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-4 min-h-80">
                {/* Left Side - Summary */}
                <Card className="flex flex-col justify-between h-full">
                    {/* Summary Insights */}
                    {renderSummary()}

                    {/* Download Section */}
                    <ImageDownloader
                        outputPath={outputPath}
                        imageURL={imageURL}
                    />
                </Card>

                {/* Right Side - Image Preview */}
                <Card className="flex justify-center items-center overflow-hidden relative h-full">
                    <div
                        className="h-full max-h-96 flex items-center justify-center relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isLoading ? (
                            <Loader className="w-full h-full" />
                        ) : (
                            <div className="relative w-full h-full">
                                {!imageURL ? (
                                    <div className="flex h-full">
                                        <div className="space-y-4 text-center m-auto">
                                            <Button onClick={onRetry}>
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Retry Loading
                                            </Button>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">It may take upto 1 minute for the image to be availale. <br />Please try again after a while.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Image */}
                                        <Image
                                            src={imageURL}
                                            alt="Result Image"
                                            width={500}
                                            height={400}
                                            className="w-full h-full object-contain"
                                            unoptimized
                                        />

                                        {/* Zoom Overlay */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        className="bg-white/80 p-[10px] rounded-full shadow-lg hover:bg-white transition-all"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsZoomed(true);
                                                        }}
                                                    >
                                                        <Maximize className="h-6 w-6 text-gray-800" />
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default ResultCard;
