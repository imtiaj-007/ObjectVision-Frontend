'use client'
import React from 'react'
import { BaseLayout } from './base-layout';
import { DashboardLayout } from './dashboard-layout';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster"
import { Providers } from '@/store/providers';


export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const dashboardRoutes = ['/user', '/admin'];
    const isDashboard = dashboardRoutes.some(route => pathname.startsWith(route));

    return (
        <Providers>
            <Toaster />
            {isDashboard ? (
                <DashboardLayout>{children}</DashboardLayout>
            ) : (
                <BaseLayout>{children}</BaseLayout>
            )}
        </Providers>
    );
}

export default LayoutWrapper
