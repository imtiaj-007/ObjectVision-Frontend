'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Server, ArrowRight, Search, FileText, MessageCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const DocumentationLanding: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Hero Section */}
            <div className="text-center mb-16 py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                >
                    <h1 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                        <Book className="h-10 w-10" />
                        Welcome to Our Documentation
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Explore comprehensive guides, API references, and tutorials for both frontend and backend systems.
                        Whether you&apos;re a beginner or an expert, our documentation has everything you need.
                    </p>
                    <motion.a
                        href="#features"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        Get Started
                        <ChevronRight className="h-5 w-5" />
                    </motion.a>
                </motion.div>
            </div>

            {/* Features Section */}
            <div id="features" className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: <Search className="h-8 w-8" />, title: "Searchable Docs", description: "Quickly find what you need with our powerful search functionality." },
                        { icon: <FileText className="h-8 w-8" />, title: "Detailed Guides", description: "Step-by-step tutorials and examples for every feature." },
                        { icon: <MessageCircle className="h-8 w-8" />, title: "Interactive Examples", description: "Test APIs and components directly in the docs." },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0, delay: index * 0.2 }}
                        >
                            <Card className="h-full hover:shadow-lg transition-all">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        {feature.icon}
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Documentation Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <Card className="h-full hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code className="h-6 w-6" />
                                Frontend Documentation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">
                                Explore our frontend documentation generated with TypeDoc, covering:
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    Component API references
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    Type definitions
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    Usage examples
                                </li>
                            </ul>
                            <motion.a
                                href="/frontend-docs"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-4"
                                whileHover={{ x: 5 }}
                            >
                                View Frontend Docs
                                <ArrowRight className="h-4 w-4" />
                            </motion.a>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <Card className="h-full hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Server className="h-6 w-6" />
                                Backend Documentation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600">
                                Access our FastAPI backend documentation generated with swagger UI, featuring:
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    API endpoints
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    Request/Response schemas
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    Interactive API testing
                                </li>
                            </ul>
                            <motion.a
                                href="/api/docs"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-4"
                                whileHover={{ x: 5 }}
                            >
                                View Backend Docs
                                <ArrowRight className="h-4 w-4" />
                            </motion.a>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        { question: "How do I get started?", answer: "Check out our getting started guide in the frontend documentation." },
                        { question: "Can I test APIs directly?", answer: "Yes, our backend docs include interactive API testing." },
                        { question: "Is there a search feature?", answer: "Absolutely! Use the search bar to find what you need quickly." },
                    ].map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card className="hover:shadow-lg transition-all">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentationLanding;