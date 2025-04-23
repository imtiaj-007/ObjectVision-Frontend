'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RazorpayCheckout from '@/components/razorpay-checkout';
import { FeatureGroupType, FeatureType, PlanType } from '@/types/subscription';
import { formatCurrency } from '@/utils/general';
import useSubscription from '@/hooks/use-subscription';
import AnimatedErrorMessage from '@/components/error-page';
import Loader from '@/components/ui/loader';
import Link from 'next/link';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    },
    hover: {
        scale: 1.03,
        transition: {
            duration: 0.2
        }
    }
};

const contentVariants = {
    collapsed: {
        maxHeight: "12rem",
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    expanded: {
        maxHeight: "1000px",
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

const PricingPage: React.FC = () => {
    const { subscriptions, loading, error } = useSubscription();
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const [showGateway, setShowGateway] = useState<boolean>(false);
    const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

    const handlePayment = (plan: PlanType) => {
        setSelectedPlan(plan);
        setShowGateway(true);
    };

    const toggleCardExpansion = (planName: string) => {
        setExpandedCards(prev => ({
            ...prev,
            [planName]: !prev[planName]
        }));
    };

    const renderFeatureItem = (feature: FeatureType) => {
        const formattedKey = feature.key.replace(/_/g, " ");

        if (feature.data_type === "BOOLEAN") {
            return (
                <li key={`feature_${feature.id}`} className="flex items-center gap-2 text-sm">
                    {feature.value === 'true' ? (
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                        <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                    <span className="capitalize">{formattedKey}</span>
                </li>
            );
        }

        return (
            <li key={`feature_${feature.id}`} className="flex items-center gap-2 text-sm">
                <span className="capitalize font-semibold">{formattedKey}:</span>
                <span>{String(feature.value)}</span>
            </li>
        );
    };

    return (
        <div className="bg-slate-900">
            {loading
                ? <Loader
                    type='spinner'
                    size='lg'
                    fullScreen={false}
                    text='Loading Subscriptions'
                    className='h-96 w-full'
                />
                : (!subscriptions || subscriptions.length == 0 || error)
                    ? <AnimatedErrorMessage />
                    : (
                        <div className="min-h-screen py-12 px-4">
                            <div className="max-w-7xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.0 }}
                                    className="text-center mb-12"
                                >
                                    <h1 className="text-4xl font-bold text-gray-300 mb-4">Simple, transparent pricing</h1>
                                    <p className="text-xl text-gray-400">Choose the plan that&apos;s right for you</p>
                                </motion.div>

                                <div className="flex flex-col space-y-6 items-center justify-center border-2 border-red-500 p-6 mt-12 rounded-lg">
                                    <p className="font-medium text-lg text-red-500">** This amount is non-refundable, please read this section before proceeding. **</p>
                                    <div className="text-gray-400">
                                        <p>
                                            Why am I charging for this project? Running this platform involves significant costs, including:
                                        </p>
                                        <ul className="list-disc list-inside mt-2 pl-6 md:pl-8 py-2 space-y-1">
                                            <li>AWS services like <strong>S3</strong> for storage, <strong>EC2 & Lambda</strong> for computing, and <strong>CloudFront</strong> for content delivery.</li>
                                            <li>Managing and training machine learning models, which require computational resources and time.</li>
                                            <li>Maintaining infrastructure, ensuring uptime, and providing a seamless user experience.</li>
                                        </ul>
                                    </div>
                                    <p className='text-gray-400'>
                                        Your support helps cover these costs and allows me to continue improving and maintaining this project.
                                        <span className="block text-gray-200 text-center mt-2">❣️ Thank you for understanding ❣️</span>
                                    </p>
                                </div>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8"
                                >
                                    {subscriptions.map((plan, index) => (
                                        <motion.div
                                            key={plan.name}
                                            variants={cardVariants}
                                            whileHover="hover"
                                            className={`flex ${index === 1 ? 'md:mt-0 mt-8' : ''}`}
                                        >
                                            <Card className={`relative h-full w-full bg-gray-800 text-gray-800/90
                                                ${plan.popular
                                                    ? 'border-blue-500 border-2'
                                                    : plan.premium
                                                        ? 'border-yellow-600 border-2' : ''}
                                                `}
                                            >
                                                {(plan.popular || plan.premium) && (
                                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                        <span className={`text-white px-3 py-1 rounded-full text-sm font-medium
                                                            ${plan.premium
                                                                ? 'bg-yellow-600'
                                                                : 'bg-blue-500'}`}
                                                        >
                                                            {plan.premium ? 'Premium' : 'Most Popular'}
                                                        </span>
                                                    </div>
                                                )}
                                                <CardHeader>
                                                    <CardTitle className="text-2xl font-bold text-gray-300">{plan.name}</CardTitle>
                                                    <CardDescription>{plan.description}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="md:max-h-full">
                                                    <div className="mb-6">
                                                        <span className="text-2xl font-bold text-gray-300">
                                                            {plan.amount === 0 ? "Free" : formatCurrency(plan.amount)}
                                                        </span>
                                                    </div>

                                                    {/* Mobile view - Collapsible content */}
                                                    <div className="md:hidden">
                                                        <motion.div
                                                            initial={expandedCards[plan.name] ? "expanded" : "collapsed"}
                                                            animate={expandedCards[plan.name] ? "expanded" : "collapsed"}
                                                            variants={contentVariants}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="space-y-6">
                                                                {plan.feature_groups.map((featureGroup: FeatureGroupType) => (
                                                                    <div key={`feature_group_${featureGroup.id}`}>
                                                                        <h3 className="font-medium text-gray-400 mb-2">{featureGroup.title}</h3>
                                                                        <ul className="space-y-2 px-4 text-gray-400">
                                                                            {featureGroup.features.map((feature: FeatureType) => (
                                                                                renderFeatureItem(feature)
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>

                                                        {/* Toggle button for mobile */}
                                                        <Button
                                                            className="w-full bg-transparent shadow-none font-medium text-blue-400 underline underline-offset-2 hover:bg-transparent hover:text-blue-400 hover:scale-100"
                                                            onClick={() => toggleCardExpansion(plan.name)}
                                                        >
                                                            <motion.span
                                                                key={expandedCards[plan.name] ? "less" : "more"}
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -5 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="flex items-center justify-center gap-1"
                                                            >
                                                                {expandedCards[plan.name] ? (
                                                                    <>View less <ChevronUp className="size-5" /></>
                                                                ) : (
                                                                    <>View more <ChevronDown className="size-5" /></>
                                                                )}
                                                            </motion.span>
                                                        </Button>
                                                    </div>

                                                    {/* Desktop view - Always expanded content */}
                                                    <div className="hidden md:block">
                                                        <div className="space-y-6">
                                                            {plan.feature_groups.map((featureGroup: FeatureGroupType) => (
                                                                <div key={`feature_group_${featureGroup.id}`}>
                                                                    <h3 className="font-medium text-gray-400 mb-2">{featureGroup.title}</h3>
                                                                    <ul className="space-y-2 px-4 text-gray-400">
                                                                        {featureGroup.features.map((feature: FeatureType) => (
                                                                            renderFeatureItem(feature)
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    {(plan.popular || plan.premium)
                                                        ? <Button
                                                            className={`w-full ${plan.popular
                                                                ? 'bg-blue-500 hover:bg-blue-600'
                                                                : 'bg-yellow-600 hover:bg-yellow-700'}`}
                                                            onClick={() => handlePayment(plan)}
                                                        >
                                                            Buy Now
                                                        </Button>
                                                        : <Link href="/auth/login" className="w-full">
                                                            <Button className='w-full bg-black text-neutral-50 hover:bg-black/70'>
                                                                Get Started
                                                            </Button>
                                                        </Link>
                                                    }
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    )
            }

            {showGateway &&
                selectedPlan &&
                <RazorpayCheckout planDetails={selectedPlan} />
            }
        </div>
    );
};

export default PricingPage;