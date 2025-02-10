export const config = {
    ENV: process.env.NEXT_PUBLIC_ENV || 'development',
    SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    GOOGLE_OAUTH_URL: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL,
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

