import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import { settings } from "@/configuration/config";


const inter = Inter({ subsets: ["latin"] });
const site_url: string = settings.FRONTEND_URL;
const logo_url: string = settings.LOGO_URL;
const g_tag: string = settings.GOOGLE_TAG;
const google_verification_id: string = settings.GOOGLE_VERIFICATION_CODE;


export const metadata: Metadata = {
    title: "ObjectVision - Advanced Object Detection AI",
    description: "Transform your images into actionable insights with our state-of-the-art object detection technology. Industry-specific solutions for retail, security, healthcare, and manufacturing.",
    keywords: [
        "ObjectVision",
        "object detection",
        "computer vision",
        "AI",
        "AI detection",
        "image detection",
        "video detection",
        "real time detection",
        "visual AI",
        "ML",
        "machine learning"
    ],
    applicationName: "ObjectVision",
    authors: { name: "SK Imtiaj Uddin", url: "https://sk-imtiaj-uddin-portfolio.netlify.app/" },
    openGraph: {
        title: "ObjectVision - Advanced Object Detection AI",
        description: "Transform your images into actionable insights with our state-of-the-art object detection technology",
        url: site_url,
        siteName: "ObjectVision",
        images: [
            {
                url: logo_url,
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
        description: "Transform your images into actionable insights with our state-of-the-art object detection technology",
        site: site_url,
        creator: "SK Imtiaj Uddin",
        images: [
            {
                url: logo_url,
                width: 1783,
                height: 739,
                alt: "ObjectVision AI Platform",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        noarchive: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noarchive: true,
            nocache: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: { google: google_verification_id },
    alternates: { canonical: site_url },
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
                <Script async src={`https://www.googletagmanager.com/gtag/js?id=${g_tag}`} />
                <Script
                    id="google_analytics_gtag"
                    dangerouslySetInnerHTML={{
                        __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${g_tag}', {
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
                            "applicationCategory": "AIPlatform",
                            "operatingSystem": "All",
                            "browserRequirements": "Requires JavaScript",
                            "url": site_url,
                            "logo": logo_url,
                            "description": "Advanced object detection platform using AI for industries like retail, security, healthcare, and manufacturing.",
                            "offers": {
                                "@type": "Offer",
                                "price": "100",
                                "priceCurrency": "INR"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "ObjectVision AI",
                                "url": site_url,
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": logo_url
                                }
                            }
                        }),
                    }}
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
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