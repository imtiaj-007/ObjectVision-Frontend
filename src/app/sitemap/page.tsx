import type { Metadata } from "next";
import { settings } from '@/configuration/config';
import SitemapPage from "@/components/pages/sitemap-page";


const page_url: string = settings.FRONTEND_URL + '/sitemap';
const logo_url: string = settings.LOGO_URL;

export const metadata: Metadata = {
    title: "Sitemap | ObjectVision",
    description: "Complete site navigation with all ObjectVision pages including documentation, pricing, and legal information.",
    keywords: [
        "sitemap",
        "ObjectVision sitemap",
        "AI platform sitemap",
        "object detection site map",
        "computer vision sitemap",
        "site structure for ObjectVision",
        "ObjectVision page index",
        "object detection pages list",
        "ObjectVision sitemap XML",
        "website navigation structure",
        "sitemap for AI platform"
    ],
    openGraph: {
        title: "Sitemap | ObjectVision",
        description: "Complete site navigation with all ObjectVision pages including documentation, pricing, and legal information.",
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
        title: "Sitemap | ObjectVision",
        description: "Complete site navigation with all ObjectVision pages including documentation, pricing, and legal information.",
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

export default function Sitemap() {
    return (
        <SitemapPage />
    );
};
