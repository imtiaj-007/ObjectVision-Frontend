import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomError } from '@/types/general';
import { getUserProfile } from './userThunk';
import { UserProfileDetails } from '@/types/user';


export interface UserState {
    loading: boolean;
    error: CustomError | string | null;
    user_details: UserProfileDetails | null;
    user_activity: Record<string, unknown> | null;
}


const initialState: UserState = {    
    loading: false,
    error: null,
    user_details: typeof window !== 'undefined' ? (() => {
        try {
            const storedUser = localStorage.getItem('user_details');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.log("Error parsing user from localStorage:", error);
            return null;
        }
    })() : null,
    user_activity: null,
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {        
        setUser: (state, action: PayloadAction<UserProfileDetails | null>) => {
            state.user_details = action.payload;
            localStorage.setItem("user_details", JSON.stringify(action.payload));
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
                state.user_details = action.payload;
                localStorage.setItem("user_details", JSON.stringify(action.payload));
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            });
    },        
});
    
export const { setUser, clearErrors } = userSlice.actions;
export default userSlice.reducer;
