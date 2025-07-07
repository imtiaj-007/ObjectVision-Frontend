/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, whileInView, whileHover, initial, animate, variants, transition, ...props }) => (
            <div {...props}>{children}</div>
        ),
        h2: ({ children, whileInView, whileHover, initial, animate, variants, transition, ...props }) => (
            <h2 {...props}>{children}</h2>
        ),
        p: ({ children, whileInView, whileHover, initial, animate, variants, transition, ...props }) => (
            <p {...props}>{children}</p>
        ),
    },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
    const MockLink = ({ children, href, ...props }) => (
        <a href={href} {...props}>
            {children}
        </a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

describe('HomePage', () => {
    beforeEach(() => {
        render(<HomePage />);
    });

    describe('Hero Section', () => {
        it('renders the main heading', () => {
            expect(screen.getByText(/Transform Your Images with AI-Powered Object Detection/i)).toBeInTheDocument();
        });

        it('displays the introduction badge', () => {
            expect(screen.getByText(/Introducing ObjectVision AI/i)).toBeInTheDocument();
        });

        it('shows the main description', () => {
            expect(screen.getByText(/Instantly detect, classify, and analyze objects in your images/i)).toBeInTheDocument();
        });

        it('renders call-to-action buttons', () => {
            const startTrialButtons = screen.getAllByText(/Start Free Trial/i);
            const liveDemoButton = screen.getByText(/Live Demo/i);

            expect(startTrialButtons.length).toBeGreaterThan(0);
            expect(liveDemoButton).toBeInTheDocument();
        });

        it('displays statistics correctly', () => {
            expect(screen.getByText('99.9%')).toBeInTheDocument();
            expect(screen.getByText('50ms')).toBeInTheDocument();
            expect(screen.getByText('5M+')).toBeInTheDocument();
            expect(screen.getByText('1000+')).toBeInTheDocument();

            expect(screen.getByText('Accuracy Rate')).toBeInTheDocument();
            expect(screen.getByText('Processing Time')).toBeInTheDocument();
            expect(screen.getByText('Images Processed')).toBeInTheDocument();
            expect(screen.getByText('Happy Users')).toBeInTheDocument();
        });
    });

    describe('Features Section', () => {
        it('renders features section heading', () => {
            expect(screen.getByText('Everything You Need')).toBeInTheDocument();
        });

        it('displays all feature cards', () => {
            const featureCards = [
                'Real-time Detection',
                'Fast Processing',
                'High Accuracy',
                'Batch Processing',
                'Advanced Analytics',
                'API Integration'
            ];

            featureCards.forEach(feature => {
                expect(screen.getByText(feature)).toBeInTheDocument();
            });
        });

        it('shows feature descriptions', () => {
            expect(screen.getByText(/Process images in real-time with AI models/i)).toBeInTheDocument();
            expect(screen.getByText(/Lightning-fast detection speed of ~50ms/i)).toBeInTheDocument();
            expect(screen.getByText(/Industry-leading 99.9% accuracy rate/i)).toBeInTheDocument();
        });
    });

    describe('Supported Formats Section', () => {
        it('renders supported formats section', () => {
            expect(screen.getByText('Supported Formats')).toBeInTheDocument();
        });

        it('displays various file formats', () => {
            const formats = [
                'JPEG/JPG',
                'PNG',
                'MP4',
                'RAW',
                'MOV',
                'WEBP',
                'AVI',
                'TIFF',
                'MKV',
                'BMP',
                'WMV'
            ];

            formats.forEach(format => {
                expect(screen.getByText(format)).toBeInTheDocument();
            });
        });

        it('shows format descriptions', () => {
            expect(screen.getByText(/High-quality compressed images/i)).toBeInTheDocument();
            expect(screen.getByText(/Lossless compression with transparency/i)).toBeInTheDocument();
            expect(screen.getByText(/Industry standard video format/i)).toBeInTheDocument();
        });
    });

    describe('Call-to-Action Section', () => {
        it('renders the final CTA section', () => {
            expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
        });

        it('displays CTA description', () => {
            expect(screen.getByText(/Start your free trial today. No credit card required./i)).toBeInTheDocument();
        });

        it('shows contact sales button', () => {
            expect(screen.getByText(/Contact Sales/i)).toBeInTheDocument();
        });
    });

    describe('Navigation Links', () => {
        it('contains correct navigation links', () => {
            // Check for login links
            const loginLinks = screen.getAllByRole('link').filter(link =>
                link.getAttribute('href') === '/auth/login'
            );
            expect(loginLinks.length).toBeGreaterThan(0);

            // Check for documentation link
            const docLink = screen.getByRole('link', { name: /Live Demo/i });
            expect(docLink).toHaveAttribute('href', '/documentation');

            // Check for contact sales link
            const contactLink = screen.getByRole('link', { name: /Contact Sales/i });
            expect(contactLink).toHaveAttribute('href', '/contact-us');
        });
    });

    describe('Visual Elements', () => {
        it('renders with proper CSS classes for styling', () => {
            const heroSection = screen.getByText(/Transform Your Images with AI-Powered Object Detection/i);
            expect(heroSection).toHaveClass('text-5xl', 'md:text-7xl', 'font-bold');
        });

        it('has proper background gradient classes', () => {
            const mainContainer = document.querySelector('.min-h-screen');
            expect(mainContainer).toHaveClass('bg-gradient-to-b', 'from-slate-900', 'to-slate-800');
        });
    });

    describe('Accessibility', () => {
        it('has proper heading hierarchy', () => {
            const h1 = screen.getByRole('heading', { level: 1 });
            expect(h1).toBeInTheDocument();

            const h2Elements = screen.getAllByRole('heading', { level: 2 });
            expect(h2Elements.length).toBeGreaterThan(0);
        });

        it('has accessible button labels', () => {
            const buttons = screen.getAllByRole('button');
            buttons.forEach(button => {
                expect(button).toHaveTextContent(/.+/); // Should have some text content
            });
        });

        it('has proper link accessibility', () => {
            const links = screen.getAllByRole('link');
            links.forEach(link => {
                expect(link).toHaveAttribute('href');
            });
        });
    });

    describe('Content Structure', () => {
        it('renders all main sections', () => {
            // Hero section
            expect(screen.getByText(/Transform Your Images with AI-Powered Object Detection/i)).toBeInTheDocument();

            // Features section  
            expect(screen.getByText('Everything You Need')).toBeInTheDocument();

            // Supported formats section
            expect(screen.getByText('Supported Formats')).toBeInTheDocument();

            // Final CTA section
            expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
        });

        it('displays icons for features and formats', () => {
            // Check that Lucide icons are rendered (they should be in the DOM)
            const iconContainers = document.querySelectorAll('.h-12.w-12');
            expect(iconContainers.length).toBeGreaterThan(0);
        });
    });

    describe('Responsive Design Elements', () => {
        it('has responsive grid classes', () => {
            const statsGrid = document.querySelector('.grid-cols-2.md\\:grid-cols-4');
            expect(statsGrid).toBeInTheDocument();

            const featuresGrid = document.querySelector('.md\\:grid-cols-3');
            expect(featuresGrid).toBeInTheDocument();
        });

        it('has responsive text classes', () => {
            const mainHeading = screen.getByText(/Transform Your Images with AI-Powered Object Detection/i);
            expect(mainHeading).toHaveClass('text-5xl', 'md:text-7xl');
        });
    });
});

// Additional test for error boundaries and edge cases
describe('HomePage Edge Cases', () => {
    it('renders without crashing', () => {
        expect(() => render(<HomePage />)).not.toThrow();
    });

    it('handles missing props gracefully', () => {
        // Component doesn't take props, but testing it renders standalone
        const { container } = render(<HomePage />);
        expect(container.firstChild).toBeInTheDocument();
    });
});

// Performance and optimization tests
describe('HomePage Performance', () => {
    it('does not render unnecessary elements', () => {
        const { container } = render(<HomePage />);
        const allElements = container.querySelectorAll('*');

        // Should have a reasonable number of elements (not excessive)
        expect(allElements.length).toBeLessThan(500);
    });

    it('uses semantic HTML elements', () => {
        // Check for semantic elements by querying the DOM directly
        const { container } = render(<HomePage />);

        // Check for headings (h1, h2, h3)
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        expect(headings.length).toBeGreaterThan(0);

        // Check for sections
        const sections = container.querySelectorAll('section');
        expect(sections.length).toBeGreaterThan(0);

        // Check for buttons (within Button components)
        const buttons = container.querySelectorAll('button, [role="button"]');
        expect(buttons.length).toBeGreaterThan(0);

        // Check for links
        const links = container.querySelectorAll('a, [role="link"]');
        expect(links.length).toBeGreaterThan(0);
    });
});