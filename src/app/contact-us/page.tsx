import type { Metadata } from "next";
import { settings } from '@/configuration/config';
import ContactUsPage from "@/components/pages/contact-us-page";


const page_url: string = settings.FRONTEND_URL + '/contact-us';
const logo_url: string = settings.LOGO_URL;

export const metadata: Metadata = {
    title: "Contact Us | ObjectVision",
    description: "Reach out to ObjectVision for inquiries, support, or collaboration opportunities. Our team is here to assist with AI-powered image, video, and object detection solutions.",
    keywords: [
        "contact us",
        "ObjectVision contact us",
        "ObjectVision support",
        "AI solutions support",
        "object detection support",
        "ObjectVision team",
        "ObjectVision inquiries",
        "contact ObjectVision",
        "get in touch ObjectVision",
        "ObjectVision customer support",
        "ObjectVision help desk"
    ],
    openGraph: {
        title: "Contact Us | ObjectVision",
        description: "Reach out to ObjectVision for inquiries, support, or collaboration opportunities. Our team is here to assist with AI-powered image, video, and object detection solutions.",
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
        title: "Contact Us | ObjectVision",
        description: "Reach out to ObjectVision for inquiries, support, or collaboration opportunities. Our team is here to assist with AI-powered image, video, and object detection solutions.",
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

export default function ContactUs() {
    return (
        <ContactUsPage />
    );
}