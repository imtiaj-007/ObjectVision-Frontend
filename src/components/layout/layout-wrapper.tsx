'use client'
import React from 'react'
import { BaseLayout } from './base-layout';
import { DashboardLayout } from './dashboard-layout';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';


export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const dashboardRoutes = ['/user', '/admin'];
    const isDashboard = dashboardRoutes.some(route => pathname.startsWith(route));

    return isDashboard ? (
        <DashboardLayout>
            <ToastContainer />
            {children}
        </DashboardLayout>
    ) : (
        <BaseLayout>
            <ToastContainer />
            {children}
        </BaseLayout>
    );
}

export default LayoutWrapper
