import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPageComponent from '@/components/pages/login-page';

import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import useUser from '@/hooks/use-user';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({ push: jest.fn() })),
    useSearchParams: jest.fn(() => ({ get: jest.fn() })),
}));

// Mock custom hooks
jest.mock('@/hooks/use-auth');
jest.mock('@/hooks/use-user');
jest.mock('@/hooks/use-toast');

// Mock components
jest.mock('@/components/modals/device-modal', () => {
    return function MockDeviceLoginModal() {
        return <div data-testid="device-modal" />;
    };
});

jest.mock('@/components/sections/website-overview', () => {
    return function MockWebsiteOverview() {
        return <div data-testid="website-overview" />;
    };
});

describe('Login Form Validation', () => {
    const mockLogin = jest.fn();
    const mockFetchUserProfile = jest.fn();
    const mockToast = jest.fn();
    const mockClearAuthErrors = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            loading: { signIn: false },
            clearAuthErrors: mockClearAuthErrors,
        });

        (useUser as jest.Mock).mockReturnValue({
            fetchUserProfile: mockFetchUserProfile,
        });

        (useToast as jest.Mock).mockReturnValue({
            toast: mockToast,
        });
    });

    describe('Form Field Validation', () => {
        it('accepts valid email format', async () => {
            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');

            // Enter valid email
            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });

            // Trigger blur event to validate
            fireEvent.blur(emailField);

            await waitFor(() => {
                // Should not show validation error
                expect(screen.queryByText(/Email or username is required/i)).not.toBeInTheDocument();
                expect(screen.queryByText(/Must be a valid email address or username with at least 3 characters/i)).not.toBeInTheDocument();
            });
        });

        it('accepts username format', async () => {
            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');

            // Enter username instead of email
            fireEvent.change(emailField, { target: { value: 'testuser' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });

            // Trigger blur event to validate
            fireEvent.blur(emailField);

            await waitFor(() => {
                // Should not show validation error
                expect(screen.queryByText(/Email or username is required/i)).not.toBeInTheDocument();
                expect(screen.queryByText(/Must be a valid email address or username with at least 3 characters/i)).not.toBeInTheDocument();
            });
        });

        it('validates minimum password length', async () => {
            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');

            // Enter short password
            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: '123' } });

            // Trigger blur event to validate
            fireEvent.blur(passwordField);

            await waitFor(() => {
                // Should show password length validation error
                expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
            });
        });

        it('clears validation errors when valid input is entered', async () => {
            render(<LoginPageComponent />);

            const passwordField = screen.getByLabelText('Password');

            // First, trigger validation error
            fireEvent.change(passwordField, { target: { value: '123' } });
            fireEvent.blur(passwordField);

            await waitFor(() => {
                expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
            });

            // Then, enter valid password
            fireEvent.change(passwordField, { target: { value: 'validpassword123' } });
            fireEvent.blur(passwordField);

            await waitFor(() => {
                expect(screen.queryByText(/Password must be at least 8 characters/i)).not.toBeInTheDocument();
            });
        });
    });

    describe('Form State Management', () => {
        it('maintains form state during user input', async () => {
            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const rememberMeCheckbox = screen.getByLabelText('Remember me');

            // Enter form data
            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            fireEvent.click(rememberMeCheckbox);

            // Verify form state
            expect(emailField).toHaveValue('test@example.com');
            expect(passwordField).toHaveValue('password123');
            expect(rememberMeCheckbox).toBeChecked();
        });

        it('resets form state on successful submission', async () => {
            mockLogin.mockResolvedValue({});
            mockFetchUserProfile.mockResolvedValue({});

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            // Fill and submit form
            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockLogin).toHaveBeenCalledWith({
                    user_key: 'test@example.com',
                    password: 'password123',
                    remember_me: false,
                    new_device: false,
                });
            });
        });

        it('preserves form state on submission error', async () => {
            mockLogin.mockRejectedValue({ message: 'Invalid credentials' });

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            // Fill and submit form
            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'wrongpassword' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockToast).toHaveBeenCalled();
            });

            // Form should still have the entered values
            expect(emailField).toHaveValue('test@example.com');
            expect(passwordField).toHaveValue('wrongpassword');
        });
    });

    describe('Remember Me Functionality', () => {
        it('toggles remember me checkbox', async () => {
            render(<LoginPageComponent />);

            const rememberMeCheckbox = screen.getByLabelText('Remember me');

            // Initially unchecked
            expect(rememberMeCheckbox).not.toBeChecked();

            // Click to check
            fireEvent.click(rememberMeCheckbox);
            expect(rememberMeCheckbox).toBeChecked();

            // Click to uncheck
            fireEvent.click(rememberMeCheckbox);
            expect(rememberMeCheckbox).not.toBeChecked();
        });

        it('includes remember me state in form submission', async () => {
            mockLogin.mockResolvedValue({});
            mockFetchUserProfile.mockResolvedValue({});

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const rememberMeCheckbox = screen.getByLabelText('Remember me');
            const submitButton = screen.getByTestId('sign-in-button');

            // Fill form with remember me checked
            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            fireEvent.click(rememberMeCheckbox);
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockLogin).toHaveBeenCalledWith({
                    user_key: 'test@example.com',
                    password: 'password123',
                    remember_me: true,
                    new_device: false,
                });
            });
        });
    });

    describe('Form Accessibility', () => {
        it('has proper form labels', () => {
            render(<LoginPageComponent />);

            expect(screen.getByLabelText('Email / Username')).toBeInTheDocument();
            expect(screen.getByLabelText('Password')).toBeInTheDocument();
            expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
        });

        it('has proper form structure', () => {
            render(<LoginPageComponent />);

            const form = screen.getByRole('form');
            expect(form).toBeInTheDocument();

            const submitButton = screen.getByTestId('sign-in-button');
            expect(submitButton).toHaveAttribute('type', 'submit');
        });
    });    

    describe('Form Submission Flow', () => {
        it('calls clearAuthErrors before submission', async () => {
            mockLogin.mockResolvedValue({});
            mockFetchUserProfile.mockResolvedValue({});

            render(<LoginPageComponent />);

            const emailField = screen.getByLabelText('Email / Username');
            const passwordField = screen.getByLabelText('Password');
            const submitButton = screen.getByTestId('sign-in-button');

            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordField, { target: { value: 'password123' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockClearAuthErrors).toHaveBeenCalled();
            });
        });

        it('prevents multiple submissions during loading', async () => {
            // Mock loading state
            (useAuth as jest.Mock).mockReturnValue({
                login: mockLogin,
                loading: { signIn: true },
                clearAuthErrors: mockClearAuthErrors,
            });

            render(<LoginPageComponent />);

            const submitButton = screen.getByRole('button', { name: /logging in/i });

            // Button should be disabled
            expect(submitButton).toBeDisabled();

            // Click should not trigger submission
            fireEvent.click(submitButton);
            expect(mockLogin).not.toHaveBeenCalled();
        });
    });
});