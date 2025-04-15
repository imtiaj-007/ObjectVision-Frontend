'use client'
import { Suspense } from 'react';
import ImageProcessingComponent from '@/components/pages/image-processing-page';
import Loader from '@/components/ui/loader';


export default function ImageProcessingPage() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <ImageProcessingComponent />
        </Suspense>
    )
}