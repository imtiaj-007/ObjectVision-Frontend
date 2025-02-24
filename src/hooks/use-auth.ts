'use client';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearErrors } from '@/store/features/auth/authSlice';
import { loginUser, signupUser, verifyOtp, resendOtp } from '@/store/features/auth/authThunk';
import type { AppDispatch, RootState } from '@/store/store';
import type { SignupFormData, LoginFormData, OTPVerify, OTPUrlObj } from '@/types/auth';


export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);

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

    // Get access token
    const getAccessToken = useCallback(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('access_token');
        }
        return null;
    }, []);

    return useMemo(() => ({
        ...authState,
        signup, login, verifyOTP, resendOTP,
        logoutUser: ()=> dispatch(logout()),
        clearAuthErrors: ()=> dispatch(clearErrors()),
        checkAuth: ()=> authState.isAuthenticated,
        getAccessToken,
    }), [authState, signup, login, verifyOTP, resendOTP, getAccessToken, dispatch]);
};