import type { Metadata } from "next";
import { settings } from '@/configuration/config';
import FAQPage from "@/components/pages/frequently-asked-questions-page";


const page_url: string = settings.FRONTEND_URL + '/frequently-asked-questions';
const logo_url: string = settings.LOGO_URL;

export const metadata: Metadata = {
    title: "FAQ | ObjectVision",
    description: "Find answers to common questions about ObjectVision's features, account setup, pricing, and more. Explore our FAQ to get quick help and guidance.",
    robots: {
        index: true,
        follow: true
    },
    openGraph: {
        title: "FAQ | ObjectVision",
        description: "Find answers to common questions about ObjectVision's features, account setup, pricing, and more. Explore our FAQ to get quick help and guidance.",
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
        title: "FAQ | ObjectVision",
        description: "Find answers to common questions about ObjectVision's features, account setup, pricing, and more. Explore our FAQ to get quick help and guidance.",
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

export default function FAQ() {
    return (
        <FAQPage />
    );
}