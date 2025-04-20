'use client'
import { Suspense } from 'react';
import ErrorPage from '@/components/pages/error-page';
import Loader from '@/components/ui/loader';


export default function Errors() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <ErrorPage />
        </Suspense>
    )
}