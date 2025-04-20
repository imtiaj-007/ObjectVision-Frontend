import type { Metadata } from "next";
import { settings } from '@/configuration/config';
import TermsOfServicePage from "@/components/pages/terms-of-service-page";


const page_url: string = settings.FRONTEND_URL + '/terms-of-service';
const logo_url: string = settings.LOGO_URL;

export const metadata: Metadata = {
    title: "Terms of Service | ObjectVision",
    description: "Read the official Terms of Service for ObjectVision AI. Learn about your rights, responsibilities, and our policies for using our platform, services, and content.",
    keywords: [
        "terms of service",
        "terms and conditions",
        "object detection usage terms",
        "service agreement",
        "ObjectVision legal policy",
        "acceptable use policy",
        "user agreement for ObjectVision",
        "AI API usage guidelines",
        "terms for using ObjectVision",
        "ObjectVision platform rules",
        "legal terms and conditions",
    ],
    openGraph: {
        title: "Terms of Service | ObjectVision",
        description: "Read the official Terms of Service for ObjectVision AI. Learn about your rights, responsibilities, and our policies for using our platform, services, and content.",
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
        title: "Terms of Service | ObjectVision",
        description: "Read the official Terms of Service for ObjectVision AI. Learn about your rights, responsibilities, and our policies for using our platform, services, and content.",
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

export default function TermsOfService() {
    return (
        <TermsOfServicePage />
    );
}