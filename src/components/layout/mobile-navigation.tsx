'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Home, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface MobileNavProps {
    navigation: {
        name: string;
        href: string;
        icon: React.ComponentType<{ className?: string }>;
    }[];
    pathname: string;
}

export const MobileNav = ({ navigation, pathname }: MobileNavProps) => {
    const router = useRouter();
    const { logoutUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logoutUser();
        toast({
            variant: "success",
            title: "Successfully logged you out.",
            description: "Thank you for choosing ObjectVision. Have a nice day!"
        });
        router.push('/');
    }

    return (
        <div className="lg:hidden">
            {/* Mobile menu button */}
            <Button
                variant="link"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
                <Menu className="size-5" />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Background overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Sidebar content */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                            className="fixed inset-y-0 left-0 w-72 bg-background border-r z-50"
                        >
                            <div className="flex flex-col space-y-4 h-full">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h2 className="text-xl font-semibold">Menu</h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>

                                <nav className="flex-1 flex-col p-2">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center p-3 rounded-lg transition-colors ${pathname.startsWith(item.href)
                                                ? 'bg-muted font-medium'
                                                : 'hover:bg-muted/50'
                                                }`}
                                        >
                                            <item.icon className="h-5 w-5 mr-3" />
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>

                                <div className="flex flex-col items-center p-4 border-t">
                                    <Link href="/" className="w-3/4 mx-auto">
                                        <Button className="w-full">
                                            <Home className="size-4" />
                                            Home
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="w-3/4 mx-auto mt-2"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="size-4" />
                                        Sign Out
                                    </Button>

                                    <Link href={'/'} className="mt-8">
                                        <Image
                                            src={'/object-vision-logo.png'}
                                            alt="Object Vision Logo"
                                            width={150}
                                            height={0}
                                            className="h-auto object-contain"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};