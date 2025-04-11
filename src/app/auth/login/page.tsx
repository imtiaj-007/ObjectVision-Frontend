'use client'
import { Suspense } from 'react';
import LoginPageComponent from '@/components/pages/login-page';
import Loader from '@/components/ui/loader';


export default function LoginPage() {
    return (
        <Suspense fallback={<Loader fullScreen />}>
            <LoginPageComponent />
        </Suspense>
    )
}