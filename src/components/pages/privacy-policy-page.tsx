'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail } from "lucide-react";
import Link from 'next/link';
import { cn } from '@/lib/utils';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-5xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.div variants={fadeIn} className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-300 sm:text-5xl mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mx-auto">
                        Our commitment is to protect your privacy and handling your data with care
                    </p>
                    <div className="mt-6">
                        <p className="text-gray-500 dark:text-gray-400">Last updated: April 18, 2025</p>
                    </div>
                </motion.div>

                <motion.div variants={fadeIn}>
                    <Card className="dark:bg-gray-800 mb-8 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">Overview</CardTitle>
                            <CardDescription>
                                How ObjectVision approaches your privacy
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 dark:text-gray-400">
                                ObjectVision is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our object detection service. We take your privacy seriously and have designed our systems with data protection in mind.
                            </p>
                            <p className="text-gray-700 dark:text-gray-400 mt-4">
                                By using our service, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={fadeIn}>
                    <Accordion type="single" collapsible className="mb-8">
                        <AccordionItem value="data-collection">
                            <AccordionTrigger className="text-xl font-semibold">
                                Data Collection
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300 mb-2">Information We Collect</h3>
                                        <p className="text-gray-700 dark:text-gray-400">We collect the following types of information:</p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400">
                                            <li><span className="font-medium">Personal Information:</span> Email address for account creation and communication</li>
                                            <li><span className="font-medium">Content Data:</span> Images and videos you upload for object detection processing</li>
                                            <li><span className="font-medium">Usage Data:</span> Information about how you interact with our service, including access times, pages viewed, and features used</li>
                                            <li><span className="font-medium">Device Information:</span> Information about your device, including IP address, browser type, and operating system</li>
                                        </ul>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300 mt-6 mb-2">Collection Methods</h3>
                                        <p className="text-gray-700 dark:text-gray-400">We collect information through:</p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400">
                                            <li>Direct interactions when you create an account or use our services</li>
                                            <li>Automated technologies such as cookies and similar tracking technologies</li>
                                            <li>Third-party analytics providers that help us understand service usage</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="data-use">
                            <AccordionTrigger className="text-xl font-semibold">
                                Use of Data
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <p className="text-gray-700 dark:text-gray-400">We use the collected data for various purposes:</p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400">
                                            <li><span className="font-medium">Service Provision:</span> To provide and maintain our object detection service, including processing your uploads and delivering detection results</li>
                                            <li><span className="font-medium">Service Improvement:</span> To analyze usage patterns and improve our algorithms and user experience</li>
                                            <li><span className="font-medium">Communications:</span> To notify you about changes to our service, provide support, and send service-related information</li>
                                            <li><span className="font-medium">Analytics:</span> To monitor the usage of our service and gather valuable insights for improving performance and features</li>
                                            <li><span className="font-medium">Security:</span> To detect, prevent, and address technical issues and potential security threats</li>
                                        </ul>
                                        <p className="text-gray-700 dark:text-gray-400 mt-4">
                                            We retain your data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="data-sharing">
                            <AccordionTrigger className="text-xl font-semibold">
                                Data Sharing
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <p className="text-gray-700 dark:text-gray-400">We do not share your personal information with third parties except in the following circumstances:</p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400">
                                            <li><span className="font-medium">Service Providers:</span> We may engage trusted third-party companies to facilitate our service, perform service-related tasks, or assist us in analyzing how our service is used. These providers have access to your information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</li>
                                            <li><span className="font-medium">Legal Requirements:</span> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                                            <li><span className="font-medium">Business Transfer:</span> In the event of a merger, acquisition, or asset sale, your personal information may be transferred. We will provide notice before your personal information becomes subject to a different Privacy Policy.</li>
                                        </ul>
                                        <p className="text-gray-700 dark:text-gray-400 mt-4">
                                            Under no circumstances do we sell, trade, or rent your personal identification information to others.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="security">
                            <AccordionTrigger className="text-xl font-semibold">
                                Security
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <p className="text-gray-700 dark:text-gray-400">The security of your data is important to us, but no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300 mt-6 mb-2">Our Security Measures Include:</h3>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400">
                                            <li>Encryption of data in transit and at rest</li>
                                            <li>Regular security assessments and vulnerability testing</li>
                                            <li>Access controls and authentication mechanisms</li>
                                            <li>Secure infrastructure hosted in certified data centers</li>
                                            <li>Regular security updates and patch management</li>
                                            <li>Employee training on security best practices</li>
                                        </ul>
                                        <p className="text-gray-700 dark:text-gray-400 mt-4">
                                            We promptly address any security incidents and will notify affected users as required by applicable law.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="your-rights">
                            <AccordionTrigger className="text-xl font-semibold">
                                Your Rights
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <p className="text-gray-700 dark:text-gray-400">Depending on your location, you may have certain rights regarding your personal information:</p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400">
                                            <li><span className="font-medium">Access:</span> You can request copies of your personal information we hold</li>
                                            <li><span className="font-medium">Correction:</span> You can request that we correct any information you believe is inaccurate</li>
                                            <li><span className="font-medium">Deletion:</span> You can request that we delete your personal information</li>
                                            <li><span className="font-medium">Restriction:</span> You can request that we restrict the processing of your information</li>
                                            <li><span className="font-medium">Data Portability:</span> You can request the transfer of your information to another organization</li>
                                            <li><span className="font-medium">Withdraw Consent:</span> You can withdraw your consent where we rely on consent to process your information</li>
                                        </ul>
                                        <p className="text-gray-700 dark:text-gray-400 mt-4">
                                            To exercise any of these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="cookies">
                            <AccordionTrigger className="text-xl font-semibold">
                                Cookies and Tracking
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <p className="text-gray-700 dark:text-gray-400">We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.</p>
                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300 mt-6 mb-2">Types of Cookies We Use:</h3>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400">
                                            <li><span className="font-medium">Essential Cookies:</span> Required for the operation of our service</li>
                                            <li><span className="font-medium">Functional Cookies:</span> Help us recognize you and remember your preferences</li>
                                            <li><span className="font-medium">Analytical Cookies:</span> Allow us to analyze how users interact with our service</li>
                                        </ul>
                                        <p className="text-gray-700 dark:text-gray-400 mt-4">
                                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>

                <motion.div variants={fadeIn}>
                    <Card className="dark:bg-gray-800 mb-8 shadow-lg border-t-4 border-t-blue-500">
                        <CardHeader>
                            <CardTitle className="text-2xl">Changes to This Policy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 dark:text-gray-400">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the Last updated date at the top of the policy.
                            </p>
                            <p className="text-gray-700 dark:text-gray-400 mt-4">
                                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={fadeIn}>
                    <Card className="dark:bg-gray-800 mb-8 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">Contact Us</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 dark:text-gray-400">
                                If you have any questions about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <Link
                                href="mailto:imtiaj.dev.kol@gmail.com"
                                className={cn(
                                    "flex items-center justify-center mt-4 p-4 rounded-lg",
                                    "bg-blue-50 dark:bg-blue-300",
                                    "hover:bg-blue-200 dark:hover:bg-blue-500"
                                )}
                                passHref
                            >
                                <Mail className="h-5 w-5 text-blue-500 dark:text-blue-700 mr-3" />
                                <span className="text-blue-500 dark:text-blue-700 font-medium">
                                    imtiaj.dev.kol@gmail.com
                                </span>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicyPage;