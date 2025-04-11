'use client'
import { Suspense } from 'react';
import SuccessDisplayPage from '@/components/pages/success-page';
import Loader from '@/components/ui/loader';


export default function SuccessPage() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <SuccessDisplayPage />
        </Suspense>
    )
}