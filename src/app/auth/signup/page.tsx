'use client'
import React from 'react';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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

// Services & helpers
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { SignupFormData } from '@/types/auth';
import { SignupFormDataSchema } from '@/schemas/auth';
import { config } from '@/configuration/config';
import { isCustomError } from '@/types/general';
import { base64Hash } from '@/utils/hash';



const SignupPage: React.FC = () => {
    const router = useRouter();
    const { signup, loading, clearAuthErrors } = useAuth();
    const { toast } = useToast()

    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);


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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e?.preventDefault();
        setValidationErrors([]);
        clearAuthErrors();

        try {
            SignupFormDataSchema.parse(formData);

            try {
                const response = await signup(formData);
                if (response) {
                    const uid = base64Hash(response.user_id);
                    const email = base64Hash(response.email);
                    const encoded_url = `/auth/verify?uid=${uid}&token=${email}`
                    router.push(encoded_url);
                }
            } catch (signupError: unknown) {
                if (isCustomError(signupError))
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: (signupError.message) || "Login failed",
                    });
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
        <div className="h-screen flex items-center justify-center bg-gray-100 dark:shadow-slate-600 hover:shadow-lg transition-shadow  p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
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
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    className="focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create account"}
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
                                Signup with <FcGoogle size={20} />
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full flex items-center gap-2 [&_svg]:size-auto"
                                onClick={handleGithubLogin}
                            >
                                Signup with <BsGithub size={20} />
                            </Button>
                        </div>

                        <div className="text-sm text-center">
                            Already have an account?{' '}
                            <Link href="./login" className="text-blue-500 hover:text-blue-700 font-medium">
                                Login
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default SignupPage;