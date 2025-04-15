'use client'
import { Suspense } from 'react';
import MediaPredictions from '@/components/pages/media-prediction-page';
import Loader from '@/components/ui/loader';


export default function PredictionPage() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <MediaPredictions />
        </Suspense>
    )
}