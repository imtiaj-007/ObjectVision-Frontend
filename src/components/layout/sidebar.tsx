'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Image as ImageIcon, Video, MenuIcon, X } from "lucide-react";
import { SiTask , SiNextdotjs, SiFastapi } from "react-icons/si";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { settings } from "@/configuration/config";



interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC = ({ className }: SidebarProps) => {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navigation = [
        {
            name: "Dashboard",
            href: "/user/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Image Processing",
            href: "/user/dashboard/image-processing",
            icon: ImageIcon
        },
        {
            name: "Video Processing",
            href: "/user/dashboard/video-processing",
            icon: Video
        },
        {
            name: "Processed Results",
            href: "/user/dashboard/predictions",
            icon: SiTask 
        }
    ];

    const docRoutes = [
        {
            name: "Frontend Docs",
            href: "/docs/index.html",
            icon: SiNextdotjs
        },
        {
            name: "Backend Docs",
            href: `${settings.BACKEND_URL}/redoc`,
            icon: SiFastapi
        },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <Button
                variant="outline"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? (
                    <X className="h-4 w-4" />
                ) : (
                    <MenuIcon className="h-4 w-4" />
                )}
            </Button>

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed top-0 left-0 z-40 h-screen w-60 flex flex-col border-r",
                    "transition-transform duration-200 ease-in-out md:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                    className
                )}
            >
                {/* Logo */}
                <div className="flex items-center justify-center space-x-1 py-2 border-b-2">
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

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <div className="h-full flex flex-col justify-between">
                        <div className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-4 py-3 text-sm font-medium rounded-lg",
                                            "transition-colors duration-200",
                                            "hover:bg-muted",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="space-y-1">
                            {docRoutes.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        className={cn(
                                            "flex items-center px-4 py-3 text-sm font-medium rounded-lg",
                                            "transition-colors duration-200",
                                            "hover:bg-muted",
                                            "text-muted-foreground"
                                        )}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;