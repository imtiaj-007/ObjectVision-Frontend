'use client'
import React, { useEffect, useRef, useState } from "react";
import MediaCard from "./media-card";
import { ResultsState } from "@/types/predictions";
import { useFileStates } from "@/hooks/use-file-states";


interface MediaGridProps {
    media: ResultsState[] | undefined;
}

const MediaGrid: React.FC<MediaGridProps> = ({ media }) => {
    const { generatePresignedURL } = useFileStates();
    const [outputPaths, setOutputPaths] = useState<string[]>([]);
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const loadingIntervalInitiated = useRef<boolean>(false);

    const stopLoadingAfterInterval = async () => {
        if(loadingIntervalInitiated.current) return;
        loadingIntervalInitiated.current = true;
        
        await new Promise(resolve => {
            setTimeout(()=> resolve(null), 10000)
        });
        setLoadingStates(prevState => {
            const newState = { ...prevState };            
            Object.keys(newState).forEach(key => {
                newState[key] = false;
            });            
            return newState;
        });
    }

    useEffect(() => {
        if (media && media.length > 0) {
            const cloudPaths: string[] = [];
            const loaders: Record<string, boolean> = {};

            media.forEach(item => {
                if (item.cloud_file_path) {
                    loaders[item.cloud_file_path] = true;
                    cloudPaths.push(item.cloud_file_path);
                }
            });

            if (JSON.stringify(cloudPaths) !== JSON.stringify(outputPaths)) {
                setOutputPaths(cloudPaths);
                setLoadingStates(loaders);
            }
        }
    }, [media, outputPaths]);

    useEffect(() => {
        if (outputPaths.length > 0) {
            generatePresignedURL(undefined, outputPaths); 
            stopLoadingAfterInterval();           
        }
    }, [outputPaths, generatePresignedURL]);

    if (!media || media.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50">
                <p className="text-lg font-medium text-muted-foreground">
                    No media found
                </p>
                <p className="text-sm text-muted-foreground">
                    Process some media to see your predictions
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {media.map((item) => (
                <MediaCard
                    key={`media_item_${item.id}`}
                    item={item}
                    isLoading={item?.cloud_file_path
                        ? loadingStates[item?.cloud_file_path]
                        : false
                    } />
            ))}
        </div>
    )
}

export default MediaGrid;