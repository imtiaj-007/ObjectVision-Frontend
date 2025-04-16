import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ObjectVision - Advanced Object Detection AI",
    description: "Transform your images into actionable insights with our state-of-the-art object detection technology. Industry-specific solutions for retail, security, healthcare, and manufacturing.",
    keywords: "object detection, computer vision, AI, AI detection, image recognition, visual AI, ML, machine learning",
    applicationName: "ObjectVision",
    authors: { name: "SK Imtiaj Uddin", url: "https://sk-imtiaj-uddin-portfolio.netlify.app/" },
    openGraph: {
        title: "ObjectVision - Advanced Object Detection AI",
        description: "Transform your images into actionable insights with our state-of-the-art object detection technology",
        url: "https://object-vision-frontend.vercel.app",
        siteName: "ObjectVision",
        images: [
            {
                url: "https://object-vision-frontend.vercel.app/object-vision-logo.png",
                width: 1783,
                height: 739,
                alt: "ObjectVision AI Platform",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ObjectVision - Advanced Object Detection AI",
        description: "Transform your images into actionable insights with our state-of-the-art object detection",
        images: ["https://object-vision-frontend.vercel.app/object-vision-logo.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "OuSofKLORGTLOydYjhd36JkYpysvJ3m1bNNIL7K5qV8",
    },
    alternates: {
        canonical: "https://object-vision-frontend.vercel.app",
    },
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SE5C1NGH3B" />
                <Script
                    id="google_analytics_gtag"
                    dangerouslySetInnerHTML={{
                        __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', 'G-SE5C1NGH3B', {
                              page_path: window.location.pathname,
                          });
                        `,
                    }}
                />
                {/* Website Schema compatible with https://schema.org */}
                <Script
                    id="schema-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            "name": "ObjectVision",
                            "applicationCategory": "SoftwareApplication",
                            "description": "Advanced object detection platform using AI for industries",
                            "offers": {
                                "@type": "Offer",
                                "price": "100",
                                "priceCurrency": "INR"
                            }
                        })
                    }}
                />
            </head>
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