import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomError } from "@/types/general";
import { PlanType } from "@/types/subscription";
import { getSubscriptions } from "./subscriptionThunk";


export interface SubscriptionState {
    subscriptionList: PlanType[] | null;
    loading: boolean;
    error: CustomError | string | null;
}

const initialState: SubscriptionState = {
    subscriptionList: null,
    loading: false,
    error: null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
            builder
                // Get Subscriptions
                .addCase(getSubscriptions.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getSubscriptions.fulfilled, (state, action: PayloadAction<PlanType[]>) => {
                    state.loading = false;
                    state.subscriptionList = action.payload;
                })
                .addCase(getSubscriptions.rejected, (state, action: PayloadAction<unknown>) => {
                    state.loading = false;
                    state.error = action.payload as CustomError;
                })
            },
});

export const { clearErrors } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
