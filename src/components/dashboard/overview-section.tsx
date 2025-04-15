import React from 'react';
import Link from 'next/link';
import { Activity, ImageIcon, Video, Clock, Gift, Database } from 'lucide-react';
import Loader from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import PlanPill from '@/components/ui/plan-pill';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, remainingDays } from '@/utils/general';
import { formatFileSize } from '@/utils/file_utils';
import { SubscriptionPlansEnum } from '@/types/enums';
import { FaBusinessTime } from 'react-icons/fa6';


const SectionOverview = ({ activePlans, loading, activityState }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column: Stats Cards */}
            <div className="space-y-4 md:space-y-6">
                {/* Top Stats in Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {/* Total Processed */}
                    <Card className="overflow-hidden">
                        <CardContent className="p-3 sm:p-4 md:p-6">
                            <div className="flex items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 truncate">Total Processed</p>
                                    <h3 className="text-xl sm:text-2xl font-bold">1,234</h3>
                                </div>
                                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 flex-shrink-0" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Images Processed */}
                    <Card className="overflow-hidden">
                        <CardContent className="p-3 sm:p-4 md:p-6">
                            <div className="flex items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 truncate">Images Processed</p>
                                    <h3 className="text-xl sm:text-2xl font-bold">856</h3>
                                </div>
                                <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 flex-shrink-0" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Videos Processed */}
                    <Card className="overflow-hidden">
                        <CardContent className="p-3 sm:p-4 md:p-6">
                            <div className="flex items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 truncate">Videos Processed</p>
                                    <h3 className="text-xl sm:text-2xl font-bold">378</h3>
                                </div>
                                <Video className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 flex-shrink-0" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Processing Time */}
                    <Card className="overflow-hidden">
                        <CardContent className="p-3 sm:p-4 md:p-6">
                            <div className="flex items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 truncate">Processing Time</p>
                                    <h3 className="text-xl sm:text-2xl font-bold">1.2s</h3>
                                </div>
                                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 flex-shrink-0" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Alert Message */}
                <Card className="bg-green-600 dark:bg-green-600/80 overflow-hidden">
                    <CardContent className="p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-center space-x-2">
                            <Gift className="text-amber-300 size-7 md:size-6 flex-shrink-0" />
                            <p className="text-white font-medium text-sm sm:text-base">
                                Limited-time offer! Upgrade your plan now and get 20% Off
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Subscription Card */}
            <Card className="bg-gradient-to-tl from-blue-700 to-blue-600 dark:from-blue-600/90 dark:to-blue-600/70 overflow-hidden">
                {!activePlans ? (
                    (loading) ? (
                        <div className="flex justify-center items-center h-full min-h-48 py-6">
                            <Loader className="w-8 h-8" />
                        </div>
                    ) : (
                        <div className="flex flex-col h-full min-h-48 space-y-4 p-4 md:space-y-6 md:p-6">
                            <div className="flex flex-1 flex-col justify-center items-center text-center">
                                <FaBusinessTime size={80} className="text-blue-200 opacity-50" />
                                <p className="mt-3 text-blue-100 text-sm md:text-base font-medium">You don&apos;t have any Active Subscription Plan.</p>
                            </div>
                            <Link href="/pricing" className="block w-full">
                                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 py-1 px-3 h-auto sm:py-2">
                                    Buy Subscription Plan
                                </Button>
                            </Link>
                        </div>
                    )
                ) : (
                    <>
                        <CardHeader className="bg-blue-800/90 p-3 sm:p-4 md:p-6">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <CardTitle className="text-white text-base md:text-lg">Your Active Plan</CardTitle>
                                {activePlans.length > 0 && (
                                    <PlanPill
                                        plan={SubscriptionPlansEnum[activePlans[0].plan_name] || SubscriptionPlansEnum.BASIC}
                                    />
                                )}
                            </div>
                        </CardHeader>

                        <CardContent className="p-3 md:p-6">
                            <div className="grid grid-cols-2 gap-2 md:gap-4">
                                {/* Subscription Details */}
                                <div className="flex flex-col space-y-4">
                                    <div className="grid grid-cols-5 gap-1 md:gap-2 text-xs sm:text-sm">
                                        <span className="col-span-3 font-semibold text-neutral-200">Purchased On:</span>
                                        <span className="col-span-2 font-medium text-blue-50">{formatDate(activePlans[0]?.created_at)}</span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-1 md:gap-2 text-xs sm:text-sm">
                                        <span className="col-span-3 font-semibold text-neutral-200">Expiration Date:</span>
                                        <span className="col-span-2 font-medium text-blue-50">{formatDate(activePlans[0]?.expiry_date)}</span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-1 md:gap-2 text-xs sm:text-sm">
                                        <span className="col-span-3 font-semibold text-neutral-200">Plan Expiration:</span>
                                        <span className="col-span-2 font-medium text-blue-50">
                                            {remainingDays(activePlans[0]?.expiry_date)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-1 md:gap-2 text-xs sm:text-sm">
                                        <span className="col-span-3 font-semibold text-neutral-200">Backup Expiry:</span>
                                        <span className="col-span-2 font-medium text-blue-50">{formatDate(activePlans[0]?.backup_till)}</span>
                                    </div>
                                </div>

                                {/* Usage Metrics */}
                                <div className="space-y-3 md:space-y-4">
                                    {/* Storage Usage */}
                                    <div className="flex items-center space-x-2">
                                        <Database className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-blue-100 mb-1">
                                                <span>Storage</span>
                                                <span className="whitespace-nowrap">
                                                    {activityState?.STORAGE_USAGE ? (
                                                        `${formatFileSize(activityState.STORAGE_USAGE.total_usage, false)} / ${formatFileSize(activityState.STORAGE_USAGE.total_limit)}`
                                                    ) : (
                                                        `0 / 250 MB`
                                                    )}
                                                </span>
                                            </div>
                                            <Progress
                                                value={
                                                    activityState?.STORAGE_USAGE
                                                        ? (activityState.STORAGE_USAGE.total_usage / activityState.STORAGE_USAGE.total_limit) * 100
                                                        : 0
                                                }
                                                className="h-1.5 sm:h-2 bg-blue-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Image Processing Usage */}
                                    <div className="flex items-center space-x-2">
                                        <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-blue-100 mb-1">
                                                <span>Images</span>
                                                <span className="whitespace-nowrap">
                                                    {activityState?.IMAGE_USAGE ? (
                                                        `${activityState.IMAGE_USAGE.total_usage} / ${activityState.IMAGE_USAGE.total_limit}`
                                                    ) : (
                                                        `0 / 5`
                                                    )}
                                                </span>
                                            </div>
                                            <Progress
                                                value={
                                                    activityState?.IMAGE_USAGE
                                                        ? (activityState.IMAGE_USAGE.total_usage / activityState.IMAGE_USAGE.total_limit) * 100
                                                        : 0
                                                }
                                                className="h-1.5 sm:h-2 bg-blue-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Video Processing Usage */}
                                    <div className="flex items-center space-x-2">
                                        <Video className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-blue-100 mb-1">
                                                <span>Videos</span>
                                                <span className="whitespace-nowrap">
                                                    {activityState?.VIDEO_USAGE ? (
                                                        `${activityState.VIDEO_USAGE.total_usage} / ${activityState.VIDEO_USAGE.total_limit}`
                                                    ) : (
                                                        `0 / 2`
                                                    )}
                                                </span>
                                            </div>
                                            <Progress
                                                value={
                                                    activityState?.VIDEO_USAGE
                                                        ? (activityState.VIDEO_USAGE.total_usage / activityState.VIDEO_USAGE.total_limit) * 100
                                                        : 0
                                                }
                                                className="h-1.5 sm:h-2 bg-blue-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Call-to-Action Button */}
                            <div className="mt-4 md:mt-6">
                                <Link href="/pricing" className="block w-full">
                                    <Button
                                        variant="default"
                                        className="w-full bg-gray-100 text-blue-600 hover:bg-white py-1 px-3 h-auto sm:py-2"
                                    >
                                        Upgrade Plan
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    );
};

export default SectionOverview;