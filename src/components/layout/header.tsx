import React from 'react';
import { Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from '../themes/theme-toggle';

const Header = () => {

    return (
        <header className="h-16 bg-background flex items-center justify-between p-2 lg:px-8 z-50 rounded-xl border-2 mb-2">
            <div className="flex items-center">
                <Menu className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer lg:hidden mr-4" />
                <span className="text-xl font-semibold">Dashboard</span>
            </div>

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
                        <DropdownMenuItem>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;