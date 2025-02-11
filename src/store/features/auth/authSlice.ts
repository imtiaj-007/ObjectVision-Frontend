import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '@/types/auth';
import { loginUser, resendOtp, signupUser, verifyOtp } from './authThunk';
import { CustomError } from '@/types/general';


const initialState: AuthState = {
    token: 
        typeof window !== 'undefined' 
            ? localStorage.getItem('access_token') 
            : null,
    token_type: 
        typeof window !== 'undefined' 
            ? localStorage.getItem('token_type') 
            : null,
    isAuthenticated: 
        typeof window !== 'undefined' 
            ? localStorage.getItem('access_token') 
                ? true 
                : false 
            : false,
    loading: false,
    error: null,
    signupSuccess: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
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
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.loading = false;
                state.signupSuccess = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })

            // OTP Verification
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })

            // Resend OTP
            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            });
    },
});

export const { logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;