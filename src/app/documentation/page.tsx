import type { Metadata } from "next";
import { settings } from '@/configuration/config';
import ObjectVisionDocsPage from "@/components/pages/docs-overview-page";


const page_url: string = settings.FRONTEND_URL + '/documentation';
const logo_url: string = settings.LOGO_URL;

export const metadata: Metadata = {
    title: "Documentation | ObjectVision",
    description: "Get started with ObjectVision using our comprehensive documentation. Find guides, API references, setup instructions, and best practices to make the most of our platform.",
    keywords: [
        "docs",
        "API docs",
        "documentation",
        "API reference",
        "API playground",
        "code examples",
        "developer guide",
        "ObjectVision documentation",
        "object detection API docs",
        "machine learning API docs",
        "ObjectVision developer guide",
        "how to use ObjectVision API",
    ],
    openGraph: {
        title: "Documentation | ObjectVision",
        description: "Get started with ObjectVision using our comprehensive documentation. Find guides, API references, setup instructions, and best practices to make the most of our platform.",
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
        title: "Documentation | ObjectVision",
        description: "Get started with ObjectVision using our comprehensive documentation. Find guides, API references, setup instructions, and best practices to make the most of our platform.",
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

export default function Documentation() {
    return (
        <ObjectVisionDocsPage />
    );
}