'use client';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearErrors } from '@/store/features/auth/authSlice';
import {
    loginUser,
    signupUser,
    verifyOtp,
    resendOtp
} from '@/store/features/auth/authThunk';
import type { AppDispatch, RootState } from '@/store/store';
import type {
    SignupFormData,
    LoginFormData,
    OTPVerify,
    OTPUrlObj
} from '@/types/auth';


export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        isAuthenticated,
        loading,
        error,
        signupSuccess
    } = useSelector((state: RootState) => state.auth);

    // Signup handler
    const signup = useCallback(async (data: SignupFormData) => {
        try {
            const result = await dispatch(signupUser(data)).unwrap();
            return result;
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    // Login handler
    const login = useCallback(async (data: LoginFormData) => {
        try {
            const result = await dispatch(loginUser(data)).unwrap();
            return result;
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    // OTP verification handler
    const verifyOTP = useCallback(async (data: OTPVerify) => {
        try {
            const result = await dispatch(verifyOtp(data)).unwrap();
            return result;
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    // Resend OTP handler
    const resendOTP = useCallback(async (data: OTPUrlObj) => {
        try {
            const result = await dispatch(resendOtp(data)).unwrap();
            return result;
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    // Logout handler
    const logoutUser = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    // Clear any auth-related errors
    const clearAuthErrors = useCallback(() => {
        dispatch(clearErrors());
    }, [dispatch]);

    // Check if user is authenticated
    const checkAuth = useCallback(() => {
        return isAuthenticated;
    }, [isAuthenticated]);

    // Get access token
    const getAccessToken = useCallback(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('access_token');
        }
        return null;
    }, []);

    return {
        // State
        isAuthenticated,
        loading,
        error,
        signupSuccess,

        // Methods
        signup,
        login,
        verifyOTP,
        resendOTP,
        logoutUser,
        clearAuthErrors,
        checkAuth,
        getAccessToken,
    };
};