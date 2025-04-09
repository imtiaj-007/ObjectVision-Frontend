'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BarChart2 } from 'lucide-react'

import Loader from '../ui/loader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import NotFoundImage from '../sections/image-not-found'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import { ResultsState } from '@/types/predictions'
import { useFileStates } from '@/hooks/use-file-states'
import { useDetection } from '@/hooks/use-detection'
import { formatDate } from '@/utils/general'
import { base64Hash } from '@/utils/hash'


export interface MediaCardProps {
    item: ResultsState;
    isLoading: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, isLoading }) => {
    const router = useRouter();
    const { presignedURLs } = useFileStates();
    const { addImagetoQueue } = useDetection();
    const [imageURL, setImageURL] = useState<string | undefined>();

    const handleViewDetails = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        addImagetoQueue(item);
        router.push(`/user/dashboard/predictions/${base64Hash(item.filename)}`);
    }

    useEffect(() => {
        const fileKey = item.cloud_file_path;
        if (!fileKey || !presignedURLs[fileKey]) return;
        setImageURL(presignedURLs[fileKey].url);

    }, [item.cloud_file_path, presignedURLs]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            <Link href="#" onClick={handleViewDetails} passHref>
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="relative p-0">
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                            {imageURL ? (
                                <Image
                                    src={imageURL}
                                    alt={item.filename}
                                    width={100}
                                    height={100}
                                    className="h-full w-full object-cover transition-all group-hover:scale-105"
                                    loading="lazy"
                                    unoptimized
                                />
                            ) : isLoading
                                ? <Loader className='w-full h-full' />
                                : <NotFoundImage />
                            }
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="line-clamp-1 text-[14px] font-semibold">{item.filename}</h3>
                                <p className="text-xs font-semibold text-muted-foreground mt-1">
                                    {formatDate(item.uploaded_at)}
                                </p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                                Image
                            </Badge>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4 pt-0">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <BarChart2 className="mr-1 h-4 w-4" />
                                <span>{
                                    item.results?.DETECTION?.total_objects
                                    ?? item.results?.SEGMENTATION?.total_objects
                                    ?? 0} predictions</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" >
                            View Details
                        </Button>
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    )
};

export default MediaCard;