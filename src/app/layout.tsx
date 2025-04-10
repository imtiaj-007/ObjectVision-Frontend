import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import LayoutWrapper from "@/components/layout/layout-wrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ObjectVision - Advanced Object Detection",
    description: "Transform your images into intelligent insights with our state-of-the-art object detection technology",
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}