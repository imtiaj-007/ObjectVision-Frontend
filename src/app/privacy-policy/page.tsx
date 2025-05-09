import type { Metadata } from "next";
import { settings } from '@/configuration/config';
import PrivacyPolicyPage from "@/components/pages/privacy-policy-page";


const page_url: string = settings.FRONTEND_URL + '/privacy-policy';
const logo_url: string = settings.LOGO_URL;

export const metadata: Metadata = {
    title: "Privacy Policy | ObjectVision",
    description: "Learn how ObjectVision collects, uses, and protects your personal information. Our Privacy Policy outlines your data rights and our commitment to transparency and security.",
    keywords: [
        "privacy policy",
        "ObjectVision privacy policy",
        "AI platform privacy policy",
        "data protection policy",
        "user data privacy",
        "object detection data security",
        "privacy policy for AI services",
        "data collection and usage",
        "ObjectVision data handling",
        "privacy rights and protection",
        "GDPR compliance ObjectVision",
        "AI user privacy terms",
        "data retention policy",
        "data security in AI services"
    ],
    openGraph: {
        title: "Privacy Policy | ObjectVision",
        description: "Learn how ObjectVision collects, uses, and protects your personal information. Our Privacy Policy outlines your data rights and our commitment to transparency and security.",
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
        title: "Privacy Policy | ObjectVision",
        description: "Learn how ObjectVision collects, uses, and protects your personal information. Our Privacy Policy outlines your data rights and our commitment to transparency and security.",
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

export default function PrivacyPolicy() {
    return (
        <PrivacyPolicyPage />
    );
}