'use client'
import React from 'react'
import { BaseLayout } from './base-layout';
import { DashboardLayout } from './dashboard-layout';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster"
import { Providers } from '@/store/providers';
import { AuthLayout } from './auth-layout';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const dashboardRoutes = ['/user', '/admin'];
    const authRoutes = ['/auth'];

    const isDashboard = dashboardRoutes.some(route => pathname.startsWith(route));
    const isAuthRoutes = authRoutes.some(route => pathname.startsWith(route));

    const getLayout = () => {
        if (isDashboard) return <DashboardLayout>{children}</DashboardLayout>;
        if (isAuthRoutes) return <AuthLayout>{children}</AuthLayout>;
        return <BaseLayout>{children}</BaseLayout>;
    };

    return (
        <Providers>
            <Toaster />
            {getLayout()}
        </Providers>
    );
}

export default LayoutWrapper;
