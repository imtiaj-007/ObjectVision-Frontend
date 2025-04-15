import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Book, Code, Zap, Accessibility, Server, Database, Shield, Gauge } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/configuration/config";


const DocumentationTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("frontend");
    const [direction, setDirection] = useState<number>(0);

    const handleTabChange = (value: string) => {
        const tabOrder = ["frontend", "backend"];
        const currentIndex = tabOrder.indexOf(activeTab);
        const newIndex = tabOrder.indexOf(value);
        setDirection(newIndex > currentIndex ? 1 : -1);
        setActiveTab(value);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            },
        }),
    };

    return (
        <div className="w-full">
            <Tabs
                defaultValue="frontend"
                className="w-full"
                onValueChange={handleTabChange}
                value={activeTab}
            >
                <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2 dark:bg-gray-900">
                    <TabsTrigger value="frontend">Frontend Architecture</TabsTrigger>
                    <TabsTrigger value="backend">Backend Architecture</TabsTrigger>
                </TabsList>

                <div className="relative overflow-hidden">
                    <div className="invisible" aria-hidden="true">
                        {activeTab === "frontend" ? (
                            <FrontendContent />
                        ) : (
                            <BackendContent />
                        )}
                    </div>
                    
                    {/* Animated content with absolute positioning */}
                    <div className="absolute top-0 left-0 w-full">
                        <AnimatePresence mode="sync" custom={direction}>
                            <motion.div
                                key={activeTab}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full"
                            >
                                {activeTab === "frontend" ? (
                                    <FrontendContent />
                                ) : (
                                    <BackendContent />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Tabs>
        </div>
    );
};

// Separated content components for reusability
const FrontendContent = () => (
    <div className="grid md:grid-cols-2 gap-8">
        <div>
            <Card className="shadow-md border-none h-full dark:bg-gray-900">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Code className="h-6 w-6 text-blue-600" />
                        Frontend Documentation
                    </CardTitle>
                    <CardDescription>
                        Built with Next.js, TypeScript and Tailwind CSS
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        Our frontend documentation covers all aspects of the ObjectVision UI, including:
                    </p>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400 pb-4">
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Component API</strong>: Detailed props, methods, and event documentation for all reusable components</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span><strong>State Management</strong>: Implementation details for global and local state using React Context and hooks</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span><strong>TypeScript Interfaces</strong>: Complete type definitions for all data structures and API responses</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Interactive Examples</strong>: Live code sandboxes for testing component behavior</span>
                        </li>
                    </ul>
                    <Link href="/docs/index.html" target="_blank" passHref>
                        <Button>
                            View Frontend Docs
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>

        <div className="flex flex-col gap-6">
            <Card className="shadow-md border-none dark:bg-gray-900">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Book className="h-5 w-5 text-blue-600" />
                        TypeDoc Generated App References
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Automatically generated interface documentation using TypeDoc, ensuring always up-to-date App references.
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-md border-none dark:bg-gray-900">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        Performance Optimization Guide
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Detailed documentation on component memoization, code splitting, and lazy loading strategies implemented in the app.
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-md border-none dark:bg-gray-900">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Accessibility className="h-5 w-5 text-blue-600" />
                        Accessibility Compliance
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Comprehensive guidelines for ARIA attributes, keyboard navigation, and screen reader testing results for all components.
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
);

const BackendContent = () => (
    <div className="grid md:grid-cols-2 gap-8">
        <div>
            <Card className="shadow-md border-none h-full dark:bg-gray-900">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Server className="h-6 w-6 text-green-600" />
                        Backend Documentation
                    </CardTitle>
                    <CardDescription>
                        Built with FastAPI and Python
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        Our FastAPI backend documentation includes comprehensive API references:
                    </p>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400 pb-4">
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>OpenAPI Specification</strong>: Complete API schema documentation with Swagger UI integration</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Request/Response Models</strong>: Detailed Pydantic models with example responses</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Authentication</strong>: OAuth2 implementation details with JWT token management</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Interactive Testing</strong>: Try out API endpoints directly in the documentation</span>
                        </li>
                    </ul>
                    <Link href={`${settings.BACKEND_URL}/redoc`} target="_blank" passHref>
                        <Button variant="success" className="bg-green-600 text-white hover:bg-green-700">
                            View Backend Docs
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>

        <div className="flex flex-col gap-6">
            <Card className="shadow-md border-none dark:bg-gray-900">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Database className="h-5 w-5 text-green-600" />
                        Database Schema Documentation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Complete documentation of database models, relationships, and migration strategies with ERD diagrams.
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-md border-none dark:bg-gray-900">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        API Security Documentation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Detailed security implementation guides including rate limiting, input validation, and CORS configuration.
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-md border-none dark:bg-gray-900">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Gauge className="h-5 w-5 text-green-600" />
                        Performance Optimization
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Guides for query optimization, caching strategies, and async task management using Celery and Redis.
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
);

export default DocumentationTabs;