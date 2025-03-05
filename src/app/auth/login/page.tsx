'use client';
import React from 'react';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import DeviceLoginModal from '@/components/modals/device-modal';

// Services & helpers
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { LoginFormData } from '@/types/auth';
import { LoginFormDataSchema } from '@/schemas/auth';
import { config } from '@/configuration/config';
import { isCustomError } from '@/types/general';


const LoginPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, loading, clearAuthErrors } = useAuth();
    const { toast } = useToast();

    const [formData, setFormData] = useState<LoginFormData>({
        user_key: '',
        password: '',
        remember_me: false,
        new_device: false
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showDeviceModal, setShowDeviceModal] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleGoogleLogin = (): void => {
        const url: string | undefined = config.GOOGLE_OAUTH_URL;
        if (!url) {
            toast({
                variant: "destructive",
                title: "Enviornment Error: OAuth URL Missing",
                description: "Google OAuth URL is not found.",
            });
            return;
        }
        router.push(url);
    };

    const handleGithubLogin = (): void => {
        const url: string | undefined = undefined;
        if (!url) {
            toast({
                variant: "info",
                title: "Coming Soon",
                description: "Github OAuth will be implemented soon.",
            });
            return;
        }
        router.push(url);
    };

    const handleNewDeviceLogin = async (): Promise<void> => {
        try {
            await login({
                ...formData,
                new_device: true
            });
            const redirectURL = searchParams.get('redirectURL') as string || '/user/dashboard';
            router.push(redirectURL);

        } catch (err: unknown) {
            if (isCustomError(err))
                console.error(err);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to login with new device",
            });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement> | null): Promise<void> => {
        e?.preventDefault();
        setValidationErrors([]);
        clearAuthErrors();

        try {
            LoginFormDataSchema.parse(formData);

            try {
                await login(formData);
                const redirectURL = searchParams.get('redirectURL') as string || '/user/dashboard';
                router.push(redirectURL);
                
            } catch (err: unknown) {
                if (isCustomError(err)) {
                    if (err.status_code === 409) {
                        setShowDeviceModal(true);
                    } else {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: err.message || "Login failed",
                        });
                    }
                }
            }
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setValidationErrors(validationError.errors.map(error => error.message));
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "An unexpected error has occurred",
                });
            }
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-background dark:shadow-slate-600 transition-shadow p-4">
            <Card className="w-full max-w-md dark:shadow-slate-900">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter below credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {validationErrors?.length > 0 && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {validationErrors}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email / Username</Label>
                            <Input
                                id="user_key"
                                type="text"
                                placeholder="example@gmail.com"
                                value={formData.user_key}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="secure_password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    className="focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember_me"
                                    checked={formData.remember_me}
                                    onCheckedChange={(checked) => setFormData(prev => ({
                                        ...prev,
                                        remember_me: checked ? true : false
                                    }))}
                                />
                                <Label
                                    htmlFor="rememberMe"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </Label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-500 hover:text-blue-700"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <div className="relative w-1/3">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    or
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full flex items-center gap-2 [&_svg]:size-auto"
                                onClick={handleGoogleLogin}
                            >
                                Login with <FcGoogle size={20} />
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full flex items-center gap-2 [&_svg]:size-auto"
                                onClick={handleGithubLogin}
                            >
                                Login with <BsGithub size={20} />
                            </Button>
                        </div>

                        <div className="text-sm text-center">
                            Don&apos;t have an account?{' '}
                            <Link href="./signup" className="text-blue-500 hover:text-blue-700 font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>

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

export default LoginPage;