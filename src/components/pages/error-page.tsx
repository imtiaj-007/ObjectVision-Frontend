'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, Home, LogIn, Wifi, CreditCard, XCircle, AlertTriangle, Mail, RefreshCw, ShieldAlert, FileWarning, ServerCrash } from 'lucide-react';
import { FaLock, FaExclamationTriangle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ErrorConfig = {
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

const ERROR_CONFIGS: Record<string, ErrorConfig> = {
    'unauthorized': {
        title: 'Session Expired',
        description: 'Your session has expired due to inactivity or security reasons.',
        details: [
            'Sessions automatically expire after 30 minutes of inactivity',
            'Your login credentials may have been updated elsewhere',
            'For security reasons, we log you out after sensitive account changes'
        ],
        icon: <FaLock className="h-16 w-16" />,
        color: 'bg-red-500',
        primaryAction: {
            label: 'Log In',
            href: '/auth/login',
            icon: <LogIn className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Go to Home',
            href: '/',
            icon: <Home className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '/auth/login',
        redirectTime: 15,
    },
    'oauth-failure': {
        title: 'Authentication Failed',
        description: 'We couldn\'t authenticate you with the selected provider.',
        details: [
            'The authentication provider may be temporarily unavailable',
            'You may have denied permission to required scopes',
            'Your account might not be verified with the provider'
        ],
        icon: <XCircle className="h-16 w-16" />,
        color: 'bg-amber-500',
        primaryAction: {
            label: 'Try Again',
            href: '/auth/login',
            icon: <RefreshCw className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Try Another Method',
            href: '/auth/options',
            icon: <ShieldAlert className="mr-2 h-4 w-4" />
        },
    },
    'payment-failure': {
        title: 'Payment Failed',
        description: 'We couldn\'t process your payment at this time.',
        details: [
            'Your card may have insufficient funds',
            'The card issuer might be blocking the transaction',
            'Billing information may not match your card details',
            'Your card might be expired'
        ],
        icon: <CreditCard className="h-16 w-16" />,
        color: 'bg-purple-500',
        primaryAction: {
            label: 'Try Again',
            href: '/pricing',
            icon: <RefreshCw className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Contact Support',
            href: 'mailto:support@example.com',
            icon: <Mail className="mr-2 h-4 w-4" />
        },
    },
    'server-error': {
        title: 'Server Error',
        description: 'Something went wrong on our end while processing your request.',
        details: [
            'Our engineering team has been notified',
            'This is usually temporary - please try again shortly',
            'Complex operations sometimes fail during high traffic periods'
        ],
        icon: <ServerCrash className="h-16 w-16" />,
        color: 'bg-orange-500',
        primaryAction: {
            label: 'Refresh Page',
            href: '#',
            icon: <RefreshCw className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Check Status',
            href: '/status',
            icon: <FileWarning className="mr-2 h-4 w-4" />
        },
    },
    'not-found': {
        title: 'Page Not Found',
        description: 'The requested resource could not be located.',
        details: [
            'The page may have been moved or deleted',
            'Check for typos in the URL',
            'This resource might require special permissions'
        ],
        icon: <AlertTriangle className="h-16 w-16" />,
        color: 'bg-blue-500',
        primaryAction: {
            label: 'Go to Home',
            href: '/',
            icon: <Home className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Browse Features',
            href: '/features',
            icon: <FileWarning className="mr-2 h-4 w-4" />
        },
    },
    'network-error': {
        title: 'Network Connection Lost',
        description: 'We couldn\'t establish a stable connection to our servers.',
        details: [
            'Check your internet connection and try again',
            'Firewall or VPN settings might be blocking the connection',
            'This could be a temporary outage in your area'
        ],
        icon: <Wifi className="h-16 w-16" />,
        color: 'bg-indigo-500',
        primaryAction: {
            label: 'Refresh Page',
            href: '#',
            icon: <RefreshCw className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Troubleshoot',
            href: '/help/network',
            icon: <AlertCircle className="mr-2 h-4 w-4" />
        },
    },
    'rate-limited': {
        title: 'Too Many Requests',
        description: 'You\'ve sent too many requests in a short time frame.',
        details: [
            'This helps us prevent abuse and maintain service quality',
            'Standard rate limit is 100 requests per minute',
            'Try again in a few moments'
        ],
        icon: <FaExclamationTriangle className="h-16 w-16" />,
        color: 'bg-yellow-500',
        primaryAction: {
            label: 'Try Again',
            href: '#',
            icon: <RefreshCw className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Learn More',
            href: '/help/rate-limits',
            icon: <FileWarning className="mr-2 h-4 w-4" />
        },
        showTimer: true,
        redirectUrl: '#',
        redirectTime: 30,
    },
    'maintenance': {
        title: 'Scheduled Maintenance',
        description: 'We\'re currently performing scheduled maintenance.',
        details: [
            'This downtime was announced in advance',
            'We expect to be back online shortly',
            'All systems should be fully operational after maintenance'
        ],
        icon: <ServerCrash className="h-16 w-16" />,
        color: 'bg-teal-500',
        primaryAction: {
            label: 'Check Status',
            href: '/status',
            icon: <FileWarning className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'View Schedule',
            href: '/maintenance',
            icon: <Clock className="mr-2 h-4 w-4" />
        },
    },
    'default': {
        title: 'Unexpected Error',
        description: 'An unexpected error occurred while processing your request.',
        details: [
            'We\'ve logged this error and will investigate',
            'This might be a temporary issue',
            'Try refreshing the page or coming back later'
        ],
        icon: <AlertCircle className="h-16 w-16" />,
        color: 'bg-gray-500',
        primaryAction: {
            label: 'Go to Home',
            href: '/',
            icon: <Home className="mr-2 h-4 w-4" />
        },
        secondaryAction: {
            label: 'Contact Support',
            href: 'mailto:support@example.com',
            icon: <Mail className="mr-2 h-4 w-4" />
        },
    },
};

const ErrorPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'default';
    const extra = searchParams.get('extra');

    const errorConfig = ERROR_CONFIGS[type] || ERROR_CONFIGS.default;
    const [countdown, setCountdown] = useState(errorConfig.redirectTime || 0);

    useEffect(() => {
        if (errorConfig.showTimer && errorConfig.redirectUrl && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (errorConfig.showTimer && errorConfig.redirectUrl && countdown === 0) {
            if (errorConfig.redirectUrl === '#') {
                window.location.reload();
            } else {
                router.push(errorConfig.redirectUrl);
            }
        }
    }, [countdown, errorConfig.redirectUrl, errorConfig.showTimer, router]);

    const handlePrimaryAction = () => {
        if (errorConfig.primaryAction?.href === '#') {
            window.location.reload();
        } else if (errorConfig.primaryAction?.href) {
            router.push(errorConfig.primaryAction.href);
        }
    };

    const handleSecondaryAction = () => {
        if (errorConfig.secondaryAction?.href === '#') {
            window.location.reload();
        } else if (errorConfig.secondaryAction?.href) {
            router.push(errorConfig.secondaryAction.href);
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
                    <div className={`h-2 w-full ${errorConfig.color}`}></div>

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
                                className={`p-4 rounded-full bg-opacity-30 ${errorConfig.color}`}
                            >
                                {errorConfig.icon}
                            </motion.div>
                            <CardTitle className="mt-2 text-3xl font-bold text-center text-gray-800 dark:text-white">
                                {errorConfig.title}
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
                            {errorConfig.description}
                        </p>

                        {errorConfig.details && (
                            <div className="mt-6 space-y-3">
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Possible Reasons
                                </h3>
                                <ul className="space-y-2">
                                    {errorConfig.details.map((detail, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="flex-shrink-0 h-5 w-5 text-amber-500">
                                                <FaExclamationTriangle className="h-4 w-4 mt-0.5" />
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
                            <Alert className="mt-6 bg-amber-50 dark:bg-amber-900 dark:bg-opacity-20 border-amber-200 dark:border-amber-800">
                                <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-300" />
                                <AlertTitle className="text-amber-800 dark:text-amber-200">Additional Information</AlertTitle>
                                <AlertDescription className="text-amber-700 dark:text-amber-300 mt-1">
                                    {extra}
                                </AlertDescription>
                            </Alert>
                        )}

                        {errorConfig.showTimer && countdown > 0 && (
                            <motion.div
                                className="mt-6 flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Clock className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {errorConfig.redirectUrl === '#' ? (
                                        <>Auto-refreshing in {countdown} second{countdown !== 1 ? 's' : ''}...</>
                                    ) : (
                                        <>Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...</>
                                    )}
                                </p>
                            </motion.div>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                        {errorConfig.primaryAction && (
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    onClick={handlePrimaryAction}
                                    className="w-full sm:w-auto px-6 py-3 shadow-sm"
                                    variant={errorConfig.secondaryAction ? "default" : "outline"}
                                >
                                    {errorConfig.primaryAction.icon}
                                    {errorConfig.primaryAction.label}
                                </Button>
                            </motion.div>
                        )}
                        {errorConfig.secondaryAction && (
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    onClick={handleSecondaryAction}
                                    className="w-full sm:w-auto px-6 py-3"
                                    variant="outline"
                                >
                                    {errorConfig.secondaryAction.icon}
                                    {errorConfig.secondaryAction.label}
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
                    <p>Need additional help? <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact our support team</a></p>
                    <p className="mt-1">Error reference: {type}</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ErrorPage;