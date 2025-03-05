/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { FaBusinessTime } from "react-icons/fa";
import { LuBadgeX } from "react-icons/lu";
import { RiFileList3Fill } from "react-icons/ri";
import { Clock, Image as ImageIcon, Video, Database, Activity, Gift } from 'lucide-react';

import { MediaItem } from '@/types/media';
import { isCustomError } from '@/types/general';
import { UserActivityResponse } from '@/types/subscription_activity';
import { ActivityTypeEnum, PaymentStatus, SubscriptionPlansEnum, UserRoleEnum } from '@/types/enums';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Loader from '@/components/ui/loader';
import PlanPill from '@/components/ui/plan-pill';
import RecentImagesSection from '@/components/sections/recent-image';

import { useSubscriptionActivity } from '@/hooks/use-subscription-activity';
import useUser from '@/hooks/use-user';
import { useOrder } from '@/hooks/use-order';
import { checkExpired, formatCurrency, formatDate, remainingDays } from '@/utils/general';
import { OrderResponse } from '@/types/payment';


const usageData = [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 78 },
    { name: 'Wed', value: 89 },
    { name: 'Thu', value: 72 },
    { name: 'Fri', value: 85 },
    { name: 'Sat', value: 68 },
    { name: 'Sun', value: 75 },
];

const recentImages: MediaItem[] = [
    { id: 1, src: "/logo.png", alt: "Recent image 1", title: "Image 1", type: "image" },
    { id: 2, src: "/object-vision-logo.png", alt: "Recent image 2", title: "Image 2", type: "image" },
    { id: 3, src: "/logo.png", alt: "Recent image 3", title: "Image 3", type: "image" },
];


