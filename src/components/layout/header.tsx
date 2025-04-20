import React, { useMemo } from 'react';
import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from '../themes/theme-toggle';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Image as ImageIcon, Video } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import { MobileNav } from './mobile-navigation';
import { SiTask } from 'react-icons/si';
import { toast } from '@/hooks/use-toast';

const navigation = [
    {
        name: "Dashboard",
        href: "/user/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Image Processing",
        href: "/user/image-processing",
        icon: ImageIcon
    },
    {
        name: "Video Processing",
        href: "/user/video-processing",
        icon: Video
    },
    {
        name: "Processed Results",
        href: "/user/predictions",
        icon: SiTask
    }
];


const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { logoutUser } = useAuth();

    const currentNav = useMemo(() =>
        navigation.find(nav => pathname.startsWith(nav.href)),
        [pathname]
    );

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
        <header className="h-16 bg-nav flex items-center justify-between p-2 lg:px-8 z-50 rounded-xl border mb-2">
            <MobileNav navigation={navigation} pathname={pathname} />
            <span className="text-xl font-semibold">{currentNav?.name}</span>

            {/* Middle section - Search */}
            <div className="hidden md:flex items-center max-w-md w-full mx-4">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-muted/50 dark:bg-black/10 border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>

            {/* Right section - Theme toggle and Profile */}
            <div className="flex items-center space-x-4">
                <ThemeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="/api/placeholder/32/32" alt="User" />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;