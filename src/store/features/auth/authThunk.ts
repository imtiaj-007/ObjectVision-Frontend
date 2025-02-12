import { authService } from '@/services/auth_service';
import { AuthResponse, LoginFormData, OTPSuccess, OTPUrlObj, OTPVerify, SignupFormData, SignupResponse } from '@/types/auth';
import { CustomError } from '@/types/general';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';


export const signupUser = createAsyncThunk< SignupResponse, SignupFormData, { rejectValue: CustomError } >(
    'auth/signup',
    async (data: SignupFormData, { rejectWithValue }) => {
        try {
            const response = await authService.signup(data);
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue({
                    message: error.response?.data?.message || error.message,
                    status_code: error.response?.status || 500,
                });
            }
            return rejectWithValue({
                message: 'An unexpected error occurred',
                status_code: 500,
            });
        }
    }
);

export const loginUser = createAsyncThunk< AuthResponse, LoginFormData, { rejectValue: CustomError } >(
    'auth/login',
    async (data: LoginFormData, { rejectWithValue }) => {
        try {
            const response = await authService.login(data);
            if (response.access_token) {
                localStorage.setItem("access_token", response.access_token);
                if (response.token_type)
                    localStorage.setItem("token_type", response.token_type);
            }
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue({
                    message: error.response?.data?.message || error.message,
                    status_code: error.response?.status || 500,
                });
            }
            return rejectWithValue({
                message: 'An unexpected error occurred',
                status_code: 500,
            });
        }
    }
);

export const verifyOtp = createAsyncThunk< OTPSuccess, OTPVerify, { rejectValue: CustomError } >(
    'auth/verifyOtp',
    async (data: OTPVerify, { rejectWithValue }) => {
        try {
            const response = await authService.verifyOtp(data);
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue({
                    message: error.response?.data?.message || error.message,
                    status_code: error.response?.status || 500,
                });
            }
            return rejectWithValue({
                message: 'An unexpected error occurred',
                status_code: 500,
            });
        }
    }
);

export const resendOtp = createAsyncThunk< OTPSuccess, OTPUrlObj, { rejectValue: CustomError } >(
    'auth/resendOtp',
    async (data: OTPUrlObj, { rejectWithValue }) => {
        try {
            const response = await authService.resendOtp(data);
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue({
                    message: error.response?.data?.message || error.message,
                    status_code: error.response?.status || 500,
                });
            }
            return rejectWithValue({
                message: 'An unexpected error occurred',
                status_code: 500,
            });
        }
    }
);