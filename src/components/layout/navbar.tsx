'use client'
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';


const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Documentation', href: '/documentation' },
    ];

    const isActiveLink = (path: string) => pathname === path;

    return (
        <nav className="fixed w-full bg-slate-900 text-white backdrop-blur-md border-b border-slate-700 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-1">
                        <Link href={'/'}>
                            <Image
                                src={'/object-vision-logo.png'}
                                alt="Object Vision Logo"
                                width={150}
                                height={0}
                                className="h-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`font-medium transition-colors hover:text-gray-50 ${isActiveLink(item.href)
                                    ? 'text-green-500 text-base'
                                    : 'text-gray-400 text-sm'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {isAuthenticated
                            ? (
                                <Link href="/user/dashboard">
                                    <Button variant='success'>Go to Dashboard</Button>
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link href="/auth/login">
                                        <Button variant='outline'>Login</Button>
                                    </Link>
                                    <Link href="/auth/signup">
                                        <Button variant='success'>Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="h-10 w-10"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-background border-t border-border">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink(item.href)
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-accent'
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-2 pt-2 pb-3">
                            {isAuthenticated
                                ? (
                                    <Link href="/user/dashboard">
                                        <Button variant='success'>Go to Dashboard</Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="outline" className="w-full justify-center">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/signup">
                                            <Button className="w-full justify-center">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;