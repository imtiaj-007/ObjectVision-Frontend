import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '@/types/auth';
import { loginUser, resendOtp, signupUser, verifyOtp } from './authThunk';
import { CustomError } from '@/types/general';
import { storage } from '@/utils/storage';

export interface AuthState {
    isAuthenticated: boolean;
    loading: {
        signIn: boolean;
        signUp: boolean;
        verifyOTP: boolean;
        resendOTP: boolean;
        resetPassword: boolean;
    };
    error: CustomError | string | null;
    signupSuccess: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: {
        signIn: false,
        signUp: false,
        verifyOTP: false,
        resendOTP: false,
        resetPassword: false
    },
    error: null,
    signupSuccess: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        logout: (state) => {
            storage.clearToken();
            storage.remove('user_details');
            state.isAuthenticated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signupUser.pending, (state) => {
                state.loading.signUp = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.loading.signUp = false;
                state.signupSuccess = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading.signUp = false;
                state.error = action.payload as CustomError;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading.signIn = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                const { access_token, refresh_token, token_type } = action.payload;
                state.loading.signIn = false;
                storage.setToken({ access_token, refresh_token, token_type });
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading.signIn = false;
                state.error = action.payload as CustomError;
            })

            // OTP Verification
            .addCase(verifyOtp.pending, (state) => {
                state.loading.verifyOTP = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading.verifyOTP = false;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading.verifyOTP = false;
                state.error = action.payload as CustomError;
            })

            // Resend OTP
            .addCase(resendOtp.pending, (state) => {
                state.loading.resendOTP = true;
                state.error = null;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading.resendOTP = false;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.loading.resendOTP = false;
                state.error = action.payload as CustomError;
            });
    },
});

export const { setAuthState, logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;