const DashboardPage: React.FC = () => {
    const { user_details } = useUser();
    const { fetchUserOrders, fetchAllOrders, userOrders, allOrders, loading: orderLoader, error: orderError } = useOrder();
    const {
        plansList, activePlans, userActivity,
        fetchPlansList, fetchActivePlans, fetchUserActivities,
        loading: activityLoader, error: activityError
    } = useSubscriptionActivity();
    const [activityState, setActivityState] = useState<Record<ActivityTypeEnum, UserActivityResponse | null>>(
        Object.values(ActivityTypeEnum).reduce((acc, key) => {
            acc[key] = null;
            return acc;
        }, {} as Record<ActivityTypeEnum, UserActivityResponse | null>)
    );
    const [orders, setOrders] = useState<OrderResponse[] | null>(null);
    const [alertError, setAlertError] = useState<string | null>(null);


    const prepareErrorMessage = () => {
        const hasOrderErrors = Object.values(orderError).some(err => err !== null);
        const hasActivityError = isCustomError(activityError);

        let errorMessages: string | null = null;
        if (hasOrderErrors || hasActivityError) {
            errorMessages = [
                ...Object.values(orderError)
                    .filter(isCustomError)
                    .map(err => err.message),
                hasActivityError ? activityError.message : ''
            ].filter(Boolean).join(', ');
        };
        setAlertError(errorMessages);
    }

    useEffect(() => {
        fetchPlansList();
        fetchActivePlans();
        fetchUserActivities();
    }, []);

    useEffect(() => {
        if (userActivity) {
            const updatedState = { ...activityState };
            userActivity.forEach(activity => {
                updatedState[activity.activity_type] = activity;
            });
            setActivityState(updatedState);
        }
    }, [userActivity]);

    useEffect(() => {
        if (user_details?.user) {
            if (user_details?.user?.role === UserRoleEnum.USER) {
                fetchUserOrders();
            } else {
                fetchAllOrders();
            }
        }
    }, [user_details]);

    useEffect(()=> {
        if(allOrders && allOrders.length > 0)
            setOrders(allOrders);
        else if (userOrders && userOrders.length > 0)
            setOrders(userOrders);
    }, [userOrders, allOrders]);

    useEffect(() => {
        prepareErrorMessage();
    }, [activityError, orderError]);


    return (
        <div className="space-y-6">
            {alertError &&
                <Alert variant={'destructive'}>
                    <AlertTitle>Server Error:</AlertTitle>
                    <AlertDescription>{alertError}</AlertDescription>
                </Alert>
            }
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Column: Top Stats in 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Total Processed */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Processed</p>
                                    <h3 className="text-2xl font-bold">1,234</h3>
                                </div>
                                <Activity className="h-8 w-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Images Processed */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Images Processed</p>
                                    <h3 className="text-2xl font-bold">856</h3>
                                </div>
                                <ImageIcon className="h-8 w-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Videos Processed */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Videos Processed</p>
                                    <h3 className="text-2xl font-bold">378</h3>
                                </div>
                                <Video className="h-8 w-8 text-purple-500" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Processing Time */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Processing Time</p>
                                    <h3 className="text-2xl font-bold">1.2s</h3>
                                </div>
                                <Clock className="h-8 w-8 text-orange-500" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Alert Message */}
                    <Card className="bg-green-600 col-span-2">
                        <CardContent className="px-6 py-4 flex items-center justify-center space-x-2">
                            <Gift className="text-amber-300 h-7 w-7" />
                            <p className='text-white font-semibold mt-[2px]'>
                                Limited-time offer! Upgrade your plan now and get 20% Off
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Subscription Card */}
                <Card className="bg-gradient-to-tl from-blue-700 to-blue-600">
                    {!activePlans ? (
                        (activityLoader.activePlanLoading || activityLoader.userActivityLoading) ? (
                            <Loader className='w-full h-full' />
                        ) : (
                            <div className="flex flex-col h-full space-y-6 p-6">
                                <div className="flex flex-1 flex-col justify-center items-center text-center">
                                    <FaBusinessTime size={80} className="text-blue-200 opacity-50" />
                                    <p className="mt-4 text-blue-100 font-medium">You don&apos;t have any Active Subscription Plan.</p>
                                </div>
                                <Link href={'/pricing'}>
                                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                                        Buy Subscription Plan
                                    </Button>
                                </Link>
                            </div>
                        )
                    ) : (
                        <>
                            <CardHeader className='bg-blue-800/90'>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white">Your Activity Details</CardTitle>
                                    <PlanPill
                                        plan={
                                            activePlans.length > 0
                                                ? SubscriptionPlansEnum[activePlans[0].plan_name]
                                                : SubscriptionPlansEnum.BASIC
                                        }
                                    />
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Subscription Details */}
                                    <div className="flex flex-col space-y-4">
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <span className="font-semibold text-neutral-200">Purchased On:</span>
                                            <span className="font-medium text-blue-50">{formatDate(activePlans[0].created_at)}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <span className="font-semibold text-neutral-200">Expiration Date:</span>
                                            <span className="font-medium text-blue-50">{formatDate(activePlans[0].expiry_date)}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <span className="font-semibold text-neutral-200">Remaining Days:</span>
                                            <span className="font-medium text-blue-50">{remainingDays(activePlans[0].expiry_date)} Days</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <span className="font-semibold text-neutral-200">Backup Expiry:</span>
                                            <span className="font-medium text-blue-50">{formatDate(activePlans[0].backup_till)}</span>
                                        </div>
                                    </div>

                                    {/* Usage Metrics */}
                                    <div className="space-y-4">
                                        {/* Storage Usage */}
                                        <div className="flex items-center space-x-2">
                                            <Database className="h-7 w-7 text-blue-300 mt-[2px]" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between text-sm font-medium text-blue-100">
                                                    <span>Storage</span>
                                                    {activityState.STORAGE_USAGE ? (
                                                        <span>{activityState.STORAGE_USAGE.total_usage} / {activityState.STORAGE_USAGE.total_limit} MB</span>
                                                    ) : (
                                                        <span>{0} / {250} MB</span>
                                                    )}
                                                </div>
                                                <Progress
                                                    value={
                                                        activityState.STORAGE_USAGE
                                                            ? (activityState.STORAGE_USAGE?.total_usage / activityState.STORAGE_USAGE?.total_limit) * 100
                                                            : 0
                                                    }
                                                    className="h-2 bg-blue-400"
                                                />
                                            </div>
                                        </div>

                                        {/* Image Processing Usage */}
                                        <div className="flex items-center space-x-2">
                                            <ImageIcon className="h-7 w-7 text-green-400 mt-[2px]" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between text-sm font-medium text-blue-100">
                                                    <span>Images Processed</span>
                                                    {activityState.IMAGE_USAGE ? (
                                                        <span>{activityState.IMAGE_USAGE.total_usage} / {activityState.IMAGE_USAGE.total_limit}</span>
                                                    ) : (
                                                        <span>{0} / {5}</span>
                                                    )}
                                                </div>
                                                <Progress
                                                    value={
                                                        activityState.IMAGE_USAGE
                                                            ? (activityState.IMAGE_USAGE?.total_usage / activityState.IMAGE_USAGE?.total_limit) * 100
                                                            : 0
                                                    }
                                                    className="h-2 bg-blue-400"
                                                />
                                            </div>
                                        </div>

                                        {/* Video Processing Usage */}
                                        <div className="flex items-center space-x-2">
                                            <Video className="h-7 w-7 text-purple-400 mt-[2px]" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between text-sm font-medium text-blue-100">
                                                    <span>Videos Processed</span>
                                                    {activityState.VIDEO_USAGE ? (
                                                        <span>{activityState.VIDEO_USAGE.total_usage} / {activityState.VIDEO_USAGE.total_limit}</span>
                                                    ) : (
                                                        <span>{0} / {2}</span>
                                                    )}
                                                </div>
                                                <Progress
                                                    value={
                                                        activityState.VIDEO_USAGE
                                                            ? (activityState.VIDEO_USAGE?.total_usage / activityState.VIDEO_USAGE?.total_limit) * 100
                                                            : 0
                                                    }
                                                    className="h-2 bg-blue-400"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Call-to-Action Button */}
                                <Link href="/pricing" className="block w-full pt-8">
                                    <Button variant="default" className="w-full bg-gray-100 text-blue-600 hover:bg-white">
                                        Upgrade Plan
                                    </Button>
                                </Link>
                            </CardContent>
                        </>
                    )}
                </Card>
            </div>

            {/* Recent orders and subscription plans list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className='min-h-60 max-h-96 flex-col'>
                    <CardHeader className='bg-yellow-400/90'>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 max-h-48 overflow-y-auto pb-0'>
                        {!orders
                            ? (orderLoader.userOrders || orderLoader.allOrders)
                                ? <Loader className='w-full h-full' />
                                : (
                                    <div className="flex flex-col h-full space-y-6 p-6">
                                        <div className="flex flex-1 flex-col justify-center items-center text-center">
                                            <RiFileList3Fill size={80} className="text-gray-500 dark:text-blue-200 opacity-50" />
                                            <p className="mt-4 text-gray-600 dark:text-blue-100 font-medium">Buy subscription plans or top-up orders they will be listed here.</p>
                                        </div>
                                    </div>
                                ) : (
                                <div className="space-y-4">
                                    {orders?.map((order) => (
                                        <div
                                            key={`order_item_${order.razorpay_order_id}`}
                                            className="flex justify-between items-center border-b pb-3 last:border-b-0"
                                        >
                                            <div>
                                                <div className="text-sm font-medium mb-1">{order.razorpay_order_id}</div>
                                                <div className="font-semibold text-xs text-muted-foreground">{formatDate(order.created_at)}</div>
                                            </div>
                                            <div className="w-1/2 grid grid-cols-2 justify-end text-right">
                                                <div className="font-semibold">{formatCurrency(order.amount)}</div>
                                                <Badge
                                                    className='justify-self-end'
                                                    variant={
                                                        order.status === PaymentStatus.CAPTURED
                                                            ? 'success'
                                                            : order.status === PaymentStatus.CREATED
                                                                ? 'secondary'
                                                                : order.status === PaymentStatus.FAILED
                                                                    ? 'destructive'
                                                                    : 'outline'
                                                    }
                                                >
                                                    {order.status.charAt(0).toUpperCase() + order.status.substring(1)}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </CardContent>
                    <CardFooter>
                        <Link href={'/pricing'} className='w-full mt-4'>
                            <Button variant="ghost" className="w-full">
                                {(!allOrders && !userOrders) ? 'Create New order' : 'View All Orders'}
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Subscription Plans Card */}
                <Card className='min-h-60 max-h-96 flex flex-col'>
                    <CardHeader className='bg-red-500 text-white'>
                        <CardTitle>Subscription Plans</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 max-h-48 overflow-y-auto pb-0'>
                        {!plansList
                            ? activityLoader.planListLoading
                                ? <Loader className='w-full h-full' />
                                : (
                                    <div className="flex flex-col h-full space-y-6 p-6">
                                        <div className="flex flex-1 flex-col justify-center items-center text-center">
                                            <LuBadgeX size={80} className="text-gray-500 dark:text-blue-200 opacity-50" />
                                            <p className="text-gray-600 dark:text-blue-100 font-medium">You can buy Subscription Plans in advance, they will be activated automatically after a plan expires.</p>
                                        </div>
                                    </div>
                                ) : (
                                <div className="space-y-2">
                                    {plansList && plansList.length > 0 && plansList.map((plan) => (
                                        <div
                                            key={`plan_item_${plan.plan_name}`}
                                            className="border rounded-lg px-4 py-3 space-y-2"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-sm font-medium">{plan.plan_name}</h3>
                                                <div className="flex items-center space-x-6">
                                                    <span className='text-xs font-semibold'>Purchased On: {formatDate(plan.created_at)}</span>
                                                    <Badge
                                                        variant={
                                                            plan.is_active
                                                                ? 'success'
                                                                : plan.expiry_date
                                                                    ? checkExpired(plan.expiry_date)
                                                                        ? 'destructive'
                                                                        : 'info'
                                                                    : 'info'
                                                        }
                                                    >
                                                        {plan.is_active
                                                            ? 'Active'
                                                            : plan.expiry_date
                                                                ? checkExpired(plan.expiry_date)
                                                                    ? 'Expired'
                                                                    : 'Queue'
                                                                : 'Queue'
                                                        }
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="text-sm text-primary">
                                                {plan.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </CardContent>
                    <CardFooter>
                        <Link href={'/pricing'} className='w-full mt-4'>
                            <Button variant="ghost" className="w-full">
                                {plansList ? 'Manage Subscription Plan' : 'Buy Subscription Plan'}
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>

            {/* Recent Images */}
            <div className="grid grid-cols-1">
                <RecentImagesSection title='Recent Images' media_list={recentImages} />
            </div>

            {/* Recent Videos */}
            <div className="grid grid-cols-1">
                <RecentImagesSection title='Recent Videos' media_list={recentImages} />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 gap-6">
                {/* Usage Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Processing Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={usageData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
};

export default DashboardPage;