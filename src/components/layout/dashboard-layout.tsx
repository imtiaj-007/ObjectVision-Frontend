'use client'
import ProtectedClient from "../protected-client";
import Header from "./header";
import Sidebar from "./sidebar";


export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedClient>
            <div className="flex min-h-screen bg-background text-foreground">
                <aside className="hidden lg:block w-60 min-h-screen">
                    <Sidebar />
                </aside>
                <main className="flex-1 p-3">
                    <Header />
                    <div className="relative px-2 py-8 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedClient>
    );
}