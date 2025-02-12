import { CustomError } from './general';

// Auth State for Internal Use
export interface AuthState {
    token: string | null;
    token_type: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: CustomError | string | null;
    signupSuccess: boolean;
}

// Signup Response Type
export interface SignupResponse {
    status: string;
    message: string;
    user_id: string;
    email: string;
}

// Auth Response Type
export interface AuthResponse {
    access_token: string;
    token_type?: string;
}

// Signup Form Data Type
export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Login Form Data Type
export interface LoginFormData {
    user_key: string;
    password: string;
    remember_me: boolean;
    new_device: boolean;
}

// OTP URL Type
export interface OTPUrlObj {
    user_id: string;
    email: string;
}

// Verify OTP Type
export interface OTPVerify {
    user_id: string;
    email: string;
    otp: string;
}

// OTP Success Type
export interface OTPSuccess {
    status: string;
    message: string;
}