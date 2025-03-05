import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/features/auth/authSlice';
import userReducer from '@/store/features/user/userSlice';
import userInfoReducer from '@/store/features/user/userInfoSlice';
import addressReducer from '@/store/features/address/addressSlice';
import paymentReducer from '@/store/features/payment/paymentSlice';
import orderReducer from '@/store/features/order/orderSlice';
import generalReducer from '@/store/features/subscription/SubscriptionSlice';
import subscriptionActivityReducer from '@/store/features/subscription_activity/subscriptionActivitySlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        userInfo: userInfoReducer,
        address: addressReducer,
        payment: paymentReducer,
        order: orderReducer,
        general: generalReducer,
        subscriptionActivity: subscriptionActivityReducer,        
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;