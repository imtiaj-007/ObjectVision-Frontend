'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Info, ShieldCheck, Clock, Code, CreditCard, FileType, UserPlus, Loader, LifeBuoy } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from '../ui/button';


const faqData = [
    {
        id: 1,
        question: "What is ObjectVision?",
        answer: "ObjectVision is an AI-powered platform that allows users to upload images or videos and perform object detection, segmentation, classification, and pose estimation. It's built for speed, accuracy, and visual insights.",
        icon: <Info className="text-indigo-500" />
    },
    {
        id: 2,
        question: "Do I need to create an account to use ObjectVision?",
        answer: "Yes, you'll need to sign up to access full features like uploading media, viewing results, and saving task history. OAuth sign-in via Google is supported for convenience.",
        icon: <UserPlus className="text-indigo-500" />
    },
    {
        id: 3,
        question: "What file formats are supported?",
        answer: (
            <div>
                We support a wide range of image and video formats:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>
                        <strong>Images:</strong>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.jpg</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.jpeg</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.png</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.bmp</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.webp</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.tiff</code> etc.
                    </li>
                    <li>
                        <strong>Videos:</strong>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.mp4</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.mov</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.avi</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.mkv</code>{" "}
                        <code className="bg-slate-100 dark:bg-slate-400 dark:text-gray-800 px-1 py-0.5 rounded">.webm</code> etc.
                    </li>
                </ul>
            </div>
        ),
        icon: <FileType className="text-indigo-500" />
    },
    {
        id: 4,
        question: "How secure is my data?",
        answer: (
            <p>
                We take privacy seriously. All files are processed securely, and your data is not shared with third parties.<br />
                For more info check our{" "}<Link href="/privacy-policy" className="font-medium text-blue-600">Privacy Policy</Link>.
            </p>
        ),
        icon: <ShieldCheck className="text-indigo-500" />
    },
    {
        id: 5,
        question: "How long is my uploaded data stored?",
        answer: (
            <p>
                Uploaded media is temporarily cached and removed automatically after 1 hour, unless you&apos;re on a premium plan that supports long-term storage.
                (Please check <Link href="/pricing" className="font-medium text-blue-600">plan details</Link> page for actual detailed info)
            </p>)
        ,
        icon: <Clock className="text-indigo-500" />
    },
    {
        id: 6,
        question: "Can I integrate ObjectVision into my own app or workflow?",
        answer: "Yes! We're working on an API and plugin that you can use to integrate ObjectVision into your website, CMS, or data pipelines. Contact us for early access.",
        icon: <Code className="text-indigo-500" />
    },
    {
        id: 7,
        question: "Is ObjectVision free to use?",
        answer: "Basic access is free with limited usage. We offer premium plans for advanced features, more usage, and extended data retention.",
        icon: <CreditCard className="text-indigo-500" />
    },
    {
        id: 8,
        question: "Can I use ObjectVision for commercial purposes?",
        answer: "Yes — our commercial license covers business and enterprise use. Reach out to us for details and pricing.",
        icon: <CreditCard className="text-indigo-500" />
    },
    {
        id: 9,
        question: "Why is my file taking long to process?",
        answer: "Processing times may vary depending on file size and model type. If it takes too long, ensure your upload is within the size limits and try again.",
        icon: <Loader className="text-indigo-500" />
    },
    {
        id: 10,
        question: "How can I get support?",
        answer: (
            <p>
                You can reach us at <Link href="mailto:imtiaj.dev.kol@gmail.com" className="font-medium text-blue-600">imtiaj.dev.kol@gmail.com</Link>, or use the contact form on our site.
            </p>
        ),
        icon: <LifeBuoy className="text-indigo-500" />
    }
];

const FAQPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [openId, setOpenId] = useState<number | null>(null);

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-300 mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mx-auto">
                        Get answers to common questions about ObjectVision&apos;s features, capabilities, and policies.
                    </p>
                </motion.div>

                {/* Search bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10 relative"
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 py-6 text-lg focus:ring-2 focus:ring-gray-800 dark:focus:ring-indigo-300 border-gray-700 dark:border-gray-200"
                        />
                    </div>
                </motion.div>

                {/* FAQ accordion */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-4"
                >
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <div className="mr-4 flex-shrink-0">
                                            {faq.icon}
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">{faq.question}</h3>
                                    </div>
                                    {openId === faq.id ?
                                        <ChevronUp className="h-5 w-5 text-indigo-500" /> :
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    }
                                </button>

                                <AnimatePresence>
                                    {openId === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 border-t border-gray-200">
                                                <div className="prose max-w-none text-gray-600 dark:text-gray-400">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white dark:bg-gray-600 p-8 rounded-lg shadow-md text-center"
                        >
                            <p className="text-lg text-gray-700 dark:text-gray-300">No matching questions found. Try a different search term.</p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Contact callout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 text-white p-8 rounded-xl shadow-sm text-center"
                >
                    <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                    <p className="mb-4">
                        Our support team is here to help with any other questions you might have.
                    </p>
                    <Link href="mailto:imtiaj.dev.kol@gmail.com" passHref>
                        <Button size="lg" variant="outline" className="min-w-72 border-white hover:bg-transparent hover:text-white">
                            Contact Us
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQPage;