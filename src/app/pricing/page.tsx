import type { Metadata } from "next";
import { settings } from '@/configuration/config';
import PricingPage from "@/components/pages/pricing-page";


const page_url: string = settings.FRONTEND_URL + '/pricing';
const logo_url: string = settings.LOGO_URL;

export const metadata: Metadata = {
    title: "Pricing Plans | ObjectVision",
    description: "Explore flexible pricing plans tailored for individuals, teams, and enterprises. Choose the right plan for your needs and get started with ObjectVision today.",
    keywords: [
        "pricing",
        "object detection pricing",
        "AI detection pricing",
        "computer vision pricing",
        "ObjectVision pricing plans",
        "image analysis API pricing",
        "AI subscription plans",
        "machine learning service cost",
        "custom AI pricing",
        "enterprise vision plans",
        "visual recognition cost"
    ],
    openGraph: {
        title: "Pricing Plans | ObjectVision",
        description: "Explore flexible pricing plans tailored for individuals, teams, and enterprises. Choose the right plan for your needs and get started with ObjectVision today.",
        url: page_url,
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
        title: "Pricing Plans | ObjectVision",
        description: "Explore flexible pricing plans tailored for individuals, teams, and enterprises. Choose the right plan for your needs and get started with ObjectVision today.",
        site: page_url,
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
    alternates: { canonical: page_url }
};

export default function Pricing() {
    return (
        <PricingPage />
    );
}