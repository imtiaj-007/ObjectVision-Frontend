import { UserDetails } from './user';

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
    token_type: string;
    refresh_token: string;
    user: UserDetails | null;
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

export interface AuthToken {
    access_token: string;
    refresh_token: string;
    token_type: string;
}