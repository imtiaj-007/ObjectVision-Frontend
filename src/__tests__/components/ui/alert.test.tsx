import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


describe('Alert Component', () => {
    it('renders the alert with the correct message', () => {
        render(<Alert variant="default">Test message</Alert>);
        expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('applies the correct CSS classes for destructive variant', () => {
        render(<Alert variant="destructive">Error message</Alert>);
        const alertElement = screen.getByRole('alert');
        
        // Check for the base classes and variant-specific classes
        expect(alertElement).toHaveClass('relative', 'w-full', 'font-medium', 'rounded-lg', 'border', 'px-4', 'py-3', 'text-sm');
        expect(alertElement).toHaveClass('bg-red-500', 'border-red-500', 'text-white');
    });

    it('applies the correct CSS classes for default variant', () => {
        render(<Alert variant="default">Default message</Alert>);
        const alertElement = screen.getByRole('alert');
        
        expect(alertElement).toHaveClass('bg-background', 'text-foreground');
    });

    it('applies the correct CSS classes for outline variant', () => {
        render(<Alert variant="outline">Outline message</Alert>);
        const alertElement = screen.getByRole('alert');
        
        expect(alertElement).toHaveClass('border-border', 'bg-transparent', 'text-foreground', 'hover:bg-accent/50');
    });

    it('uses default variant when no variant is specified', () => {
        render(<Alert>Default variant message</Alert>);
        const alertElement = screen.getByRole('alert');
        
        expect(alertElement).toHaveClass('bg-background', 'text-foreground');
    });

    it('applies custom className along with variant classes', () => {
        render(<Alert variant="destructive" className="custom-class">Custom class test</Alert>);
        const alertElement = screen.getByRole('alert');
        
        expect(alertElement).toHaveClass('custom-class');
        expect(alertElement).toHaveClass('bg-red-500', 'border-red-500', 'text-white');
    });

    it('has the correct role attribute', () => {
        render(<Alert>Role test</Alert>);
        const alertElement = screen.getByRole('alert');
        
        expect(alertElement).toHaveAttribute('role', 'alert');
    });

    it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Alert ref={ref}>Ref test</Alert>);
        
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes through additional props', () => {
        render(<Alert data-testid="custom-alert" aria-label="Custom alert">Props test</Alert>);
        const alertElement = screen.getByTestId('custom-alert');
        
        expect(alertElement).toHaveAttribute('aria-label', 'Custom alert');
    });
});

describe('AlertTitle Component', () => {
    it('renders the alert title correctly', () => {
        render(<AlertTitle>Alert Title</AlertTitle>);
        expect(screen.getByText('Alert Title')).toBeInTheDocument();
    });

    it('applies the correct CSS classes', () => {
        render(<AlertTitle>Title</AlertTitle>);
        const titleElement = screen.getByText('Title');
        
        expect(titleElement).toHaveClass('mb-1', 'font-medium', 'leading-none', 'tracking-tight');
    });

    it('renders as h5 element', () => {
        render(<AlertTitle>Title</AlertTitle>);
        const titleElement = screen.getByText('Title');
        
        expect(titleElement.tagName).toBe('H5');
    });

    it('applies custom className', () => {
        render(<AlertTitle className="custom-title">Custom Title</AlertTitle>);
        const titleElement = screen.getByText('Custom Title');
        
        expect(titleElement).toHaveClass('custom-title');
        expect(titleElement).toHaveClass('mb-1', 'font-medium', 'leading-none', 'tracking-tight');
    });
});

describe('AlertDescription Component', () => {
    it('renders the alert description correctly', () => {
        render(<AlertDescription>Alert Description</AlertDescription>);
        expect(screen.getByText('Alert Description')).toBeInTheDocument();
    });

    it('applies the correct CSS classes', () => {
        render(<AlertDescription>Description</AlertDescription>);
        const descriptionElement = screen.getByText('Description');
        
        expect(descriptionElement).toHaveClass('text-sm', '[&_p]:leading-relaxed');
    });

    it('renders as div element', () => {
        render(<AlertDescription>Description</AlertDescription>);
        const descriptionElement = screen.getByText('Description');
        
        expect(descriptionElement.tagName).toBe('DIV');
    });

    it('applies custom className', () => {
        render(<AlertDescription className="custom-description">Custom Description</AlertDescription>);
        const descriptionElement = screen.getByText('Custom Description');
        
        expect(descriptionElement).toHaveClass('custom-description');
        expect(descriptionElement).toHaveClass('text-sm', '[&_p]:leading-relaxed');
    });
});

describe('Alert Component Integration', () => {
    it('renders complete alert with title and description', () => {
        render(
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>
        );

        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
    });

    it('handles svg icons correctly with proper spacing classes', () => {
        render(
            <Alert variant="default">
                <svg data-testid="alert-icon">
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                <AlertTitle>With Icon</AlertTitle>
                <AlertDescription>Alert with icon</AlertDescription>
            </Alert>
        );

        const alertElement = screen.getByRole('alert');
        const iconElement = screen.getByTestId('alert-icon');
        
        expect(alertElement).toBeInTheDocument();
        expect(iconElement).toBeInTheDocument();
        
        // The Alert component has classes for handling svg positioning
        expect(alertElement).toHaveClass('[&>svg]:absolute', '[&>svg]:left-4', '[&>svg]:top-4', '[&>svg~*]:pl-7');
    });
});