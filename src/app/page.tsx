'use client'
import React from 'react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Camera, Search, Zap, ArrowRight,
    ChevronRight, Image, BadgeCheck, CloudLightning,
    FileImage, Film, File, FileVideo, ImagePlay
} from 'lucide-react';
import Link from 'next/link';

const HomePage: React.FC = () => {

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-1 bg-blue-600/20 rounded-full text-blue-400 text-sm">
                        Introducing ObjectVision AI
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent pb-4">
                        Transform Your Images with AI-Powered Object Detection
                    </h1>
                    <p className="text-xl text-slate-300 mt-6 mb-8 max-w-3xl mx-auto">
                        Instantly detect, classify, and analyze objects in your images with enterprise-grade accuracy.
                        Built for developers, designed for everyone.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link href='/auth/login'>
                            <Button size="lg" className='min-w-72'>
                                Start Free Trial
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href='/documentation'>
                            <Button size="lg" className='min-w-72 bg-neutral-200 text-gray-900/90 hover:bg-neutral-100 hover:text-gray-900'>
                                Live Demo
                                <ChevronRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                            <div className="text-slate-400">Accuracy Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">50ms</div>
                            <div className="text-slate-400">Processing Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">5M+</div>
                            <div className="text-slate-400">Images Processed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">1000+</div>
                            <div className="text-slate-400">Happy Users</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Card Section */}
            <section className="py-12 md:py-20 px-4" id="features">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
                        <p className="text-slate-400 text-xl">
                            Powerful features to supercharge your object detection workflow
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Camera,
                                title: 'Real-time Detection',
                                description: 'Process images in real-time with AI models',
                            },
                            {
                                icon: CloudLightning,
                                title: 'Fast Processing',
                                description: 'Lightning-fast detection speed of ~50ms',
                            },
                            {
                                icon: BadgeCheck,
                                title: 'High Accuracy',
                                description: 'Industry-leading 99.9% accuracy rate',
                            },
                            {
                                icon: Image,
                                title: 'Batch Processing',
                                description: 'Process thousands of images simultaneously',
                            },
                            {
                                icon: Search,
                                title: 'Advanced Analytics',
                                description: 'Get detailed insights for each detected object',
                            },
                            {
                                icon: Zap,
                                title: 'API Integration',
                                description: 'Simple REST API for seamless integration',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Card className="p-6 bg-slate-800/50 hover:bg-slate-800 transition-colors border-slate-700">
                                    {/* Icon */}
                                    <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-blue-400" />
                                    </div>

                                    {/* Title and Description */}
                                    <h3 className="text-xl text-white font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-slate-400">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supported Formats Section */}
            <section className="py-20 px-4 bg-slate-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-bold mb-4"
                        >
                            Supported Formats
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-400 text-xl"
                        >
                            Process any type of image or video format with ease
                        </motion.p>
                    </div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                    >
                        {[
                            { icon: FileImage, title: "JPEG/JPG", description: "High-quality compressed images" },
                            { icon: File, title: "PNG", description: "Lossless compression with transparency" },
                            { icon: FileVideo, title: "MP4", description: "Industry standard video format" },
                            { icon: Film, title: "RAW", description: "Uncompressed image data" },
                            { icon: ImagePlay, title: "ImagePlay", description: "Animated image sequences" },
                            { icon: Film, title: "MOV", description: "High-quality video format" },
                            { icon: FileImage, title: "WEBP", description: "Modern web-optimized format" },
                            { icon: FileVideo, title: "AVI", description: "Windows video format" },
                            { icon: File, title: "TIFF", description: "Professional image format" },
                            { icon: FileVideo, title: "MKV", description: "Versatile video container" },
                            { icon: FileImage, title: "BMP", description: "Uncompressed bitmap format" },
                            { icon: FileVideo, title: "WMV", description: "Windows media format" }
                        ].map((format, index) => (
                            <motion.div
                                key={index}
                                className="bg-slate-800/30 rounded-lg p-6 hover:bg-slate-700/50 transition-colors text-center"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="h-12 w-12 mx-auto rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                                    <format.icon className="h-6 w-6 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{format.title}</h3>
                                <p className="text-sm text-slate-400">{format.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl text-slate-400 mb-8">
                        Start your free trial today. No credit card required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href='/auth/login'>
                            <Button size="lg" className="min-w-72 bg-blue-600 hover:bg-blue-700 text-lg text-white px-8 py-6">
                                Start Free Trial
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="mailto:imtiaj.dev.kol@gmail.com">
                            <Button size="lg" className='min-w-72 bg-neutral-200 text-gray-900/90 hover:bg-neutral-100 hover:text-gray-900'>
                                Contact Sales
                                <ChevronRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;