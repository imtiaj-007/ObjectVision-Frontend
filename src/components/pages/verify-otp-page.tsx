'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { Timer } from 'lucide-react';

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WebsiteOverview from '@/components/sections/website-overview';

// Services & helpers
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { OTPUrlObj } from '@/types/auth';
import { OTPUrlSchema, OTPVerifySchema } from '@/schemas/auth';
import { base64Decode } from '@/utils/hash';
import { isCustomError } from '@/types/general';


const OTPVerification: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { resendOTP, loading, verifyOTP } = useAuth();
    const { toast } = useToast();

    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [canResend, setCanResend] = useState<boolean>(true);
    const [urlData, setUrlData] = useState<OTPUrlObj | null>(null);
    const inputRefs = useRef<Array<React.RefObject<HTMLInputElement | null>>>(
        Array(6).fill(0).map(() => React.createRef<HTMLInputElement>())
    );

    // Handle OTP input changes
    const handleOtpChange = (index: number, value: string): void => {
        if (!/^\d*$/.test(value)) {
            toast({
                variant: "default",
                title: "Invalid OTP Character",
                description: "Only numeric values are allowed, i.e. 0-9",
            });
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].current?.focus();
        }
    };

    const handleVerify = async (): Promise<void> => {
        if (!urlData) return;

        try {
            const otpCode = otp.join('');

            if (otpCode.length !== 6 || !otpCode.match(/^\d{6}$/)) {
                toast({
                    variant: "warning",
                    title: "Invalid OTP",
                    description: "Please enter a complete 6-digit OTP",
                });
                return;
            }

            const payload = OTPVerifySchema.parse({
                ...urlData,
                otp: otpCode
            });

            try {
                const res = await verifyOTP(payload);

                if (res) {
                    router.push('/auth/success?type=otp-verified');
                } else {
                    setOtp(new Array(6).fill(""));
                    toast({
                        variant: "destructive",
                        title: "OTP Mismatch",
                        description: "Invalid OTP. Please try again.",
                    });
                }
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Verification Failed",
                    description: isCustomError(error) ? error.message : "An unexpected error occurred",
                });
            }
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                toast({
                    variant: "destructive",
                    title: "Validation Error",
                    description: validationError.errors.map(error => error.message).join("\n"),
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "An unexpected error has occurred",
                });
            }
        }
    };

    const handleResendOTP = async (): Promise<void> => {
        if (!urlData || !canResend || loading.resendOTP) return;

        try {
            const res = await resendOTP(urlData);
            toast({
                variant: "default",
                title: "Success",
                description: res.message || "New OTP has been sent successfully",
            });

            setTimeLeft(60);
            setCanResend(false);
        } catch (error) {
            if (isCustomError(error)) {
                toast({
                    variant: error.status_code === 429 ? "warning" : "destructive",
                    title: error.status_code === 429 ? "Too Many Requests" : "Failed to Resend",
                    description: error.message || "Failed to resend OTP",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to resend OTP",
                });
            }
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timeLeft]);

    useEffect(() => {
        if (!urlData && searchParams) {
            const uid = searchParams.get('uid');
            const token = searchParams.get('token');

            if (uid && token) {
                try {
                    const id = base64Decode(uid);
                    const email = base64Decode(token);

                    const result = OTPUrlSchema.safeParse({
                        user_id: id,
                        email: email,
                    });

                    if (result.success) {
                        setUrlData(result.data);
                    } else {
                        console.error("Validation failed:", result.error);
                        toast({
                            variant: "destructive",
                            title: "Invalid URL Parameters",
                            description: "The verification link is invalid or expired",
                        });
                    }
                } catch (error) {
                    console.error("Error decoding parameters:", error);
                    toast({
                        variant: "destructive",
                        title: "Invalid URL",
                        description: "The verification link is malformed",
                    });
                }
            }
        }
    }, [searchParams, toast, urlData]);

    return (
        <div className="min-h-screen flex bg-slate-900">
            <div className="max-w-6xl m-auto">
                <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-24 p-6 lg:px-0 lg:py-6">
                    {/* Left section - Reusing the SidebarComponent */}
                    <WebsiteOverview
                        type="otp-page"
                        title="Verify Your Account"
                        subtitle="Enter the OTP sent to your email to complete the verification process."
                    />

                    {/* Right section - OTP verification form */}
                    <div className="lg:col-span-5 flex">
                        <div className="bg-gray-800 w-full max-w-xl rounded-xl shadow-xl overflow-hidden mx-auto">
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <div className="flex h-full">
                                <div className="m-auto px-6 py-8">
                                    <div className="mb-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-200">Enter Verification Code</h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            We&apos;ve sent a 6-digit code to {urlData?.email || "your email"}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-center space-x-2 mb-6">
                                            {otp.map((digit, index) => (
                                                <Input
                                                    key={index}
                                                    ref={inputRefs.current[index]}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    className="w-12 h-12 text-center text-xl bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
                                                    inputMode="numeric"
                                                    pattern="\d{1}"
                                                    placeholder="•"
                                                />
                                            ))}
                                        </div>

                                        <Button
                                            onClick={handleVerify}
                                            className="w-full"
                                            disabled={loading.verifyOTP}
                                        >
                                            {loading.verifyOTP ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                                    Verifying...
                                                </span>
                                            ) : (
                                                'Verify OTP'
                                            )}
                                        </Button>

                                        <div className="flex justify-center items-center">
                                            <Button
                                                onClick={handleResendOTP}
                                                disabled={!canResend || loading.resendOTP}
                                                className={`
                                                relative group flex items-center justify-center gap-2 'text-blue-400 hover:text-blue-300'
                                                ${!canResend ? 'cursor-not-allowed' : ''}
                                                transition-all duration-200
                                            `}
                                            >
                                                {!canResend ? (
                                                    <div className="flex items-center gap-2">
                                                        <Timer className="w-4 h-4" />
                                                        Resend in {timeLeft}s
                                                    </div>
                                                ) : loading.resendOTP ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full" />
                                                        Sending...
                                                    </div>
                                                ) : (
                                                    'Resend OTP'
                                                )}

                                                {canResend && !loading.resendOTP && (
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;