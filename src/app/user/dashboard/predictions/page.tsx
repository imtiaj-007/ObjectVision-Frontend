'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDetection } from '@/hooks/use-detection'
import { Search, Filter, ListVideo, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import MediaGrid from '@/components/media/media-grid'
import { PaginationControls } from '@/components/sections/pagination-control'


const MediaPredictions: React.FC = () => {
    const searchParams = useSearchParams();
    const { total_image_count, getPredictions, loading, cachedPages, isPageCached } = useDetection();
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const queryParams = useMemo(() => {
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '6', 10);
        const search = searchParams.get('search') || '';
        const type = searchParams.get('type') || 'all';
        const totalPages = Math.ceil(total_image_count / limit) || 1;

        return {
            page: isNaN(page) ? 1 : page,
            limit: isNaN(limit) ? 6 : limit,
            totalPages,
            search,
            type,
        };
    }, [searchParams, total_image_count]);


    const currentPageItems = useMemo(() => {
        const cacheKey = `pageKey-${queryParams.page}-${queryParams.limit}`;
        if (isPageCached(cacheKey)) {
            setInitialLoading(false);
            return cachedPages[cacheKey];
        }
        return undefined;
    }, [queryParams, cachedPages, isPageCached]);


    useEffect(() => {
        const cacheKey = `pageKey-${queryParams.page}-${queryParams.limit}`;
        if (!isPageCached(cacheKey)) {
            setInitialLoading(true);
            getPredictions(queryParams).then(() => {
                setInitialLoading(false);
            });
        }
    }, [queryParams, getPredictions, isPageCached]);

    const showSkeleton = loading || initialLoading || total_image_count === -1 || !currentPageItems;

    return (
        <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-3xl font-bold tracking-tight">Predictions</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search predictions..."
                            className="pl-10"
                            defaultValue={queryParams.search}
                        />
                    </div>
                </div>
            </div>

            <Tabs defaultValue={queryParams.type} className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                    <TabsTrigger value="all">All Media</TabsTrigger>
                    <TabsTrigger value="image">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Images
                    </TabsTrigger>
                    <TabsTrigger value="video">
                        <ListVideo className="mr-2 h-4 w-4" />
                        Videos
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={queryParams.type}>
                    <div className="mt-6">
                        {showSkeleton ? (
                            <MediaGridSkeleton />
                        ) : (
                            <MediaGrid media={currentPageItems} />
                        )}
                        <div className="mt-8">
                            <PaginationControls
                                currentPage={queryParams.page}
                                totalPages={queryParams.totalPages}
                                hasNextPage={queryParams.page < queryParams.totalPages}
                                hasPrevPage={queryParams.page > 1}
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function MediaGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="flex flex-col p-4 border rounded-lg shadow-sm">
                    {/* Image placeholder */}
                    <Skeleton className="rounded-lg aspect-video w-full"></Skeleton>

                    {/* Text lines */}
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 rounded w-3/4"></Skeleton>
                        <Skeleton className="h-4 rounded w-1/2"></Skeleton>
                    </div>

                    {/* Button aligned to the right */}
                    <div className="mt-4 flex justify-end">
                        <Skeleton className="h-8 rounded w-24"></Skeleton>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MediaPredictions;