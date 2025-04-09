'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Server, ArrowRight, Search, FileText, Database, Share2, Shield, 
    BarChart, FileInput, Settings2, FileOutput, Terminal, Info,
} from 'lucide-react';
import { SiNextdotjs, SiFastapi } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DocumentationTabs from '@/components/sections/page-slide-docs';


const ObjectVisionDocs: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const techStack = [
        { name: "Next.js", color: "bg-black text-white" },
        { name: "TypeScript", color: "bg-blue-600 text-white" },
        { name: "Tailwind CSS", color: "bg-sky-500 text-white" },
        { name: "Shadcn/UI", color: "bg-gray-900 text-white" },
        { name: "FastAPI", color: "bg-green-600 text-white" },
        { name: "Python", color: "bg-yellow-600 text-white" },
    ];

    const getColor = (index: number) => {
        const colors = [
            '#3B82F6', // blue-600
            '#8B5CF6', // purple-600
            '#10B981', // green-600
            '#F59E0B', // amber-600
            '#EF4444', // red-600
            '#6366F1'  // indigo-600
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            {/* Hero Section */}
            <motion.div
                className="py-20 bg-gray-50 dark:bg-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Badge className="mb-4 px-3 py-1 bg-blue-100 dark:bg-blue-200 text-blue-800 hover:bg-blue-100">v1.0.0 Release</Badge>
                        <motion.h1
                            className="text-5xl md:text-6xl font-extrabold mb-6 py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 dark:bg-gradient-to-r dark:from-blue-500 dark:to-indigo-500"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            ObjectVision Documentation
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Comprehensive documentation platform for an advanced object detection and analysis system.
                            Built with modern technologies and best practices for software documentation.
                        </motion.p>
                        <motion.div
                            className="flex flex-wrap justify-center gap-3 mb-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            {techStack.map((tech, index) => (
                                <Badge key={index} className={`${tech.color} px-3 py-1 text-sm font-medium`}>
                                    {tech.name}
                                </Badge>
                            ))}
                        </motion.div>
                        <motion.div
                            className="flex flex-wrap justify-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex gap-4 border-2 border-gray-800 dark:border-gray-400 p-6 rounded-lg">
                                    <SiNextdotjs size={48} />
                                    <div className="text-left flex-1">
                                        <h3 className='text-xl font-medium'>Next Js</h3>
                                        <p className='text-sm'>The React Framework for the Web</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 border-2 border-gray-800 dark:border-gray-400 p-6 rounded-lg">
                                    <SiFastapi size={48} className='text-green-600' />
                                    <div className="text-left flex-1">
                                        <h3 className='text-xl font-medium'>Fast API</h3>
                                        <p className='text-sm'>Python framework for building APIs</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Documentation Overview Section */}
            <section className="py-16 bg-white dark:bg-gray-900" id="features">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-4">Documentation Framework</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            ObjectVision features comprehensive documentation across both frontend and backend systems,
                            with interactive examples and thorough API references.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                icon: <Search className="h-8 w-8 text-blue-600" />,
                                title: "Full-Text Search",
                                description: "Advanced search capabilities across all documentation with real-time results and syntax highlighting."
                            },
                            {
                                icon: <FileText className="h-8 w-8 text-blue-600" />,
                                title: "Interactive Guides",
                                description: "Step-by-step tutorials with interactive code examples that can be run directly in the browser."
                            },
                            {
                                icon: <Database className="h-8 w-8 text-blue-600" />,
                                title: "API References",
                                description: "Comprehensive API documentation with request/response examples and schema validation."
                            },
                            {
                                icon: <Share2 className="h-8 w-8 text-blue-600" />,
                                title: "Version Control",
                                description: "Documentation versioned in sync with software releases to ensure historical accuracy."
                            },
                            {
                                icon: <Shield className="h-8 w-8 text-blue-600" />,
                                title: "Authentication Docs",
                                description: "Secure authentication flows documented with security best practices and implementation guides."
                            },
                            {
                                icon: <BarChart className="h-8 w-8 text-blue-600" />,
                                title: "Performance Metrics",
                                description: "Detailed performance documentation with benchmarks and optimization recommendations."
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <Card className="h-full dark:bg-gray-800 hover:shadow-lg transition-all border-t-4" style={{ borderTopColor: getColor(index) }}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            {feature.icon}
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Architecture Documentation Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800" id="architecture">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-4">System Architecture</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Explore the comprehensive architecture documentation for ObjectVision&apos;s frontend and backend systems.
                        </p>
                    </motion.div>

                    <DocumentationTabs />
                </div>
            </section>

            {/* API Documentation Section */}
            <section className="py-16 bg-white dark:bg-gray-900" id="api-docs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-4">Object Vision API Reference</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Interactive documentation for our computer vision endpoints with real-time testing capabilities.
                        </p>
                    </motion.div>

                    {/* Object Detection API */}
                    <motion.div
                        className="rounded-xl shadow-2xl border border-gray-200 dark:border-0 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-gray-900 dark:bg-black text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <div className="flex items-center gap-2">
                                <Server className="h-5 w-5 text-green-400" />
                                <span className="font-mono text-sm">POST /api/v1/vision/detect</span>
                            </div>
                            <Badge className="bg-green-600 hover:bg-green-700">POST</Badge>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6">
                            <div className="grid md:grid-cols-2 gap-8 overflow-x-auto py-6 md:py-0">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <FileInput className="h-5 w-5 text-gray-500" />
                                        Request Body
                                    </h3>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                                        <pre className="text-sm text-gray-800 dark:text-gray-400">{`{
  file: (binary),
  client_id: "your-client-id",
  parameters: {
    "model_size": "OV-model-M",
    "confidence_threshold": 0.25,
    "service_requests": ["detection", "segmentation"]
  },
  metadata: {
    "mime-type": "image/png",
    "size": 1458396,
    "width: 1024,
    "height": 720
  }
}`}</pre>
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="font-medium mb-3 flex items-center gap-2">
                                            <Settings2 className="h-4 w-4 text-gray-500" />
                                            Parameters
                                        </h4>
                                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                            <li className="flex gap-2">
                                                <span className="font-mono font-semibold bg-gray-100 px-2 rounded">model_size</span>
                                                <span>Pre-trained model to use (i.e. OV-model-M, OV-model-L etc)</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="font-mono font-semibold bg-gray-100 px-2 rounded">confidence_threshold</span>
                                                <span>Minimum confidence score (0.0-1.0) for detections</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="font-mono font-semibold bg-gray-100 px-2 rounded">service_requests</span>
                                                <span>List of requested services (i.e. detection, pose etc)</span>
                                            </li>
                                        </ul>

                                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-20">
                                            <Info className="w-4 h-4" />
                                            <p>This is just demo data, for actual requests and responses refer to the documents.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <FileOutput className="h-5 w-5 text-gray-500" />
                                        Response
                                    </h3>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md ">
                                        <pre className="text-sm text-gray-800 dark:text-gray-400">{`{
  file_name: "pexels-jopwell-2422290.webp"
  file_path: "uploads/images/pexels-jopwell-2422290.webp"
  timestamp: "2025-03-15T14:32:18Z",
  detections: [
    {
      "class_id": 0,
      "class_name": "person",
      "confidence": 0.9632,
      "bbox": [0.345, 0.211, 0.512, 0.876],
      "bbox_pixels": [124, 76, 184, 315],
      "attributes": {
        "pose": "standing",
        "facing": "front"
      }
    },
    {
      "class_id": 2,
      "class_name": "car",
      "confidence": 0.8814,
      "bbox": [0.125, 0.723, 0.342, 0.892],
      "bbox_pixels": [45, 260, 123, 321]
    }
  ]
}`}</pre>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-800">
                                                Status: 200 OK
                                            </Badge>
                                            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800">
                                                Latency: 142ms
                                            </Badge>
                                        </div>
                                        <Link href={'/backend/docs'} passHref>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                <Terminal className="h-4 w-4 mr-2" />
                                                Try in API Playground
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Ready to Explore ObjectVision?</h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                            Dive into our comprehensive documentation and discover how ObjectVision
                            can transform your object detection capabilities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={'/auth/login'} passHref >
                                <Button size="lg" className="min-w-72 bg-white text-blue-600 hover:bg-slate-100">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href={'/aboutus'} passHref>
                                <Button size="lg" variant="outline" className="min-w-72 border-white hover:bg-transparent hover:text-white">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ObjectVisionDocs;