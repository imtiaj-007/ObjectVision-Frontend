'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BrainCircuit, CloudCog, Eye, EyeOff, Home, LineChart, Loader2, Lock, Settings2, ShieldCheck, User } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { isCustomError } from '@/types/general';
import { settings } from '@/configuration/config';
import { SignupFormDataSchema } from '@/schemas/auth';
import { SignupFormData } from '@/types/auth';
import { base64Hash } from '@/utils/hash';
import Image from 'next/image';

const SignupPage: React.FC = () => {
    const router = useRouter();
    const { signup, loading, clearAuthErrors } = useAuth();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    // Initialize form
    const form = useForm<SignupFormData>({
        resolver: zodResolver(SignupFormDataSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onBlur',
    });

    // OAuth handlers
    const handleOAuthLogin = (provider: 'google' | 'github'): void => {
        if (provider === 'google') {
            const url: string | undefined = settings.GOOGLE_OAUTH_URL;
            if (!url) {
                toast({
                    variant: "destructive",
                    title: "Environment Error: OAuth URL Missing",
                    description: "Google OAuth URL is not found.",
                });
                return;
            }
            router.push(url);
        } else {
            toast({
                variant: "info",
                title: "Coming Soon",
                description: "Github OAuth will be implemented soon.",
            });
        }
    };

    // Form submission handler
    const onSubmit = async (data: SignupFormData) => {
        clearAuthErrors();

        try {
            const response = await signup(data);
            if (response) {
                const uid = base64Hash(response.user_id);
                const email = base64Hash(response.email);
                const encoded_url = `/auth/verify?uid=${uid}&token=${email}`;
                router.push(encoded_url);
            }
        } catch (err: unknown) {
            if (isCustomError(err)) {
                toast({
                    variant: "destructive",
                    description: err.message || "Signup failed",
                });
            } else {
                toast({
                    variant: "destructive",
                    description: "An unexpected error occurred during signup",
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-900">
            <div className="max-w-6xl m-auto">
                {/* Grid container */}
                <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-24 p-6 lg:px-0 lg:py-6">
                    {/* Left section - Info and decorative elements */}
                    <div className="flex flex-col lg:col-span-6">
                        <div className="space-y-6 my-auto">
                            <div className="flex items-center justify-between">
                                <Image
                                    src={'/object-vision-logo.png'}
                                    alt="Object Vision Logo"
                                    width={200}
                                    height={150}
                                    className="h-auto object-contain -ml-4"
                                />
                                <Link href="/" passHref>
                                    <Button>
                                        <Home size={20} />
                                        Go To Home
                                    </Button>
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Join Us Today!</h2>
                                <p className="text-gray-300 text-lg">Create an account to unlock all features and start your journey with us.</p>
                            </div>

                            {/* Features grid */}
                            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
                                    <div className="rounded-full bg-blue-900 p-2">
                                        <BrainCircuit size={20} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Smart Detection</h3>
                                        <p className="text-sm text-gray-300">Detect and identify objects in real-time using AI.</p>
                                    </div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
                                    <div className="rounded-full bg-green-900 p-2">
                                        <LineChart size={20} className="text-teal-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Visual Insights</h3>
                                        <p className="text-sm text-gray-300">Get visual summaries and stats of detected objects.</p>
                                    </div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
                                    <div className="rounded-full bg-purple-900 p-2">
                                        <CloudCog size={20} className="text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Secure Storage</h3>
                                        <p className="text-sm text-gray-300">All your media are securely stored and accessible.</p>
                                    </div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
                                    <div className="rounded-full bg-amber-900 p-2">
                                        <Settings2 size={20} className="text-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Custom Model</h3>
                                        <p className="text-sm text-gray-300">Train your own models for business needs.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Security notice */}
                            <div className="flex items-center justify-center mt-6 text-gray-400 text-sm">
                                <ShieldCheck size={16} className="mr-2" />
                                <span>Your connection is secure and encrypted</span>
                            </div>
                        </div>
                    </div>

                    {/* Right section - Signup form */}
                    <div className="lg:col-span-5 flex">
                        <div className="bg-gray-800 w-full max-w-xl rounded-xl shadow-xl overflow-hidden mx-auto">
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <div className="px-6 py-8">
                                <div className="mb-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-200">Create Account</h3>
                                    <p className="text-sm text-gray-400 mt-1">Enter your details to create a new account</p>
                                </div>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        {/* Form fields remain the same */}
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-100">Full Name</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                <User size={18} />
                                                            </span>
                                                            <Input
                                                                placeholder="John Doe"
                                                                className="text-gray-200 pl-10 focus:ring-2 focus:ring-blue-500"
                                                                disabled={loading}
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-100">Email</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                <User size={18} />
                                                            </span>
                                                            <Input
                                                                placeholder="example@gmail.com"
                                                                type="email"
                                                                className="text-gray-200 pl-10 focus:ring-2 focus:ring-blue-500"
                                                                disabled={loading}
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-100">Password</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                <Lock size={18} />
                                                            </span>
                                                            <Input
                                                                placeholder="secure_password"
                                                                type={showPassword ? "text" : "password"}
                                                                className="text-gray-200 pl-10 focus:ring-2 focus:ring-blue-500"
                                                                disabled={loading}
                                                                {...field}
                                                            />
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                className="absolute right-0 top-0 h-full px-3 py-2 bg-transparent shadow-none hover:bg-transparent"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4 text-gray-500" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-100">Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                <Lock size={18} />
                                                            </span>
                                                            <Input
                                                                placeholder="confirm your password"
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                className="text-gray-200 pl-10 focus:ring-2 focus:ring-blue-500"
                                                                disabled={loading}
                                                                {...field}
                                                            />
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                className="absolute right-0 top-0 h-full px-3 py-2 bg-transparent shadow-none hover:bg-transparent"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            >
                                                                {showConfirmPassword ? (
                                                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4 text-gray-500" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            className="w-full"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="animate-spin h-4 w-4" />
                                                    Creating account...
                                                </span>
                                            ) : (
                                                <span>Sign Up</span>
                                            )}
                                        </Button>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-3/4 mx-auto border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase my-6">
                                                <span className="px-2 bg-gray-800 text-gray-400">
                                                    sign up with
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            <Button
                                                type="button"
                                                className="flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-50 border border-gray-300"
                                                onClick={() => handleOAuthLogin('google')}
                                            >
                                                <FcGoogle size={20} />
                                                <span>Google</span>
                                            </Button>
                                            <Button
                                                type="button"
                                                className="flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-50 border border-gray-300"
                                                onClick={() => handleOAuthLogin('github')}
                                            >
                                                <BsGithub size={20} />
                                                <span>GitHub</span>
                                            </Button>
                                        </div>
                                    </form>
                                </Form>

                                <div className="text-center mt-6">
                                    <span className="text-sm text-gray-400">
                                        Already have an account?{' '}
                                    </span>
                                    <Link href="./login" className="text-blue-500 hover:text-blue-700 font-medium text-sm">
                                        Login here
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;