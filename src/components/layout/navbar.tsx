'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/themes/theme-toggle';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isActiveLink = (path: string) => pathname === path;

  useEffect(()=> {
    if(localStorage.getItem('token'))
      setIsLoggedIn(true);
    else
      setIsLoggedIn(false);
  }, [router]);

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ObjectVision</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActiveLink(item.href) 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isLoggedIn ? (
                <Link 
                href="/profile"
                className="w-10 h-10 rounded-full border flex justify-center align-center"
                >
                  <Button variant="ghost" className="flex items-center">
                    <User  className="h-5 w-5" /> 
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}              
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
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
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActiveLink(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 pb-3">
              <Link href="/login">
                <Button variant="ghost" className="w-full justify-center">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full justify-center">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;