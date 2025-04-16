import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/docs/:path*',
                destination: '/docs/:path*'
            }
        ];
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost"
            },
            {
                protocol: "https",
                hostname: "flagcdn.com",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org"
            },
            {
                protocol: "https",
                hostname: "www.freepik.com"
            },
            {
                protocol: "https",
                hostname: "s3.ap-south-1.amazonaws.com"
            }
        ],
    },
};

export default nextConfig;
