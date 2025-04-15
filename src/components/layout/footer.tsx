import React from 'react'
import Image from 'next/image'
import { FaLinkedin, FaSquareXTwitter, FaInstagram, FaGithub } from "react-icons/fa6";
import Link from 'next/link'


const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-5 gap-8">
                    <div className="col-span-2">
                        <Image
                            src={'/object-vision-logo.png'}
                            alt="Object Vision Logo"
                            width={150}
                            height={150}
                            className="h-auto object-contain -ml-4"
                        />
                        <p className="mb-4">
                            Advanced powerful object detection system with comprehensive, developer-friendly, and well-structured technical documentation.
                        </p>
                        <div className="flex md:w-full mx-auto space-x-6">
                            <Link target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sk-imtiaj-uddin-b26432254/" className="text-gray-400 hover:text-white">
                                <FaLinkedin size={28} />
                            </Link>
                            <Link target="_blank" rel="noopener noreferrer" href="https://x.com/imtiaj_007" className="text-gray-400 hover:text-white">
                                <FaSquareXTwitter size={28} />
                            </Link>
                            <Link target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/soul.survivor_27/" className="text-gray-400 hover:text-white">
                                <FaInstagram size={28} />
                            </Link>
                            <Link target="_blank" rel="noopener noreferrer" href="https://github.com/imtiaj-007" className="text-gray-400 hover:text-white">
                                <FaGithub size={28} />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">Documentation</h3>
                        <ul className="space-y-2">
                            <li><a href="/auth/login" className="hover:text-white">Getting Started</a></li>
                            <li><a href="/documentation" className="hover:text-white">API Reference</a></li>
                            <li><a href="/documentation" className="hover:text-white">Tutorials</a></li>
                            <li><a href="/documentation" className="hover:text-white">Examples</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="https://github.com/imtiaj-007" className="hover:text-white">GitHub Repository</a></li>
                            <li><a href="#" className="hover:text-white">Change Log</a></li>
                            <li><a href="#" className="hover:text-white">FAQ</a></li>
                            <li><a href="#" className="hover:text-white">Community</a></li>
                        </ul>
                    </div>
                    <div className="hidden lg:block">
                        <h3 className="font-semibold text-white mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li><a href="https://www.linkedin.com/in/sk-imtiaj-uddin-b26432254/" className="hover:text-white">LinkedIn</a></li>
                            <li><a href="https://sk-imtiaj-uddin-portfolio.netlify.app/" className="hover:text-white">Portfolio</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p>© {new Date().getFullYear()} ObjectVision. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer