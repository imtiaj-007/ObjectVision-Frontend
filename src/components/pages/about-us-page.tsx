"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Code, Eye, Cpu, Server } from "lucide-react";
import { FaAddressCard, FaGithub, FaInstagram, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const AboutUsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* About the Founder */}
            <section className="py-8 lg:py-16 bg-slate-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            <div className="lg:col-span-1 my-auto p-6 lg:p-0">
                                <div className="relative aspect-square mx-auto lg:mx-0">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-6"></div>
                                    <div className="absolute inset-0 bg-gray-700 rounded-2xl overflow-hidden">
                                        <Image
                                            src='/founder.jpg'
                                            alt="SK Imtiaj Uddin"
                                            width={200}
                                            height={200}
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl text-gray-200 font-bold mb-6">Meet the Founder</h2>
                                <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                                    SK Imtiaj Uddin
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    I&apos;m a final-year B.Tech student specializing in Information Technology at Budge Budge Institute of Technology, graduating in 2025. I&apos;m passionate about building solutions that bridge technology and real-world problems, with expertise in full-stack development.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 bg-blue-900/30 p-1.5 rounded-full">
                                            <Code className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-300 my-1">Technical Expertise</h4>
                                            <p className="text-gray-400 text-sm">
                                                Full-stack developer specializing in the <strong>MERN stack (MongoDB, Express.js, React.js, Node.js)</strong> along with <strong>Next.js & TypeScript</strong>.
                                                Proficient in <strong>C++, Python, Java, and JavaScript</strong> with experience in both <strong>SQL (MySQL, PostgreSQL)
                                                and NoSQL (MongoDB)</strong> databases. Additional skills in <strong>FastAPI, AWS, Docker, Redis and Git</strong> for building scalable,
                                                production-ready applications.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 bg-blue-900/30 p-1.5 rounded-full">
                                            <Server className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-300 my-1">Professional Experience</h4>
                                            <div className="text-gray-400 text-sm space-y-1">
                                                <p><strong>Project Developer Intern (NIT Durgapur):</strong> Developed a comprehensive telemedicine platform using MERN stack featuring video consultations, IoT medical device integration, medicine inventory management, and automated prescription generation.</p>
                                                <p><strong>Software Developer Intern (WorkWise):</strong> Fullstack Developer intern worked with Next.js and PostgreSQL to build robust applications, collaborating with cross-functional teams to deliver seamless user experiences.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-around lg:justify-normal max-w-80 lg:max-w-full items-center lg:space-x-8 mt-8 mx-auto text-gray-500">
                                    <Link target="_blank" href="https://github.com/imtiaj-007" className="text-gray-400 hover:text-gray-600" rel="noopener noreferrer">
                                        <FaGithub size={28} />
                                    </Link>
                                    <Link target="_blank" href="https://www.linkedin.com/in/sk-imtiaj-uddin-b26432254/" className="text-gray-400 hover:text-gray-600" rel="noopener noreferrer">
                                        <FaLinkedin size={28} />
                                    </Link>
                                    <Link target="_blank" href="https://x.com/imtiaj_007" className="text-gray-400 hover:text-gray-600" rel="noopener noreferrer">
                                        <FaSquareXTwitter size={28} />
                                    </Link>
                                    <Link target="_blank" href="https://www.instagram.com/soul.survivor_27/" className="text-gray-400 hover:text-gray-600" rel="noopener noreferrer">
                                        <FaInstagram size={28} />
                                    </Link>
                                    <Link target="_blank" href="https://sk-imtiaj-uddin-portfolio.netlify.app/" className="text-gray-400 hover:text-gray-600" rel="noopener noreferrer">
                                        <FaAddressCard size={28} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Features */}
            <section className="py-20 bg-slate-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl text-gray-300 font-bold mb-4">What Makes ObjectVision Special</h2>
                        <p className="text-lg text-gray-400">
                            Our ML-powered object detection system combines cutting-edge technology with intuitive design
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Advanced ML Detection",
                                description: "Utilizing state-of-the-art machine learning models to deliver precise object detection with minimal latency.",
                                icon: <Cpu className="h-10 w-10 text-blue-600" />,
                            },
                            {
                                title: "Real-time Processing",
                                description: "Process video streams and image data in real-time with optimized algorithms for edge devices and cloud platforms.",
                                icon: <Eye className="h-10 w-10 text-indigo-600" />,
                            },
                            {
                                title: "Developer-Friendly API",
                                description: "Seamlessly integrate ObjectVision into your applications with our comprehensive and well-documented API.",
                                icon: <Code className="h-10 w-10 text-purple-600" />,
                            },
                            {
                                title: "Custom Training",
                                description: "Train the system on your specific object categories with our intuitive training interface.",
                                icon: <Server className="h-10 w-10 text-blue-600" />,
                            },
                            {
                                title: "Multi-platform Support",
                                description: "Deploy ObjectVision on various platforms including web, mobile, and embedded systems.",
                                icon: <Cpu className="h-10 w-10 text-indigo-600" />,
                            },
                            {
                                title: "Privacy-Focused",
                                description: "Process data locally when possible and implement strong privacy measures for sensitive applications.",
                                icon: <Eye className="h-10 w-10 text-purple-600" />,
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-0 shadow-lg h-full bg-gray-800 overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <div className="mb-4">{feature.icon}</div>
                                        <CardTitle className="text-gray-300">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-800 text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Computer Vision Projects?</h2>
                        <p className="text-xl mb-8 text-blue-100">
                            Join us in pushing the boundaries of what&apos;s possible with object detection technology.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <Link href={'/auth/login'} passHref >
                                <Button size="lg" className="min-w-72 bg-white text-blue-600 hover:bg-slate-100">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href={'/documentation'} passHref>
                                <Button size="lg" variant="outline" className="min-w-72 border-white hover:bg-transparent hover:text-white">
                                    View Documentation
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;