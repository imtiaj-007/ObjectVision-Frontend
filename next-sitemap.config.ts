import { settings } from '@/configuration/config'
import type { IConfig } from 'next-sitemap'

const siteUrl: string = settings.FRONTEND_URL || 'https://object-vision-frontend.vercel.app';

const config: IConfig = {
    siteUrl,
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ]
    },
}

export default config
