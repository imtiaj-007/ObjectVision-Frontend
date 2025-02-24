import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomError } from '@/types/general';
import { getUserProfile } from './userThunk';
import { UserDetails, UserState } from '@/types/user';

const initialState: UserState = {    
    loading: false,
    error: null,
    user: typeof window !== 'undefined' ? (() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.log("Error parsing user from localStorage:", error);
            return null;
        }
    })() : null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {        
        setUser: (state, action: PayloadAction<UserDetails | null>) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get User Profile
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            });
    },        
});
    
export const { setUser, clearErrors } = userSlice.actions;
export default userSlice.reducer;
