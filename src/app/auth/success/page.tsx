'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

interface TokenData {
    access_token: string | null;
    token_type: string | null;
}
type TimerFunction = (redirectPath: string) => NodeJS.Timeout;

const OAuthSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [countdown, setCountdown] = useState<number>(5);
    const [otpVerified, setOtpVerified] = useState<boolean>(false);

    useEffect(() => {
        const startCountdownAndRedirect: TimerFunction = (redirectPath) => {
            const timer = setInterval(() => {
                setCountdown((prev: number) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.push(redirectPath);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return timer;
        };

        let timer: NodeJS.Timeout | undefined;

        // Extract token from URL hash
        const hash = window.location.hash.substring(1);
        if (hash) {
            try {
                const params = new URLSearchParams(hash);
                const tokenData: TokenData = {
                    access_token: params.get('access_token'),
                    token_type: params.get('token_type')
                };

                if (!tokenData.access_token) {
                    throw new Error('No access token found');
                }

                // Store token in localStorage
                localStorage.setItem('access_token', tokenData.access_token);
                if (tokenData.token_type) {
                    localStorage.setItem('token_type', tokenData.token_type);
                }
                timer = startCountdownAndRedirect('/user/dashboard');

            } catch (error) {
                console.error('Error processing token:', error);
                router.push('/auth/login?error=invalid_token');
            }
        } else {
            const isVerified = searchParams.get('otpVerified');
            if (!isVerified) {
                router.push('/auth/login?error=no_token');
            } else {
                setOtpVerified(true);
                timer = startCountdownAndRedirect('/auth/login');
            }
        }

        // Cleanup function to clear interval
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [router, searchParams, setCountdown, setOtpVerified]);


    return (
        <div className="h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Successfully Verified!
                </h1>

                <p className="text-gray-600 mb-4">
                    Your account has been successfully verified.
                    Redirecting to {otpVerified ? 'Login Page' : 'dashboard'} in {countdown} seconds...
                </p>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    />
                </div>

                <button
                    onClick={() => router.push(
                        otpVerified
                            ? '/auth/login'
                            : '/user/dashboard'
                    )}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                    Click here if you are not redirected automatically
                </button>
            </div>
        </div>
    );
};

export default OAuthSuccessPage;