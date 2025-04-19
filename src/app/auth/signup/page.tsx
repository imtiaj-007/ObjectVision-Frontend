'use client'
import { Suspense } from 'react';
import SignupPage from '@/components/pages/signup-page';
import Loader from '@/components/ui/loader';


export default function SignUp() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <SignupPage />
        </Suspense>
    )
}