import { AppSettings } from "@/types/general";

export const settings: AppSettings = {
    ENV: process.env.NEXT_PUBLIC_ENV || 'development',    
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_LIMIT: 10,

    MAX_RECONNECT_ATTEMPTS: 3,
    RECONNECT_DELAY: 5000,

    API_KEY: process.env.NEXT_PUBLIC_API_KEY || "your-api-key",
    SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY || "your-secret-key",

    FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL || "http://localhost:3000/logo.png",
    
    GOOGLE_TAG: process.env.NEXT_PUBLIC_GTAG_ID || "your-g-tag",    
    GOOGLE_VERIFICATION_CODE: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || "your-verification-code",

    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
    GOOGLE_OAUTH_URL: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL || "http://localhost:8000/api/oauth",
    
    RAZORPAY_KEY: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "your-razorpay-key",

    EMAIL_SERVICE_ID: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "your-emailjs-service-id",
    EMAIL_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || "your-emailjs-public-key",
    EMAIL_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "your-emailjs-template-id",
};

const environmentEmojis = {
    development: '🛠️',
    production: '🚀',
    staging: '🔍',
    test: '🧪'
};

console.log(
    `${environmentEmojis[settings.ENV]}  Running in ${settings.ENV} mode\n`
);

