'use client'
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";


export function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}