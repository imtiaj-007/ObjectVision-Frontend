import type { Metadata } from "next";
import { settings } from '@/configuration/config';
import AboutUsPage from "@/components/pages/about-us-page";


const page_url: string = settings.FRONTEND_URL + '/about-us';
const logo_url: string = settings.LOGO_URL;

export const metadata: Metadata = {
    title: "About Us | ObjectVision",
    description: "Discover the story behind ObjectVision, our mission, and the team building powerful computer vision solutions. Learn what drives us to innovate and deliver value.",
    keywords: [
        "about us",
        "ObjectVision",
        "about ObjectVision",
        "ObjectVision mission",
        "idea behind ObjectVision",
        "ObjectVision testimonials",
        "computer vision team",
        "AI company mission"
    ],
    openGraph: {
        title: "About Us | ObjectVision",
        description: "Discover the story behind ObjectVision, our mission, and the team building powerful computer vision solutions. Learn what drives us to innovate and deliver value.",
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
        title: "About Us | ObjectVision",
        description: "Discover the story behind ObjectVision, our mission, and the team building powerful computer vision solutions. Learn what drives us to innovate and deliver value.",
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

export default function AboutUs() {
    return (
        <AboutUsPage />
    );
}