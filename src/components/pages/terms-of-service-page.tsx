'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, Check, Mail, Scale } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

const TermsOfServicePage: React.FC = () => {
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
                        Terms of Service
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mx-auto">
                        Please read these terms carefully before using our service
                    </p>
                    <div className="mt-6">
                        <p className="text-gray-500 dark:text-gray-400">Last updated: April 18, 2025</p>
                    </div>
                </motion.div>

                <motion.div variants={fadeIn}>
                    <Card className="dark:bg-gray-800 border-none mb-8 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">Introduction</CardTitle>
                            <CardDescription>
                                Agreement between you and ObjectVision
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 dark:text-gray-400 ">
                                Welcome to ObjectVision. These Terms of Service (Terms) govern your access to and use of the ObjectVision website, services, and applications (collectively, the Service). By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy.
                            </p>
                            <p className="text-gray-700 dark:text-gray-400  mt-4">
                                Please read these Terms carefully before using our Service. If you do not agree to these Terms, you must not access or use the Service. We may modify these Terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of the Service following any changes indicates your acceptance of the modified Terms.
                            </p>

                            <Alert className="mt-6 border-amber-200 bg-amber-50 dark:bg-amber-100">
                                <AlertTriangle className="h-4 w-4 text-amber-700" />
                                <AlertTitle className="text-amber-700">Important Notice</AlertTitle>
                                <AlertDescription className="text-amber-700">
                                    By using ObjectVision, you are entering into a binding agreement. If you are using our service on behalf of a company or organization, you represent that you have the authority to bind that entity to these Terms.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={fadeIn}>
                    <Accordion type="single" collapsible className="mb-8">
                        <AccordionItem value="service-description">
                            <AccordionTrigger className="text-xl font-semibold">
                                Service Description
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            ObjectVision provides an object detection service that allows users to upload images and videos for automated detection and analysis of objects within that content.
                                        </p>
                                        <p className="text-gray-700 dark:text-gray-400  mt-4">
                                            Our Service includes:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400 ">
                                            <li>Automated object detection in images and videos</li>
                                            <li>Results storage and retrieval</li>
                                            <li>Related analytics and reporting</li>
                                            <li>User account management</li>
                                        </ul>
                                        <p className="text-gray-700 dark:text-gray-400  mt-4">
                                            We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="account-terms">
                            <AccordionTrigger className="text-xl font-semibold">
                                Account Terms
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            To access certain features of our Service, you may be required to register for an account. When you register, you agree to:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400 ">
                                            <li>Provide accurate, current, and complete information</li>
                                            <li>Maintain and promptly update your account information</li>
                                            <li>Maintain the security of your account credentials</li>
                                            <li>Accept responsibility for all activities that occur under your account</li>
                                            <li>Notify us immediately of any unauthorized use of your account</li>
                                        </ul>
                                        <p className="text-gray-700 dark:text-gray-400  mt-4">
                                            We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion if we believe you have violated these Terms.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="user-content">
                            <AccordionTrigger className="text-xl font-semibold">
                                User Content & Ownership
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <div className="flex items-center mb-4">
                                            <Check className="h-5 w-5 text-green-500 mr-2" />
                                            <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300 ">You Retain Ownership</h3>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            You retain all ownership rights to any content you upload to our Service, including images, videos, and other materials (User Content). By uploading User Content to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and process your User Content for the purpose of providing and improving our Service.
                                        </p>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Content Restrictions</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            You agree not to upload, transmit, or share User Content that:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400 ">
                                            <li>Infringes on intellectual property rights of others</li>
                                            <li>Contains illegal, harmful, threatening, abusive, or defamatory material</li>
                                            <li>Contains software viruses or any other code designed to interrupt, destroy, or limit the functionality of computer software or hardware</li>
                                            <li>Violates the privacy rights of others</li>
                                            <li>Contains sexually explicit or violent content</li>
                                            <li>Promotes discrimination, bigotry, racism, hatred, or harm against any individual or group</li>
                                            <li>Is used to impersonate another person or misrepresent your affiliation with a person or entity</li>
                                        </ul>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Monitoring and Enforcement</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            We reserve the right, but not the obligation, to monitor and review User Content. We may remove any User Content that, in our sole judgment, violates these Terms or may be offensive, illegal, or violate the rights of any person or entity.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="limitations">
                            <AccordionTrigger className="text-xl font-semibold">
                                Limitations & Liability
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mb-2">Service Limitations</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            Our Service is provided on availablity basis. We do not guarantee that:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400 ">
                                            <li>The Service will meet your specific requirements</li>
                                            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                                            <li>The results obtained from using the Service will be accurate or reliable</li>
                                            <li>Any errors in the Service will be corrected</li>
                                        </ul>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Disclaimers and Limitations of Liability</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            To the fullest extent permitted by law:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400 ">
                                            <li>We are not liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use of the Service</li>
                                            <li>We are not liable for any damages resulting from the misuse of detection results</li>
                                            <li>We are not liable for any damages resulting from temporary downtime or service interruptions</li>
                                        </ul>

                                        <Alert className="mt-6 border-gray-200 bg-gray-50 dark:bg-gray-200">
                                            <Scale className="h-4 w-4 text-gray-600" />
                                            <AlertTitle className="text-gray-800">Legal Notice</AlertTitle>
                                            <AlertDescription className="text-gray-700 dark:text-gray-600 ">
                                                Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for certain damages. Accordingly, some of the above limitations may not apply to you.
                                            </AlertDescription>
                                        </Alert>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="intellectual-property">
                            <AccordionTrigger className="text-xl font-semibold">
                                Intellectual Property
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mb-2">Our Intellectual Property</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            The Service and its original content, features, and functionality are owned by ObjectVision and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                                        </p>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Restrictions</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            You agree not to:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400 ">
                                            <li>Reverse engineer, decompile, disassemble, or attempt to discover the source code of our software</li>
                                            <li>Copy, modify, create derivative works based on, or distribute any part of our Service</li>
                                            <li>Attempt to gain unauthorized access to any portion of the Service or its related systems or networks</li>
                                            <li>Use our Service for any purpose that is unlawful or prohibited by these Terms</li>
                                            <li>Use data mining, robots, or similar data gathering and extraction methods</li>
                                            <li>Sell, resell, rent, or lease the Service</li>
                                        </ul>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Feedback</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            If you provide us with any feedback or suggestions regarding the Service, you hereby assign to us all rights in such feedback and agree that we shall have the right to use such feedback in any manner we deem appropriate.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="term-termination">
                            <AccordionTrigger className="text-xl font-semibold">
                                Term & Termination
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mb-2">Term</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            These Terms shall remain in full force and effect while you use the Service or maintain an account with us.
                                        </p>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Termination by You</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            You may terminate your account at any time by contacting us or using the account deletion feature in your account settings, if available.
                                        </p>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Termination by Us</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400 ">
                                            <li>Violation of these Terms</li>
                                            <li>Upon request by law enforcement or government agencies</li>
                                            <li>Discontinuation or material modification of the Service</li>
                                            <li>Unexpected technical or security issues</li>
                                            <li>Extended periods of inactivity</li>
                                        </ul>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Effect of Termination</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            Upon termination, your right to use the Service will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="dispute-resolution">
                            <AccordionTrigger className="text-xl font-semibold">
                                Dispute Resolution
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card className="dark:bg-gray-800 border-none shadow-none">
                                    <CardContent className="pt-4">
                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mb-2">Governing Law</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            These Terms shall be governed and construed in accordance with the laws applicable in the jurisdiction where we are incorporated, without regard to its conflict of law provisions.
                                        </p>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Informal Resolution</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            If you have a dispute with us, you agree to contact us first and attempt to resolve the dispute informally by sending a written notice to us by email. We will make good faith efforts to resolve any dispute through informal means.
                                        </p>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Arbitration</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            If we cannot resolve a dispute informally, you and we agree to resolve any dispute through binding arbitration in accordance with the rules of the relevant jurisdiction, rather than in court.
                                        </p>

                                        <h3 className="font-medium text-lg text-gray-900 dark:text-gray-300  mt-6 mb-2">Exceptions</h3>
                                        <p className="text-gray-700 dark:text-gray-400 ">
                                            The following disputes are excluded from binding arbitration:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-400 ">
                                            <li>Disputes seeking to enforce or protect intellectual property rights</li>
                                            <li>Disputes related to allegations of theft, piracy, or unauthorized use</li>
                                            <li>Any claim for injunctive relief</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>

                <motion.div variants={fadeIn}>
                    <Card className="dark:bg-gray-800 mb-8 shadow-lg border-t-4 border-t-blue-500">
                        <CardHeader>
                            <CardTitle className="text-2xl">Changes to Terms</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 dark:text-gray-400 ">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of changes by posting the updated Terms on this page with a new Last updated date. What constitutes a material change will be determined at our sole discretion.
                            </p>
                            <p className="text-gray-700 dark:text-gray-400  mt-4">
                                By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
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
                            <p className="text-gray-700 dark:text-gray-400 ">
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <Link
                                href="mailto:imtiaj.dev.kol@gmail.com"
                                className={cn(
                                    "flex items-center justify-center mt-4 p-4 rounded-lg",
                                    "bg-blue-50 dark:bg-blue-300",
                                    "hover:bg-blue-200 dark:hover:bg-blue-400"
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

export default TermsOfServicePage;