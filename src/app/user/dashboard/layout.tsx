// app/user/dashboard/layout.tsx
import Sidebar from "@/components/layout/sidebar";
import { ReactNode } from "react";


interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex">
            {/* Sidebar - fixed position */}
            <Sidebar className="flex-shrink-0" />

            {/* Main content wrapper with proper margin for sidebar */}
            <div className="flex-1 md:ml-60 p-12">
                {children}
            </div>
        </div>
    );
}