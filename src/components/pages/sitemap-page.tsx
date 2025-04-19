'use client'
import Link from 'next/link';
import {
    Home, Info, DollarSign, FileText, Code, BookOpen,
    HelpCircle, Map, Lock, Shield, ChevronRight, ExternalLink,
    Layers, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';


const SitemapPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900">
            <main className="max-w-5xl mx-auto px-6 py-16">
                <div className="flex items-center justify-center mb-12">
                    <Map className="size-10 text-blue-400 mr-3" />
                    <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 py-4">
                        Site Navigation
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Main Pages Category */}
                    <CategoryCard
                        title="Main Pages"
                        icon={<Layers className="h-6 w-6" />}
                    >
                        <ul className="space-y-2 p-4 pt-0">
                            <SitemapLink href="/" icon={<Home />} label="Home" />
                            <SitemapLink href="/about-us" icon={<Info />} label="About Us" />
                            <SitemapLink href="/pricing" icon={<DollarSign />} label="Pricing" />
                            <SitemapLink href="/frequently-asked-questions" icon={<HelpCircle />} label="FAQ" />
                        </ul>
                    </CategoryCard>

                    {/* Legal & Other Category */}
                    <CategoryCard
                        title="Legal & Other"
                        icon={<Lock className="h-6 w-6" />}
                    >
                        <ul className="space-y-2 p-4 pt-0">
                            <SitemapLink href="/terms-of-service" icon={<FileText />} label="Terms of Service" />
                            <SitemapLink href="/privacy-policy" icon={<Shield />} label="Privacy Policy" />
                            <SitemapLink href="/sitemap" icon={<Map />} label="Sitemap" highlight={true} />
                            <SitemapLink href="/user/profile" icon={<User />} label="My Account" />
                        </ul>
                    </CategoryCard>

                    {/* Documentation Category */}
                    <CategoryCard
                        title="Documentation"
                        icon={<BookOpen className="h-6 w-6" />}
                    >
                        <ul className="space-y-2 p-4 pt-0">
                            <SitemapLink href="/documentation" icon={<FileText />} label="Documentation" />
                            <SitemapLink href="/docs" icon={<Code />} label="Frontend Docs" />
                            <SitemapLink
                                href="https://api-objectvision-ai.linkpc.net/redoc"
                                icon={<FileText />}
                                label="Backend Docs"
                                isExternal={true}
                            />
                            <SitemapLink
                                href="https://api-objectvision-ai.linkpc.net/docs"
                                icon={<Code />}
                                label="API Playground"
                                isExternal={true}
                            />
                        </ul>
                    </CategoryCard>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-400">
                        Can&apos;t find what you&apos;re looking for? <Link href="mailto:imtiaj.dev.kol@gmail.com" className="text-blue-400 hover:underline">Contact us</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

const CategoryCard = ({ title, icon, children }) => {
    return (
        <Card className="bg-slate-800 border-none transition-all duration-300">
            <div className="w-full flex items-center p-5">
                <div className="flex items-center">
                    <div className="bg-blue-900/40 p-3 rounded-lg mr-4 text-blue-600 dark:text-blue-400">
                        {icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-100">
                        {title}
                    </h2>
                </div>
            </div>
            {children}
        </Card>
    );
};

const SitemapLink = ({ href, icon, label, isExternal = false, highlight = false }) => {
    const LinkComponent = isExternal ?
        ({ children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> :
        ({ children }) => <Link href={href}>{children}</Link>;

    return (
        <li>
            <LinkComponent>
                <div className={cn(
                    "flex items-center p-3 rounded-lg transition-all duration-200",
                    "hover:bg-blue-900/20 hover:shadow-md",
                    highlight
                        ? "bg-blue-900/40 text-blue-300"
                        : "bg-slate-700/50 text-gray-300"
                )}>
                    <div className="mr-3 text-blue-600 dark:text-blue-400">
                        {icon}
                    </div>
                    <span className="flex-1 font-medium">{label}</span>
                    {isExternal ? (
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                </div>
            </LinkComponent>
        </li>
    );
};

export default SitemapPage;