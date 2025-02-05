'use client'
import React from 'react';
import { z } from 'zod';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignupFormData, SignupFormDataSchema } from '@/interfaces/auth';
import { signup } from '@/services/auth_service';



const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError([]);
    setLoading(true);

    try {
      SignupFormDataSchema.parse(formData);

      try {
        const response = await signup(formData);
        console.log(response)
        router.push('/user/dashboard');
      } catch (signupError) {
        setError(signupError instanceof Error ? [signupError.message] : ['Signup failed, Please try again.']);
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError instanceof z.ZodError
          ? validationError.errors.map(error => error.message)
          : ['An unexpected error occurred']
        );
      } else {
        setError(['An unexpected error occurred']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center light:bg-gray-50 dark:shadow-slate-600 hover:shadow-lg transition-shadow  p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
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