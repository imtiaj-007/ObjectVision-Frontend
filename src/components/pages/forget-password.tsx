'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { KeyRound } from 'lucide-react';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WebsiteOverview from '@/components/sections/website-overview';

import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { isCustomError } from '@/types/general';

// Schema for email validation
const ForgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

const ForgetPasswordPage: React.FC = () => {
    const router = useRouter();
    const { requestPasswordReset, loading } = useAuth();
    const { toast } = useToast();

    const [email, setEmail] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            const validatedData = ForgotPasswordSchema.parse({ email });
            try {
                await requestPasswordReset(validatedData.email);
                setIsSubmitted(true);
                toast({
                    variant: "default",
                    title: "Reset Link Sent",
                    description: "If an account exists with this email, you will receive a password reset link shortly",
                });
            } catch (error) {
                console.error(error);
                if (isCustomError(error)) {
                    toast({
                        variant: error.status_code === 429 ? "warning" : "destructive",
                        title: error.status_code === 429 ? "Too Many Requests" : "Request Failed",
                        description: error.message || "Failed to send password reset email",
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "An unexpected error occurred",
                    });
                }
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

    return (
        <div className="min-h-screen flex bg-slate-900">
            <div className="max-w-6xl m-auto">
                <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-24 p-6 lg:px-0 lg:py-6">
                    {/* Left section - Website Overview */}
                    <WebsiteOverview
                        type="forgot-password"
                        title="Reset Your Password"
                        subtitle="Enter your email address and we'll send you a link to reset your password."
                    />

                    {/* Right section - Forgot password form */}
                    <div className="lg:col-span-5 flex">
                        <div className="bg-gray-800 w-full max-w-xl rounded-xl shadow-xl overflow-hidden mx-auto">
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <div className="flex h-full">
                                <div className="m-auto px-6 py-8 w-full">
                                    <div className="mb-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-200">Forgot Your Password?</h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {isSubmitted
                                                ? "Check your email for the reset link"
                                                : "We'll send you a secure link to reset your password"}
                                        </p>
                                    </div>

                                    {isSubmitted ? (
                                        <div className="space-y-6">
                                            <div className="flex flex-col items-center p-6 bg-gray-700/30 rounded-lg">
                                                <KeyRound className="w-12 h-12 text-blue-400 mb-3" />
                                                <h4 className="text-lg font-medium text-gray-200">Email Sent</h4>
                                                <p className="text-center text-gray-400 mt-2">
                                                    We&apos;ve sent a password reset link to <span className="text-blue-400 font-medium">{email}</span>
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <Button
                                                    onClick={() => setIsSubmitted(false)}
                                                    variant="outline"
                                                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                                                >
                                                    Try a different email
                                                </Button>

                                                <Button
                                                    onClick={() => router.push('/auth/login')}
                                                    className="w-full"
                                                >
                                                    Return to Login
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                                    Email address
                                                </label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
                                                    placeholder="your-email@example.com"
                                                    required
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full"
                                                disabled={loading?.resetPassword}
                                            >
                                                {loading?.resetPassword ? (
                                                    <span className="flex items-center gap-2">
                                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    'Send Reset Link'
                                                )}
                                            </Button>

                                            <div className="text-center">
                                                <Button
                                                    type="button"
                                                    variant="link"
                                                    onClick={() => router.push('/auth/login')}
                                                    className="text-blue-500 underline hover:text-blue-600"
                                                >
                                                    Back to Login
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;