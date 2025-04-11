'use client'
import { Suspense } from 'react';
import PredictionDisplayPage from '@/components/pages/prediction-display-page';
import Loader from '@/components/ui/loader';


export default function PredictionDisplay() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <PredictionDisplayPage />
        </Suspense>
    )
}