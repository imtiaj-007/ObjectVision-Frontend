'use client'
import React, { useState, useRef, createRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


interface OTPVerificationProps {
    email: string;
    onVerify: (otp: string) => Promise<boolean>;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
    email,
    onVerify
}) => {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);
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
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            toast.error('Please enter a complete 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            const success = await onVerify(otpCode);

            if (success) {
                toast.success('OTP Verified Successfully!');
                router.push('/user/dashboard');
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error: unknown) {
            console.log(error)
            toast.error('Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const resendOTP = () => {
        // Placeholder for OTP resend logic
        toast.info('A new OTP has been sent to your phone number.');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verify Your Account</CardTitle>
                    <CardDescription>
                        Enter the 6-digit OTP sent to {email}
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

                        <div className="text-center">
                            <Button
                                variant="ghost"
                                onClick={resendOTP}
                                className="text-blue-600 hover:underline"
                            >
                                Resend OTP
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OTPVerification;