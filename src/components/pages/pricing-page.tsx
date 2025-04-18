'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RazorpayCheckout from '@/components/razorpay-checkout';
import { FeatureGroupType, FeatureType, PlanType } from '@/types/subscription';
import { formatCurrency } from '@/utils/general';
import useSubscription from '@/hooks/use-subscription';
import AnimatedErrorMessage from '@/components/error-page';
import Loader from '@/components/ui/loader';


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

const PricingPage: React.FC = () => {
    const { subscriptions, loading, error } = useSubscription();
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const [showGateway, setShowGateway] = useState<boolean>(false);

    const handlePayment = (plan: PlanType) => {
        setSelectedPlan(plan);
        setShowGateway(true);
    }

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
        <div className="bg-gray-50 dark:bg-slate-900">
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
                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-300 mb-4">Simple, transparent pricing</h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-400">Choose the plan that&apos;s right for you</p>
                                </motion.div>

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
                                            <Card className={`relative h-full w-full bg-white dark:bg-gray-800 text-gray-800/90
                                                ${plan.popular
                                                    ? 'border-blue-500  border-2'
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
                                                    <CardTitle className="text-2xl font-bold dark:text-gray-300">{plan.name}</CardTitle>
                                                    <CardDescription>{plan.description}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="mb-6">
                                                        <span className="text-2xl font-bold dark:text-gray-300">
                                                            {plan.amount === 0 ? "Free" : formatCurrency(plan.amount)}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-6">
                                                        {plan.feature_groups.map((featureGroup: FeatureGroupType) => (
                                                            <div key={`feature_group_${featureGroup.id}`}>
                                                                <h3 className="font-medium dark:text-gray-400 mb-2">{featureGroup.title}</h3>
                                                                <ul className="space-y-2 px-4 text-gray-600 dark:text-gray-400">
                                                                    {featureGroup.features.map((feature: FeatureType) => (
                                                                        renderFeatureItem(feature)
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
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
                                                        : <Button className='w-full bg-black text-neutral-50 hover:bg-black'>
                                                            Get Started
                                                        </Button>
                                                    }

                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <div className="flex flex-col space-y-6 items-center justify-center border-2 border-red-500 p-6 mt-12 rounded-lg">
                                    <p className="font-medium text-lg text-red-500">** This amount is non-refundable, please read this section before proceeding. **</p>
                                    <div className="text-gray-700 dark:text-gray-400">
                                        <p>
                                            Why am I charging for this project? Running this platform involves significant costs, including:
                                        </p>
                                        <ul className="list-disc list-inside mt-2 px-8 py-2 space-y-1">
                                            <li>AWS services like <strong>S3</strong> for storage, <strong>Lambda</strong> for serverless computing, and <strong>CloudFront</strong> for content delivery.</li>
                                            <li>Managing and training machine learning models, which require computational resources and time.</li>
                                            <li>Maintaining infrastructure, ensuring uptime, and providing a seamless user experience.</li>
                                        </ul>
                                    </div>
                                    <p className='text-gray-700 dark:text-gray-400'>
                                        Your support helps cover these costs and allows me to continue improving and maintaining this project. Thank you for understanding!
                                    </p>
                                </div>
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