'use client'
import { Suspense } from 'react';
import VideoProcessingComponent from '@/components/pages/video-processing-page';
import Loader from '@/components/ui/loader';


export default function ImageProcessingPage() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <VideoProcessingComponent />
        </Suspense>
    )
}