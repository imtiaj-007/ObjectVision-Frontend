/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LuBadgeX } from "react-icons/lu";
import { RiFileList3Fill } from "react-icons/ri";

import { OrderResponse } from '@/types/payment';
import { UserActivityResponse } from '@/types/subscription_activity';
import { ActivityTypeEnum, PaymentStatus, UserRoleEnum } from '@/types/enums';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SectionOverview from '@/components/dashboard/overview-section';

import useUser from '@/hooks/use-user';
import { useOrder } from '@/hooks/use-order';
import { useSubscriptionActivity } from '@/hooks/use-subscription-activity';
import { checkExpired, formatCurrency, formatDate } from '@/utils/general';


const usageData = [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 78 },
    { name: 'Wed', value: 89 },
    { name: 'Thu', value: 72 },
    { name: 'Fri', value: 85 },
    { name: 'Sat', value: 68 },
    { name: 'Sun', value: 75 },
];


const DashboardPage: React.FC = () => {
    const { user_details } = useUser();
    const { fetchUserOrders, fetchAllOrders, userOrders, allOrders, loading: orderLoader } = useOrder();
    const { plansList, activePlans, userActivity, loading: activityLoader } = useSubscriptionActivity();
    const [activityState, setActivityState] = useState<Record<ActivityTypeEnum, UserActivityResponse | null>>(
        Object.values(ActivityTypeEnum).reduce((acc, key) => {
            acc[key] = null;
            return acc;
        }, {} as Record<ActivityTypeEnum, UserActivityResponse | null>)
    );
    const [orders, setOrders] = useState<OrderResponse[] | null>(null);


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
            if (user_details.user?.role === UserRoleEnum.USER) {
                fetchUserOrders(user_details.user?.id);
            } else {
                fetchAllOrders();
            }
        }
    }, [user_details]);

    useEffect(() => {
        if (allOrders && allOrders.length > 0)
            setOrders(allOrders);
        else if (userOrders && userOrders.length > 0)
            setOrders(userOrders);
    }, [userOrders, allOrders]);


    return (
        <div className="space-y-6">
            <SectionOverview
                activePlans={activePlans}
                loading={activityLoader?.activePlanLoading || activityLoader?.userActivityLoading}
                activityState={activityState}
            />

            {/* Recent orders and subscription plans list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className='min-h-60 max-h-96 flex flex-col'>
                    <CardHeader className='bg-yellow-400/90 dark:bg-amber-400/70 p-3 sm:p-4 md:p-6'>
                        <CardTitle className="text-base md:text-lg">Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 max-h-48 overflow-y-auto px-2 md:px-6 pb-0'>
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
                                <div className="space-y-2">
                                    {orders?.map((order) => (
                                        <div
                                            key={`order_item_${order.razorpay_order_id}`}
                                            className="flex justify-between items-center border-b-2 px-0 md:px-4 pb-3 last:border-b-0"
                                        >
                                            <div>
                                                <div className="text-sm font-medium mb-1">{order.razorpay_order_id}</div>
                                                <div className="font-semibold text-xs text-muted-foreground">{formatDate(order.created_at)}</div>
                                            </div>
                                            <div className="w-1/2 grid grid-cols-2 justify-end text-right">
                                                <div className="font-semibold text-sm md:text-base">{formatCurrency(order.amount)}</div>
                                                <Badge
                                                    className='justify-self-end py-1'
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
                    <CardFooter className="p-3 sm:p-4 md:p-6">
                        <Link href={'/pricing'} className='w-full mt-4'>
                            <Button variant="ghost" className="w-full">
                                {(!allOrders && !userOrders) ? 'Create New order' : 'View All Orders'}
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Subscription Plans Card */}
                <Card className='min-h-60 max-h-96 flex flex-col'>
                    <CardHeader className='bg-red-500 dark:bg-red-500/80 text-white p-3 sm:p-4 md:p-6'>
                        <CardTitle className="text-base md:text-lg">Subscription Plans</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 max-h-48 overflow-y-auto px-2 md:px-6 pb-0'>
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
                                            className="border dark:bg-black/15 rounded-lg p-2 md:p-3 space-y-2"
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
                    <CardFooter className="p-3 md:p-6">
                        <Link href={'/pricing'} className='w-full mt-4'>
                            <Button variant="ghost" className="w-full">
                                {plansList ? 'Manage Subscription Plan' : 'Buy Subscription Plan'}
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 gap-6">
                {/* Usage Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader className="p-3 sm:p-4 md:p-6">
                        <CardTitle className="text-base md:text-lg">Processing Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 md:p-6">
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