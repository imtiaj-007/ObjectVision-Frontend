export const settings = {
    ENV: process.env.NEXT_PUBLIC_ENV || 'development',
    
    // Global Variables
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_LIMIT: 10,

    // Websocket Variables
    MAX_RECONNECT_ATTEMPTS: 3,
    RECONNECT_DELAY: 5000,

    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
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
    `${environmentEmojis[settings.ENV]}  Running in ${settings.ENV} mode\n`
);

