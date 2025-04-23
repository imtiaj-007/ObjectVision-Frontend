'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Home, LogIn, ArrowRight, CreditCard, Mail, User, ShieldCheck, Download, Bell, RefreshCw } from 'lucide-react';
import { FaCheck, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { storage } from '@/utils/storage';

interface TokenData {
    access_token: string | null;
    token_type: string | null;
}

type SuccessConfig = {
    title: string;
    description: string;
    details?: string[];
    icon: React.ReactNode;
    color: string;
    primaryAction?: {
        label: string;
        href: string;
        icon?: React.ReactNode;
    };
    secondaryAction?: {
        label: string;
        href: string;
        icon?: React.ReactNode;
    };
    showTimer?: boolean;
    redirectUrl?: string;
    redirectTime?: number;
};

const SUCCESS_CONFIGS: Record<string, SuccessConfig> = {
    'oauth-success': {
        title: 'Authentication Successful',
        description: 'You have successfully authenticated with the provider.',
        details: [
            'Your account is now connected',
            'All permissions have been granted correctly',
            'You can now access all platform features'
        ],
        icon: <FaShieldAlt className="h-16 w-16" />,
        color: 'bg-green-500',
        primaryAction: {
            label: 'Go to Dashboard',
            href: '/user/dashboard',
            icon: <ArrowRight className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Edit Profile',
            href: '/user/profile',
            icon: <User className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/user/dashboard',
        redirectTime: 10,
    },
    'otp-verified': {
        title: 'OTP Verification Complete',
        description: 'Your one-time password has been successfully verified.',
        details: [
            'Your account is now secured with two-factor authentication',
            'All login attempts will require verification',
            'You can manage 2FA settings in your security preferences'
        ],
        icon: <ShieldCheck className="h-16 w-16" />,
        color: 'bg-blue-500',
        primaryAction: {
            label: 'Continue to Login',
            href: '/auth/login',
            icon: <LogIn className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Security Settings',
            href: '/user/security',
            icon: <FaShieldAlt className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/auth/login',
        redirectTime: 10,
    },
    'payment-success': {
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
        details: [
            'Transaction has been confirmed and recorded',
            'Receipt has been sent to your email',
            'Your subscription is now active'
        ],
        icon: <FaCreditCard className="h-16 w-16" />,
        color: 'bg-purple-500',
        primaryAction: {
            label: 'View Receipt',
            href: '/user/billing/receipts',
            icon: <Download className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Go to Dashboard',
            href: '/user/dashboard',
            icon: <Home className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/user/dashboard',
        redirectTime: 10,
    },
    'account-created': {
        title: 'Account Created',
        description: 'Your account has been successfully created.',
        details: [
            'Your account is now ready to use',
            'Verification email has been sent',
            'Complete your profile to get the most out of our platform'
        ],
        icon: <User className="h-16 w-16" />,
        color: 'bg-teal-500',
        primaryAction: {
            label: 'Complete Profile',
            href: '/user/profile/edit',
            icon: <User className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Skip for Now',
            href: '/user/dashboard',
            icon: <ArrowRight className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/user/dashboard',
        redirectTime: 10,
    },
    'email-verified': {
        title: 'Email Verified',
        description: 'Your email address has been successfully verified.',
        details: [
            'Your account is now fully activated',
            'You can now access all features',
            'We won\'t ask you to verify this email again'
        ],
        icon: <Mail className="h-16 w-16" />,
        color: 'bg-indigo-500',
        primaryAction: {
            label: 'Go to Dashboard',
            href: '/user/dashboard',
            icon: <ArrowRight className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Update Preferences',
            href: '/user/preferences',
            icon: <Bell className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/user/dashboard',
        redirectTime: 10,
    },
    'subscription-active': {
        title: 'Subscription Activated',
        description: 'Your subscription has been successfully activated.',
        details: [
            'All premium features are now available',
            'Subscription renews automatically on the billing date',
            'You can manage your subscription anytime in account settings'
        ],
        icon: <CheckCircle className="h-16 w-16" />,
        color: 'bg-amber-500',
        primaryAction: {
            label: 'Explore Features',
            href: '/features',
            icon: <ArrowRight className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Manage Subscription',
            href: '/user/billing',
            icon: <CreditCard className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/user/dashboard',
        redirectTime: 10,
    },
    'action-completed': {
        title: 'Action Completed',
        description: 'Your requested action has been completed successfully.',
        details: [
            'All changes have been saved',
            'Updates will be reflected across your account',
            'You can make additional changes anytime'
        ],
        icon: <FaCheck className="h-16 w-16" />,
        color: 'bg-green-500',
        primaryAction: {
            label: 'Continue',
            href: '/user/dashboard',
            icon: <ArrowRight className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'View Details',
            href: '/user/activity',
            icon: <RefreshCw className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/user/dashboard',
        redirectTime: 10,
    },
    'default': {
        title: 'Successfully Verified',
        description: 'Your account has been successfully verified.',
        details: [
            'All verifications are complete',
            'You can now access your account',
            'Thanks for your patience'
        ],
        icon: <CheckCircle className="h-16 w-16" />,
        color: 'bg-green-500',
        primaryAction: {
            label: 'Continue',
            href: '/user/dashboard',
            icon: <ArrowRight className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Go to Home',
            href: '/',
            icon: <Home className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/user/dashboard',
        redirectTime: 10,
    },
};

const SuccessPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [countdown, setCountdown] = useState<number>(10);

    const type = searchParams.get('type') || 'default';
    const extra = searchParams.get('extra');

    const successConfig = SUCCESS_CONFIGS[type] || SUCCESS_CONFIGS.default;

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        const startCountdownAndRedirect = (redirectPath: string, seconds: number = 5) => {
            setCountdown(seconds);
            const timer = setInterval(() => {
                setCountdown((prev: number) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.push(redirectPath);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return timer;
        };

        // Process hash token if present (OAuth flow)
        const hash = window.location.hash.substring(1);
        if (hash) {
            try {
                const params = new URLSearchParams(hash);
                const tokenData: TokenData = {
                    access_token: params.get('access_token'),
                    token_type: params.get('token_type')
                };

                if (!tokenData.access_token) {
                    throw new Error('No access token found');
                }

                // Store token in localStorage
                storage.set('access_token', tokenData.access_token);
                if (tokenData.token_type) {
                    storage.set('token_type', tokenData.token_type);
                }

                timer = startCountdownAndRedirect(
                    successConfig.redirectUrl || '/user/dashboard',
                    successConfig.redirectTime || 5
                );

            } catch (error) {
                console.error('Error processing token:', error);
                router.push('/auth/login?error=invalid_token');
            }
        } else if (successConfig.showTimer && successConfig.redirectUrl) {
            timer = startCountdownAndRedirect(
                successConfig.redirectUrl,
                successConfig.redirectTime || 5
            );
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [router, searchParams, successConfig]);

    const handlePrimaryAction = () => {
        if (successConfig.primaryAction?.href === '#') {
            window.location.reload();
        } else if (successConfig.primaryAction?.href) {
            router.push(successConfig.primaryAction.href);
        }
    };

    const handleSecondaryAction = () => {
        if (successConfig.secondaryAction?.href === '#') {
            window.location.reload();
        } else if (successConfig.secondaryAction?.href) {
            router.push(successConfig.secondaryAction.href);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-slate-900 dark:to-slate-800">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <Card className="bg-white dark:bg-slate-800 shadow-md overflow-hidden">
                    <div className={`h-2 w-full ${successConfig.color}`}></div>

                    <CardHeader>
                        <div className="flex flex-col items-center space-y-4">
                            <motion.div
                                initial={{ scale: 0.8, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    duration: 0.6,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 10
                                }}
                                className={`p-4 rounded-full bg-opacity-30 ${successConfig.color}`}
                            >
                                {successConfig.icon}
                            </motion.div>
                            <CardTitle className="mt-2 text-3xl font-bold text-center text-gray-800 dark:text-white">
                                {successConfig.title}
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
                            {successConfig.description}
                        </p>

                        {successConfig.details && (
                            <div className="mt-6 space-y-3">
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    What This Means
                                </h3>
                                <ul className="space-y-2">
                                    {successConfig.details.map((detail, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="flex-shrink-0 h-5 w-5 text-green-500">
                                                <FaCheck className="h-4 w-4 mt-0.5" />
                                            </span>
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                                {detail}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {extra && (
                            <Alert className="mt-6 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border-green-200 dark:border-green-800">
                                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-300" />
                                <AlertTitle className="text-green-800 dark:text-green-200">Additional Information</AlertTitle>
                                <AlertDescription className="text-green-700 dark:text-green-300 mt-1">
                                    {extra}
                                </AlertDescription>
                            </Alert>
                        )}

                        {successConfig.showTimer && countdown > 0 && (
                            <motion.div
                                className="mt-6 flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center mb-2">
                                    <Clock className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
                                    </p>
                                </div>

                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`${successConfig.color} h-2 rounded-full transition-all duration-1000`}
                                        style={{ width: `${((successConfig.redirectTime || 10) - countdown) / (successConfig.redirectTime || 10) * 100}%` }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                        {successConfig.primaryAction && (
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    onClick={handlePrimaryAction}
                                    className="w-full sm:w-auto px-6 py-3 shadow-sm"
                                    variant={successConfig.secondaryAction ? "default" : "outline"}
                                >
                                    {successConfig.primaryAction.icon}
                                    {successConfig.primaryAction.label}
                                </Button>
                            </motion.div>
                        )}
                        {successConfig.secondaryAction && (
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    onClick={handleSecondaryAction}
                                    className="w-full sm:w-auto px-6 py-3"
                                    variant="outline"
                                >
                                    {successConfig.secondaryAction.icon}
                                    {successConfig.secondaryAction.label}
                                </Button>
                            </motion.div>
                        )}
                    </CardFooter>
                </Card>

                <motion.div
                    className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p>Have questions? <a href="/help" className="text-blue-600 dark:text-blue-400 hover:underline">Visit our help center</a></p>
                    <p className="mt-1">Success reference: {type}</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SuccessPage;