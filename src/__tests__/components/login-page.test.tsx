import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginPageComponent from '@/components/pages/login-page';

import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import useUser from '@/hooks/use-user';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

// Mock custom hooks
jest.mock('@/hooks/use-auth');
jest.mock('@/hooks/use-user');
jest.mock('@/hooks/use-toast');

// Mock components
jest.mock('@/components/modals/device-modal', () => {
    return function MockDeviceLoginModal({ isOpen, onClose, onProceed }: any) {
        return isOpen ? (
            <div data-testid="device-modal">
                <button onClick={onClose}>Close</button>
                <button onClick={onProceed}>Proceed</button>
            </div>
        ) : null;
    };
});

jest.mock('@/components/sections/website-overview', () => {
    return function MockWebsiteOverview({ title, subtitle }: any) {
        return (
            <div data-testid="website-overview">
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
        );
    };
});

describe('LoginPageComponent', () => {
    const mockPush = jest.fn();
    const mockLogin = jest.fn();
    const mockFetchUserProfile = jest.fn();
    const mockToast = jest.fn();
    const mockClearAuthErrors = jest.fn();
    const mockGet = jest.fn();

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Setup router mock
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });

        // Setup search params mock
        (useSearchParams as jest.Mock).mockReturnValue({
            get: mockGet,
        });

        // Setup auth hook mock
        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            loading: { signIn: false },
            clearAuthErrors: mockClearAuthErrors,
        });

        // Setup user hook mock
        (useUser as jest.Mock).mockReturnValue({
            fetchUserProfile: mockFetchUserProfile,
        });

        // Setup toast hook mock
        (useToast as jest.Mock).mockReturnValue({
            toast: mockToast,
        });
    });

    describe('Page Rendering', () => {
        it('renders the login page with all essential elements', () => {
            render(<LoginPageComponent />);
            const signinButton = screen.getByTestId('sign-in-button');

            expect(screen.getByText('Enter your credentials to access your account')).toBeInTheDocument();
            expect(screen.getByLabelText('Email / Username')).toBeInTheDocument();
            expect(screen.getByLabelText('Password')).toBeInTheDocument();
            expect(signinButton).toBeInTheDocument();
        });

        it('renders website overview section', () => {
            render(<LoginPageComponent />);

            expect(screen.getByTestId('website-overview')).toBeInTheDocument();
            expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
            expect(screen.getByText('Sign in to access your dashboard and continue your journey with us.')).toBeInTheDocument();
        });

        it('renders OAuth login buttons', () => {
            render(<LoginPageComponent />);

            expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
        });

        it('renders additional navigation links', () => {
            render(<LoginPageComponent />);

            expect(screen.getByText('Forgot password?')).toBeInTheDocument();
            expect(screen.getByText('Create an account')).toBeInTheDocument();
        });
    });

    describe('Loading States', () => {
        it('shows loading state during sign in', () => {
            (useAuth as jest.Mock).mockReturnValue({
                login: mockLogin,
                loading: { signIn: true },
                clearAuthErrors: mockClearAuthErrors,
            });

            render(<LoginPageComponent />);

            expect(screen.getByText('Logging in...')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
        });

        it('disables form fields during loading', () => {
            (useAuth as jest.Mock).mockReturnValue({
                login: mockLogin,
                loading: { signIn: true },
                clearAuthErrors: mockClearAuthErrors,
            });

            render(<LoginPageComponent />);

            expect(screen.getByLabelText('Email / Username')).toBeDisabled();
            expect(screen.getByLabelText('Password')).toBeDisabled();
        });
    });

    describe('OAuth Login', () => {
        it('redirects to Google OAuth when Google button is clicked', () => {
            render(<LoginPageComponent />);

            const googleButton = screen.getByRole('button', { name: /google/i });
            fireEvent.click(googleButton);

            expect(mockPush).toHaveBeenCalled();
        });

        it('shows coming soon message for GitHub OAuth', () => {
            render(<LoginPageComponent />);

            const githubButton = screen.getByRole('button', { name: /github/i });
            fireEvent.click(githubButton);

            expect(mockToast).toHaveBeenCalledWith({
                variant: "info",
                title: "Coming Soon",
                description: "Github OAuth will be implemented soon.",
            });
        });
    });

    describe('Navigation and Redirects', () => {
        it('redirects to default dashboard when no redirectURL is provided', async () => {
            mockGet.mockReturnValue(null);
            mockLogin.mockResolvedValue({});
            mockFetchUserProfile.mockResolvedValue({});

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            
            await act(async () => {
                fireEvent.click(submitButton);
            });

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/user/dashboard');
            });
        });

        it('redirects to custom URL when redirectURL is provided', async () => {
            mockGet.mockReturnValue('/custom/redirect');
            mockLogin.mockResolvedValue({});
            mockFetchUserProfile.mockResolvedValue({});

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            
            await act(async () => {
                fireEvent.click(submitButton);
            });

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/custom/redirect');
            });
        });
    });

    describe('Device Modal', () => {
        it('shows device modal when login returns 409 status code', async () => {
            const error = { message: 'Device not recognized', status_code: 409 };
            mockLogin.mockRejectedValue(error);

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByTestId('device-modal')).toBeInTheDocument();
            });
        });

        it('handles new device login when modal proceed is clicked', async () => {
            const error = { message: 'Device not recognized', status_code: 409 };
            mockLogin.mockRejectedValueOnce(error).mockResolvedValueOnce({});

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByTestId('device-modal')).toBeInTheDocument();
            });

            const proceedButton = screen.getByRole('button', { name: 'Proceed' });
            fireEvent.click(proceedButton);

            await waitFor(() => {
                expect(mockLogin).toHaveBeenCalledWith({
                    user_key: 'test@example.com',
                    password: 'password123',
                    remember_me: false,
                    new_device: true,
                });
            });
        });
    });

    describe('Error Handling', () => {
        it('shows toast for general login errors', async () => {
            const error = { message: 'An unexpected error has occurred' };
            mockLogin.mockRejectedValue(error);

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'wrongpassword' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockToast).toHaveBeenCalledWith({
                    variant: "destructive",
                    description: "An unexpected error has occurred"
                });
            });
        });

        it('shows default error message for unknown errors', async () => {
            const error = new Error('Network error');
            mockLogin.mockRejectedValue(error);

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockToast).toHaveBeenCalledWith({
                    variant: "destructive",
                    description: "An unexpected error has occurred"
                });
            });
        });
    });
});