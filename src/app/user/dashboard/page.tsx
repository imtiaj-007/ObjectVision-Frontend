'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Line } from "recharts";
import { ArrowUpIcon, ArrowDownIcon, Image as ImageIcon, Video, Clock, Users } from "lucide-react";


const processingData = [
    { name: "Mon", images: 45, videos: 23 },
    { name: "Tue", images: 52, videos: 34 },
    { name: "Wed", images: 61, videos: 41 },
    { name: "Thu", images: 48, videos: 28 },
    { name: "Fri", images: 55, videos: 37 },
    { name: "Sat", images: 42, videos: 25 },
    { name: "Sun", images: 38, videos: 19 }
];

const realTimeData = [
    { time: "00:00", detections: 12 },
    { time: "04:00", detections: 8 },
    { time: "08:00", detections: 25 },
    { time: "12:00", detections: 35 },
    { time: "16:00", detections: 30 },
    { time: "20:00", detections: 20 },
    { time: "23:59", detections: 15 }
];

const DashboardPage = () => {

    return (
        <>
            <div className="space-y-6">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your AI processing activities
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Images Processed
                            </CardTitle>
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2,543</div>
                            <div className="flex items-center text-sm text-green-500">
                                <ArrowUpIcon className="h-4 w-4 mr-1" />
                                12% from last week
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Videos Processed
                            </CardTitle>
                            <Video className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,274</div>
                            <div className="flex items-center text-sm text-green-500">
                                <ArrowUpIcon className="h-4 w-4 mr-1" />
                                8% from last week
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Average Processing Time
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1.2s</div>
                            <div className="flex items-center text-sm text-red-500">
                                <ArrowDownIcon className="h-4 w-4 mr-1" />
                                3% from last week
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">573</div>
                            <div className="flex items-center text-sm text-green-500">
                                <ArrowUpIcon className="h-4 w-4 mr-1" />
                                15% from last week
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Processing Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={processingData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="images" fill="#2563eb" name="Images" />
                                    <Bar dataKey="videos" fill="#4f46e5" name="Videos" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Real-Time Detections (24h)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={realTimeData}>
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="detections"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>            
        </>
    );
};

export default DashboardPage;