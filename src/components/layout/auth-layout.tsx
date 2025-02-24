'use client'
import React from "react";


export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-screen h-screen">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}