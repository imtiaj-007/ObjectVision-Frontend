'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import { config } from '@/configuration/config';
import { LoginFormData, LoginFormDataSchema } from '@/interfaces/auth';
import { login } from '@/services/auth_service';
import DeviceLoginModal from '@/components/modals/device-modal';



const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        user_key: '',
        password: '',
        remember_me: false,
        new_device: false
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [shouldSubmit, setShouldSubmit] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);
    const [showDeviceModal, setShowDeviceModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

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
            toast.error("Google OAUth URL is not Defined");
            return;
        }
        router.push(url)
    }

    const handleNewDeviceLogin = (): void => {
        setFormData((prevState) => ({
            ...prevState,
            new_device: true
        }))
        setShouldSubmit(true);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement> | null): Promise<void> => {
        e?.preventDefault();
        setError([]);
        setLoading(true);

        try {
            LoginFormDataSchema.parse(formData);

            try {
                const response = await login(formData);
                if (response)
                    router.push('/user/dashboard');
            } catch (loginError: unknown) {
                const err = loginError instanceof AxiosError
                    ? loginError
                    : null;
                if (err?.response?.status === 409) {
                    setShowDeviceModal(true);
                } else {
                    toast.error(err?.message);
                }
            }
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setError(validationError.errors.map(error => error.message));
            } else {
                toast.error("An unexpected Error has occured");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldSubmit) {
            handleSubmit(null);
            setShouldSubmit(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <div className="h-[85vh] flex items-center justify-center bg-gray-100 dark:bg-background dark:shadow-slate-600 transition-shadow p-4">
            <Card className="w-full max-w-md dark:shadow-slate-900">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter below credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error?.length > 0 && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
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
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remember_me: checked ? true : false }))}
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
                                onClick={() => {/* Add GitHub login logic */ }}
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

            {showDeviceModal &&
                <DeviceLoginModal
                    isOpen={showDeviceModal}
                    onClose={() => setShowDeviceModal(false)}
                    onProceed={handleNewDeviceLogin}
                />
            }
        </div>
    );
};

export default LoginPage;