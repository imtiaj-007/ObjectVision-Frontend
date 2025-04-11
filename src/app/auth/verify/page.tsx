'use client'
import { Suspense } from 'react';
import OTPVerification from '@/components/pages/verify-otp-page';
import Loader from '@/components/ui/loader';


export default function VerifyPage() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <OTPVerification />
        </Suspense>
    )
}