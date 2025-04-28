'use client'
import Link from "next/link";
import { BrainCircuit, LineChart, CloudCog, Settings2, ShieldCheck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebsiteLogo from "@/components/website-logo";


interface WebsiteOverviewProps {
    type?: string;
    title: string;
    subtitle: string;
}


const WebsiteOverview: React.FC<WebsiteOverviewProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col lg:col-span-6">
            <div className="space-y-6 my-auto">
                <div className="flex items-center justify-between">
                    <WebsiteLogo />
                    <Link href="/" passHref>
                        <Button>
                            <Home size={20} />
                            Go To Home
                        </Button>
                    </Link>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <p className="text-gray-300">{subtitle}</p>
                </div>

                {/* Features grid */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
                        <div className="rounded-full bg-blue-900 p-2">
                            <BrainCircuit size={20} className="text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Smart Detection</h3>
                            <p className="text-sm text-gray-300">Detect and identify objects in real-time using AI.</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
                        <div className="rounded-full bg-green-900 p-2">
                            <LineChart size={20} className="text-teal-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Visual Insights</h3>
                            <p className="text-sm text-gray-300">Get visual summaries and stats of detected objects.</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
                        <div className="rounded-full bg-purple-900 p-2">
                            <CloudCog size={20} className="text-red-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Secure Storage</h3>
                            <p className="text-sm text-gray-300">All your media are securely stored and accessible.</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
                        <div className="rounded-full bg-amber-900 p-2">
                            <Settings2 size={20} className="text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Custom Model</h3>
                            <p className="text-sm text-gray-300">Train your own models for business needs.</p>
                        </div>
                    </div>
                </div>

                {/* Security notice */}
                <div className="flex items-center justify-center mt-6 text-gray-400 text-sm">
                    <ShieldCheck size={16} className="mr-2" />
                    <span>Your connection is secure and encrypted</span>
                </div>
            </div>
        </div>
    );
};

export default WebsiteOverview;