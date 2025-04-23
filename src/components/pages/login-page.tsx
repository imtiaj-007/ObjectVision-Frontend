'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Eye, EyeOff, Loader2, Lock, LogIn, User } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import DeviceLoginModal from '@/components/modals/device-modal';
import WebsiteOverview from '@/components/sections/website-overview';

import useUser from '@/hooks/use-user';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { isCustomError } from '@/types/general';
import { settings } from '@/configuration/config';
import { LoginFormDataSchema } from '@/schemas/auth';
import { LoginFormData } from '@/types/auth';


const LoginPageComponent: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, loading, clearAuthErrors } = useAuth();
    const { fetchUserProfile } = useUser();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showDeviceModal, setShowDeviceModal] = useState<boolean>(false);

    // Initialize form
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormDataSchema),
        defaultValues: {
            user_key: '',
            password: '',
            remember_me: false,
            new_device: false,
        },
        mode: 'onBlur',
    });

    // Auth helper functions
    const redirectToNextPage = (): void => {
        const redirectURL = searchParams.get('redirectURL') as string || '/user/dashboard';
        router.push(redirectURL);
    };

    const handleLoginError = (err: unknown, customMessage?: string): void => {
        const errorMessage = isCustomError(err)
            ? err.message
            : customMessage
            ?? "An unexpected error has occurred";
        toast({
            variant: "destructive",
            description: errorMessage
        })
    };

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

    // Handle new device login
    const handleNewDeviceLogin = async (): Promise<void> => {
        try {
            const formData = form.getValues();
            await login({
                ...formData,
                new_device: true
            });
            redirectToNextPage();
        } catch (err: unknown) {
            handleLoginError(err, "Failed to login with new device");
        }
    };

    // Form submission handler
    const onSubmit = async (data: LoginFormData) => {
        clearAuthErrors();

        try {
            await login(data);
            await fetchUserProfile();
            redirectToNextPage();
        } catch (err: unknown) {
            if (isCustomError(err) && err.status_code === 409) {
                setShowDeviceModal(true);
            } else {
                handleLoginError(err);
            }
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-900">
            <div className="max-w-6xl m-auto">
                <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-24 p-6 lg:px-0 lg:py-6">
                    {/* Left section - Info and decorative elements */}
                    <WebsiteOverview
                        title="Welcome Back!"
                        subtitle="Sign in to access your dashboard and continue your journey with us."
                    />

                    {/* Right section - Login form */}
                    <div className="lg:col-span-5 flex">
                        <div className="bg-gray-800 w-full max-w-xl rounded-xl shadow-xl overflow-hidden mx-auto">
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <div className="px-6 py-8">
                                <div className="mb-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-200">Sign In</h3>
                                    <p className="text-sm text-gray-400 mt-1">Enter your credentials to access your account</p>
                                </div>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="user_key"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-50">Email / Username</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                <User size={18} />
                                                            </span>
                                                            <Input
                                                                placeholder="example@gmail.com"
                                                                className="text-gray-200 pl-10 focus:ring-2 focus:ring-blue-500"
                                                                disabled={loading.signIn}
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
                                                    <FormLabel className="text-gray-50">Password</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                <Lock size={18} />
                                                            </span>
                                                            <Input
                                                                placeholder="secure_password"
                                                                type={showPassword ? "text" : "password"}
                                                                className="text-gray-200 pl-10 focus:ring-2 focus:ring-blue-500"
                                                                disabled={loading.signIn}
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

                                        <div className="flex items-center justify-between">
                                            <FormField
                                                control={form.control}
                                                name="remember_me"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                                className="border-white"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm text-gray-50 font-medium leading-none">
                                                            Remember me
                                                        </FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                            <Link
                                                href="/auth/password-reset"
                                                className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <Button
                                            className="w-full"
                                            type="submit"
                                            disabled={loading.signIn}
                                        >
                                            {loading.signIn ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="animate-spin h-4 w-4" />
                                                    Logging in...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <LogIn size={18} />
                                                    Sign In
                                                </span>
                                            )}
                                        </Button>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-3/4 mx-auto border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase my-6">
                                                <span className="px-2 bg-gray-800 text-gray-400">
                                                    login with
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
                                        Don&apos;t have an account?{' '}
                                    </span>
                                    <Link href="./signup" className="text-blue-500 hover:text-blue-700 font-medium text-sm">
                                        Create an account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDeviceModal && (
                <DeviceLoginModal
                    isOpen={showDeviceModal}
                    onClose={() => setShowDeviceModal(false)}
                    onProceed={handleNewDeviceLogin}
                />
            )}
        </div>
    );
};

export default LoginPageComponent;