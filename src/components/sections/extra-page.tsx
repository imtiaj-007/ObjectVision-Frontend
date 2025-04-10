'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Book, Code, Server, ArrowRight, Search, FileText, MessageCircle,
    ChevronRight, Star, Clock, Users, BookOpen, Zap, Shield,
    Coffee, PenTool, Layers, Terminal, GitBranch, Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const DocumentationLanding: React.FC = () => {
    const [activeTab, setActiveTab] = useState('getting-started');

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            {/* Hero Section with Background Image */}
            <section className="text-center mb-16 py-16 bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 rounded-xl shadow-sm relative overflow-hidden" >
                <div className="max-w-6xl mx-auto p-6">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        className="relative z-10"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.2
                                }}
                                className="bg-blue-600 p-4 rounded-full"
                            >
                                <Book className="h-10 w-10 text-white" />
                            </motion.div>
                        </div>

                        <h1 className="text-5xl font-bold mb-6">
                            Welcome to Our <span className="text-blue-600">Documentation</span>
                        </h1>

                        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                            Explore comprehensive guides, API references, and tutorials for both frontend and backend systems.
                            Whether you&apos;re a beginner or an expert, our documentation has everything you need.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a
                                href="#features"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                Get Started
                                <ChevronRight className="h-5 w-5" />
                            </motion.a>

                            <motion.a
                                href="#quick-links"
                                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                View Documentation
                                <ArrowRight className="h-5 w-5" />
                            </motion.a>
                        </div>

                        {/* Stats Section */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12 max-w-4xl mx-auto">
                            {[
                                { icon: <FileText className="h-6 w-6 text-blue-600" />, value: "200+", label: "Pages of Documentation" },
                                { icon: <Code className="h-6 w-6 text-purple-600" />, value: "150+", label: "Code Examples" },
                                { icon: <Users className="h-6 w-6 text-green-600" />, value: "5,000+", label: "Active Developers" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                                    className="flex flex-col items-center p-4"
                                >
                                    {stat.icon}
                                    <div className="text-3xl font-bold mt-2">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            <div className="max-w-6xl mx-auto p-6">
                {/* Quick Links Navigation */}
                <div id="quick-links" className="mb-16 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Zap className="h-6 w-6 text-yellow-500" />
                        Quick Access
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <BookOpen className="h-6 w-6" />, title: "Getting Started", href: "#getting-started" },
                            { icon: <PenTool className="h-6 w-6" />, title: "Tutorials", href: "#tutorials" },
                            { icon: <Terminal className="h-6 w-6" />, title: "API Reference", href: "/api/docs" },
                            { icon: <Layers className="h-6 w-6" />, title: "Component Library", href: "/components" },
                            { icon: <GitBranch className="h-6 w-6" />, title: "Version Control", href: "/versions" },
                            { icon: <Database className="h-6 w-6" />, title: "Database Schema", href: "/schema" },
                            { icon: <Shield className="h-6 w-6" />, title: "Security Guidelines", href: "/security" },
                            { icon: <Clock className="h-6 w-6" />, title: "Change Logs", href: "/changelogs" },
                        ].map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-all"
                                whileHover={{ x: 5 }}
                            >
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    {link.icon}
                                </div>
                                <span className="font-medium">{link.title}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="mb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                            <span className="text-blue-600 font-medium">POWERFUL FEATURES</span>
                            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                        </div>
                        <h2 className="text-3xl font-bold text-center mb-10">Why Our Documentation Stands Out</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Search className="h-8 w-8 text-blue-600" />,
                                    title: "Intelligent Search",
                                    description: "Find exactly what you need with our AI-powered search engine that understands natural language queries and technical jargon."
                                },
                                {
                                    icon: <FileText className="h-8 w-8 text-purple-600" />,
                                    title: "Comprehensive Guides",
                                    description: "Follow detailed, step-by-step tutorials complete with code snippets, diagrams, and practical examples for beginners and experts."
                                },
                                {
                                    icon: <MessageCircle className="h-8 w-8 text-green-600" />,
                                    title: "Interactive Examples",
                                    description: "Test APIs and components directly in the documentation with live code editors and real-time results to speed up your learning."
                                },
                                {
                                    icon: <Coffee className="h-8 w-8 text-yellow-600" />,
                                    title: "Developer Resources",
                                    description: "Access downloadable code samples, starter templates, and configuration files that will save you hours of development time."
                                },
                                {
                                    icon: <Clock className="h-8 w-8 text-red-600" />,
                                    title: "Version History",
                                    description: "Browse documentation for any version of our software with our comprehensive version selector and change tracking system."
                                },
                                {
                                    icon: <Users className="h-8 w-8 text-indigo-600" />,
                                    title: "Community Contributions",
                                    description: "Benefit from real-world insights with community notes, tips, and solutions to common problems encountered in the field."
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    transition={{ duration: 0.5 }}
                                    className="relative"
                                >
                                    <Card className="h-full hover:shadow-lg transition-all border-t-4" style={{ borderTopColor: getColor(index) }}>
                                        <CardHeader>
                                            <div className="absolute top-4 right-4 opacity-10">
                                                {feature.icon}
                                            </div>
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
                    </motion.div>
                </div>

                {/* Documentation Tabs */}
                <div className="mb-16 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex overflow-x-auto border-b">
                        {[
                            { id: 'getting-started', label: 'Getting Started', icon: <BookOpen className="h-5 w-5" /> },
                            { id: 'frontend', label: 'Frontend', icon: <Code className="h-5 w-5" /> },
                            { id: 'backend', label: 'Backend', icon: <Server className="h-5 w-5" /> },
                            { id: 'advanced', label: 'Advanced Topics', icon: <Layers className="h-5 w-5" /> },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === tab.id
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                    }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {activeTab === 'getting-started' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <h3 className="text-xl font-bold mb-4">Getting Started with Our Platform</h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <CardTitle>Installation Guide</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <div className="mt-1 min-w-[24px]">
                                                        <div className="bg-blue-100 text-blue-600 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                                                    </div>
                                                    <p>Set up your environment with our CLI tool</p>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="mt-1 min-w-[24px]">
                                                        <div className="bg-blue-100 text-blue-600 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                                                    </div>
                                                    <p>Configure your project settings and dependencies</p>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="mt-1 min-w-[24px]">
                                                        <div className="bg-blue-100 text-blue-600 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                                                    </div>
                                                    <p>Run initialization scripts to scaffold your application</p>
                                                </li>
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <a href="/installation" className="text-blue-600 hover:underline flex items-center gap-1">
                                                View Full Guide <ArrowRight className="h-4 w-4" />
                                            </a>
                                        </CardFooter>
                                    </Card>

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <CardTitle>First Steps Tutorial</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <div className="mt-1 min-w-[24px]">
                                                        <div className="bg-green-100 text-green-600 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                                                    </div>
                                                    <p>Create your first component with our starter templates</p>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="mt-1 min-w-[24px]">
                                                        <div className="bg-green-100 text-green-600 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                                                    </div>
                                                    <p>Connect to API endpoints and manage authentication</p>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="mt-1 min-w-[24px]">
                                                        <div className="bg-green-100 text-green-600 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                                                    </div>
                                                    <p>Deploy your application to staging environment</p>
                                                </li>
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <a href="/tutorial" className="text-green-600 hover:underline flex items-center gap-1">
                                                Start Tutorial <ArrowRight className="h-4 w-4" />
                                            </a>
                                        </CardFooter>
                                    </Card>
                                </div>

                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-3">
                                    <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-blue-800">Pro Tip</h4>
                                        <p className="text-blue-600">Check out our video tutorials for a visual walkthrough of the platform setup process.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'frontend' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">Frontend Documentation</h3>
                                        <p className="text-gray-600 mb-4">
                                            Our frontend documentation covers everything from basic components to advanced state management and optimization techniques.
                                        </p>

                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-blue-600" />
                                                <span>Component API references with TypeScript definitions</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-blue-600" />
                                                <span>Theming and customization guidelines</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-blue-600" />
                                                <span>Form handling and validation techniques</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-blue-600" />
                                                <span>State management approaches and patterns</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-blue-600" />
                                                <span>Performance optimization strategies</span>
                                            </li>
                                        </ul>

                                        <a href="/frontend-docs" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                                            Explore Frontend Docs
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                        <h4 className="font-bold">Popular Frontend Topics</h4>

                                        {[
                                            { title: "Component Library Overview", views: "2.5k", href: "/frontend/components" },
                                            { title: "State Management with Context", views: "1.8k", href: "/frontend/state" },
                                            { title: "Form Validation Patterns", views: "1.7k", href: "/frontend/forms" },
                                            { title: "Animation and Transitions", views: "1.5k", href: "/frontend/animations" },
                                            { title: "Optimizing for Production", views: "1.3k", href: "/frontend/optimization" },
                                        ].map((topic, i) => (
                                            <a
                                                key={i}
                                                href={topic.href}
                                                className="flex items-center justify-between p-3 bg-white rounded border hover:shadow-md transition-all"
                                            >
                                                <span className="font-medium">{topic.title}</span>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Star className="h-3 w-3" />
                                                    <span>{topic.views} views</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'backend' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">Backend Documentation</h3>
                                        <p className="text-gray-600 mb-4">
                                            Our FastAPI backend documentation provides comprehensive information on endpoints, data models, authentication, and deployment.
                                        </p>

                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-green-600" />
                                                <span>Interactive API testing with Swagger UI</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-green-600" />
                                                <span>Authentication and authorization flows</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-green-600" />
                                                <span>Database schema and migrations</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-green-600" />
                                                <span>WebSocket integration for real-time features</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <ArrowRight className="h-4 w-4 text-green-600" />
                                                <span>Deployment configurations for various environments</span>
                                            </li>
                                        </ul>

                                        <a href="/api/docs" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                                            Explore Backend Docs
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>

                                    <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm overflow-hidden">
                                        <div className="flex items-center gap-2 mb-3 text-gray-400 border-b border-gray-700 pb-2">
                                            <Terminal className="h-4 w-4" />
                                            <span>Example API Request</span>
                                        </div>
                                        <pre className="text-green-400">
                                            # Get user profile with authentication<br />
                                            curl -X GET &quot;https://api.example.com/users/me&quot; \<br />
                                            {'  '}-H &quot;Authorization: Bearer $TOKEN&quot; \<br />
                                            {'  '}-H &quot;Content-Type: application/json&quot;
                                        </pre>
                                        <div className="mt-4 bg-gray-700 p-3 rounded">
                                            <div className="text-gray-300 mb-2">Response:</div>
                                            <div className="text-blue-300">{'{'}</div>
                                            <div className="text-blue-300 ml-4">&quot;id&quot;: &quot;user_12345&quot;,</div>
                                            <div className="text-blue-300 ml-4">&quot;name&quot;: &quot;John Doe&quot;,</div>
                                            <div className="text-blue-300 ml-4">&quot;email&quot;: &quot;john@example.com&quot;,</div>
                                            <div className="text-blue-300 ml-4">&quot;role&quot;: &quot;admin&quot;,</div>
                                            <div className="text-blue-300 ml-4">&quot;created_at&quot;: &quot;2023-04-01T12:00:00Z&quot;</div>
                                            <div className="text-blue-300">{'}'}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'advanced' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-xl font-bold mb-4">Advanced Topics</h3>
                                <p className="text-gray-600 mb-6">
                                    Dive deep into advanced features and integration patterns for expert developers.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        {
                                            title: "Custom Authentication Flows",
                                            description: "Implement complex auth patterns including SSO, MFA, and role-based permissions.",
                                            href: "/advanced/auth"
                                        },
                                        {
                                            title: "Microservices Architecture",
                                            description: "Best practices for building and connecting microservices in our ecosystem.",
                                            href: "/advanced/microservices"
                                        },
                                        {
                                            title: "Real-time Data Processing",
                                            description: "Implement WebSockets and event-driven architectures for real-time features.",
                                            href: "/advanced/realtime"
                                        },
                                        {
                                            title: "Data Warehousing & Analytics",
                                            description: "Configure data pipelines and analytics integrations for business intelligence.",
                                            href: "/advanced/analytics"
                                        },
                                        {
                                            title: "Performance Optimization",
                                            description: "Techniques for optimizing API response times and frontend rendering.",
                                            href: "/advanced/performance"
                                        },
                                        {
                                            title: "CI/CD Integration",
                                            description: "Setup automated testing, deployment, and monitoring pipelines.",
                                            href: "/advanced/cicd"
                                        }
                                    ].map((topic, i) => (
                                        <Card key={i} className="hover:shadow-lg transition-all">
                                            <CardContent className="pt-6">
                                                <h4 className="font-bold mb-2">{topic.title}</h4>
                                                <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                                                <a
                                                    href={topic.href}
                                                    className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1"
                                                >
                                                    Learn more <ArrowRight className="h-3 w-3" />
                                                </a>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mb-16">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="h-1 w-12 bg-purple-600 rounded-full"></div>
                        <span className="text-purple-600 font-medium">TESTIMONIALS</span>
                        <div className="h-1 w-12 bg-purple-600 rounded-full"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-center mb-10">What Developers Are Saying</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                quote: "This documentation saved me hours of trial and error. Everything is clear, well-organized, and the interactive examples are amazing.",
                                author: "Sarah Chen",
                                role: "Senior Frontend Developer"
                            },
                            {
                                quote: "The backend API documentation is the best I've ever used. The ability to test endpoints directly in the browser makes integration a breeze.",
                                author: "Michael Rodriguez",
                                role: "Backend Engineer"
                            },
                            {
                                quote: "As someone new to the platform, the getting started guides walked me through everything step by step. I was up and running in no time.",
                                author: "Alex Taylor",
                                role: "Junior Developer"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-all">
                                    <CardContent className="pt-6">
                                        <div className="flex justify-center mb-4">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-5 w-5 text-yellow-400" fill="#FACC15" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                {testimonial.author.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold">{testimonial.author}</div>
                                                <div className="text-sm text-gray-600">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="h-1 w-12 bg-green-600 rounded-full"></div>
                        <span className="text-green-600 font-medium">FREQUENTLY ASKED QUESTIONS</span>
                        <div className="h-1 w-12 bg-green-600 rounded-full"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-center mb-10">Common Questions</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                question: "How do I get started with the platform?",
                                answer: "Begin with our comprehensive Getting Started guide that walks you through installation, configuration, and creating your first project. We also offer video tutorials for visual learners."
                            },
                            {
                                question: "Can I test APIs directly in the documentation?",
                                answer: "Yes! Our backend documentation includes an interactive Swagger UI where you can execute API calls, view responses, and experiment with different parameters in real-time."
                            },
                            {
                                question: "Is the documentation available offline?",
                                answer: "We offer a downloadable PDF version of our documentation for offline access. Additionally, you can use our CLI tool to download and browse documentation locally."
                            },
                            {
                                question: "How do I contribute to the documentation?",
                                answer: "We welcome community contributions! You can submit corrections or improvements through our GitHub repository. Each page has an 'Edit this page' link that takes you directly to the source file."
                            },
                            {
                                question: "Are there code examples for different programming languages?",
                                answer: "Yes, we provide code samples in multiple languages including JavaScript/TypeScript, Python, Java, Go, and Ruby for most API endpoints and integration scenarios."
                            },
                            {
                                question: "How can I stay updated when documentation changes?",
                                answer: "Subscribe to our documentation changelog via RSS or email notifications. Important updates are also announced in our developer newsletter and community forums."
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="hover:shadow-lg transition-all border-l-4 border-l-green-500">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <motion.a
                            href="/faq"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            View All FAQs
                            <ChevronRight className="h-5 w-5" />
                        </motion.a>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
                    >
                        <h2 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Our documentation has everything you need to create powerful, scalable applications.
                            Start building today with our comprehensive guides and resources.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a
                                href="/getting-started"
                                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                Start Building
                            </motion.a>
                            <motion.a
                                href="/community"
                                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                Join Our Community
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Resources Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <BookOpen className="h-6 w-6 text-blue-600" />,
                                title: "Developer Blog",
                                description: "Latest updates, tutorials, and best practices",
                                href: "/blog"
                            },
                            {
                                icon: <Users className="h-6 w-6 text-green-600" />,
                                title: "Community Forums",
                                description: "Connect with other developers and get help",
                                href: "/forums"
                            },
                            {
                                icon: <Code className="h-6 w-6 text-purple-600" />,
                                title: "Code Samples",
                                description: "Ready-to-use examples and snippets",
                                href: "/samples"
                            },
                            {
                                icon: <Coffee className="h-6 w-6 text-yellow-600" />,
                                title: "Support Center",
                                description: "Get help from our technical support team",
                                href: "/support"
                            },
                        ].map((resource, index) => (
                            <motion.a
                                key={index}
                                href={resource.href}
                                className="p-4 bg-white rounded-lg border hover:shadow-md transition-all flex flex-col items-center text-center gap-2"
                                whileHover={{ y: -5 }}
                            >
                                <div className="p-3 bg-gray-100 rounded-full mb-2">
                                    {resource.icon}
                                </div>
                                <h3 className="font-semibold">{resource.title}</h3>
                                <p className="text-sm text-gray-600">{resource.description}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm py-8 border-t">
                    <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
                        <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
                        <a href="/contact" className="hover:text-blue-600">Contact Us</a>
                    </div>
                </div>
            </div>
        </>
    );
};

// Helper function to get colors for cards
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

export default DocumentationLanding;