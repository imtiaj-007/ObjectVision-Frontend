import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/features/auth/authSlice'
import userReducer from '@/store/features/user/userSlice'
import userInfoReducer from '@/store/features/user/userInfoSlice'
import addressReducer from '@/store/features/address/addressSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        userInfo: userInfoReducer,
        address: addressReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;