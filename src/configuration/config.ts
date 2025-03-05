export const config = {
    ENV: process.env.NEXT_PUBLIC_ENV || 'development',
    
    // Global Variables
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_LIMIT: 10,

    SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    GOOGLE_OAUTH_URL: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL,
    RAZORPAY_KEY: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
};

const environmentEmojis = {
    development: '🛠️',
    production: '🚀',
    staging: '🔍',
    test: '🧪'
};

console.log(
    `${environmentEmojis[config.ENV]}  Running in ${config.ENV} mode\n`
);

