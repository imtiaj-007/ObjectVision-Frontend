import { authService } from '@/services/auth_service';
import { AuthResponse, LoginFormData, OTPSuccess, OTPUrlObj, OTPVerify, SignupFormData, SignupResponse } from '@/types/auth';
import { CustomError } from '@/types/general';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { setUser } from '../user/userSlice';


export const signupUser = createAsyncThunk<SignupResponse, SignupFormData, { rejectValue: CustomError }>(
    'auth/signup',
    async (data, { rejectWithValue }) => {
        try {
            return await authService.signup(data);
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

export const loginUser = createAsyncThunk<AuthResponse, LoginFormData, { rejectValue: CustomError }>(
    'auth/login',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const response = await authService.login(data);
            if (response.access_token) {
                localStorage.setItem("access_token", response.access_token ?? '');
                localStorage.setItem("token_type", response.token_type ?? '');
                localStorage.setItem("refresh_token", response.refresh_token ?? '');

                // Update Redux store
                dispatch(setUser(response.user));
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

export const verifyOtp = createAsyncThunk<OTPSuccess, OTPVerify, { rejectValue: CustomError }>(
    'auth/verifyOtp',
    async (data, { rejectWithValue }) => {
        try {
            return await authService.verifyOtp(data);
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

export const resendOtp = createAsyncThunk<OTPSuccess, OTPUrlObj, { rejectValue: CustomError }>(
    'auth/resendOtp',
    async (data, { rejectWithValue }) => {
        try {
            return await authService.resendOtp(data);
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