import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomError } from "@/types/general";
import { ActiveUserPlanResponse, UserActivityResponse } from "@/types/subscription_activity";
import { getActiveUserPlans, getUserActivities, getUserPlans } from "./subscriptionActivityThunk";


export interface SubscriptionActivityState {
    plansList: ActiveUserPlanResponse[] | null;
    activePlans: ActiveUserPlanResponse[] | null;
    userActivity: UserActivityResponse[] | null;
    loading: {
        planListLoading: boolean;
        activePlanLoading: boolean;
        userActivityLoading: boolean;
    }
    error: CustomError | null;
}

const initialState: SubscriptionActivityState = {
    plansList: null,
    activePlans: null,
    userActivity: null,
    loading: {
        planListLoading: false,
        activePlanLoading: false,
        userActivityLoading: false,
    },
    error: null,
};

const subscriptionActivitySlice = createSlice({
    name: "subscription_activity",
    initialState,
    reducers: {
        setActivePlan: (state) => {
            if (state.plansList && state.plansList.length > 0) {
                const activePlan = state.plansList.find(plan => plan.is_active);
                state.activePlans = activePlan ? [activePlan] : null;
            }
        },
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
            builder
                // Get User Plans
                .addCase(getUserPlans.pending, (state) => {
                    state.loading.planListLoading = true;
                    state.error = null;
                })
                .addCase(getUserPlans.fulfilled, (state, action: PayloadAction<ActiveUserPlanResponse[]>) => {
                    state.loading.planListLoading = false;
                    state.plansList = action.payload;
                })
                .addCase(getUserPlans.rejected, (state, action: PayloadAction<unknown>) => {
                    state.loading.planListLoading = false;
                    state.error = action.payload as CustomError;
                })

                // Get Active User Plans
                .addCase(getActiveUserPlans.pending, (state) => {
                    state.loading.activePlanLoading = true;
                    state.error = null;
                })
                .addCase(getActiveUserPlans.fulfilled, (state, action: PayloadAction<ActiveUserPlanResponse[]>) => {
                    state.loading.activePlanLoading = false;
                    state.activePlans = action.payload;
                })
                .addCase(getActiveUserPlans.rejected, (state, action: PayloadAction<unknown>) => {
                    state.loading.activePlanLoading = false;
                    state.error = action.payload as CustomError;
                })

                // Get User Activities
                .addCase(getUserActivities.pending, (state) => {
                    state.loading.userActivityLoading = true;
                    state.error = null;
                })
                .addCase(getUserActivities.fulfilled, (state, action: PayloadAction<UserActivityResponse[]>) => {
                    state.loading.userActivityLoading = false;
                    state.userActivity = action.payload;
                })
                .addCase(getUserActivities.rejected, (state, action: PayloadAction<unknown>) => {
                    state.loading.userActivityLoading = false;
                    state.error = action.payload as CustomError;
                })
            },
});

export const { clearErrors } = subscriptionActivitySlice.actions;
export default subscriptionActivitySlice.reducer;
