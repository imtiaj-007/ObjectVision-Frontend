'use client'
import { Suspense } from 'react';
import ForgetPasswordPage from '@/components/pages/forget-password';
import Loader from '@/components/ui/loader';


export default function ForgetPassword() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <ForgetPasswordPage />
        </Suspense>
    )
}