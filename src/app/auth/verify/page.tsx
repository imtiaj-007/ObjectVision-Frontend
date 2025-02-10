'use client'
import React, { useState, useRef, createRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { base64Decode } from '@/utils/hash';
import { OTPUrlObj, OTPUrlSchema, OTPVerifySchema } from '@/interfaces/auth';
import { resend_otp, verify_otp } from '@/services/auth_service';
import { Timer } from 'lucide-react';


const OTPVerification: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [canResend, setCanResend] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState<boolean>(false);
    const [urlData, setUrlData] = useState<OTPUrlObj | null>(null);
    const inputRefs = useRef(new Array(6).fill(null).map(() => createRef<HTMLInputElement>()));


    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];

        // Only allow numeric input
        if (/^\d*$/.test(value)) {
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-move focus to next input if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].current?.focus();
            }
        } else {
            toast.error("Only numeric values are allowed, i.e. 0-9")
        }
    };

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const key = event.key;

        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index + 1].current?.focus();
        }
    };

    const handleVerify = async () => {
        try {
            const otpCode = otp.join('');
            const payload = OTPVerifySchema.parse({
                ...urlData,
                otp: otpCode
            });

            setIsLoading(true);
            try {
                const res = await verify_otp(payload);

                if (res) {
                    router.push('/auth/success?otpVerified=true');
                } else {
                    setOtp(new Array(6).fill(""));
                    toast.error('Invalid OTP. Please try again.');
                }

            } catch (error: unknown) {
                console.log(error)
                toast.error('Verification failed. Please try again.');

            } finally {
                setIsLoading(false);
            }

        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                toast.error(validationError.errors.map(error => error.message));
            } else {
                toast.error("An unexpected Error has occured");
            }
        }
    };

    const handleResendOTP = async () => {
        if (!urlData || !canResend) return;
        try {
            const res = await resend_otp(urlData);
            toast.success(res.message);

        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? error.message
                : "Some error occurred, please try again later.";
            toast.error(errorMessage);
        } 
    };

    const handleClick = async () => {
        if (!canResend) return;

        try {
            setResendLoading(true);
            await handleResendOTP();
            setTimeLeft(60);
            setCanResend(false);

        } catch (error) {
            console.error(error);

        } finally {
            setResendLoading(false);
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
                const id = base64Decode(uid);
                const email = base64Decode(token);

                // Validate with Zod before setting state
                const result = OTPUrlSchema.safeParse({
                    user_id: id,
                    email: email,
                });

                if (result.success) {
                    setUrlData(result.data);
                } else {
                    console.error("Validation failed:", result.error);
                }
            }
        }
    }, [urlData, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verify Your Account</CardTitle>
                    <CardDescription>
                        Enter the 6-digit OTP sent to {urlData?.email}
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                                className="w-12 h-12 text-center text-xl"
                                inputMode="numeric"
                                pattern="\d{1}"
                                placeholder="-"
                            />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleVerify}
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </Button>

                        <div className="flex justify-center items-center">
                            <Button
                                variant="ghost"
                                onClick={handleClick}
                                disabled={!canResend || isLoading || resendLoading}
                                className={`
                                    relative group flex items-center justify-center gap-2
                                    ${canResend ? 'text-blue-600 hover:text-blue-700' : 'text-gray-600'}
                                    ${!canResend ? 'cursor-not-allowed' : ''}
                                    transition-all duration-200
                                `}
                            >
                                {!canResend ? (
                                    <div className="flex items-center gap-2">
                                        <Timer className="w-4 h-4" />
                                        Resend in {timeLeft}s
                                    </div>
                                ) : (
                                    'Resend OTP'
                                )}

                                {canResend && !resendLoading && (
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OTPVerification;