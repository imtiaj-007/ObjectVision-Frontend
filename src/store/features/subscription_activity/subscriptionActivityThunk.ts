import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError } from "@/types/general";
import { handleRejectResponse } from "@/utils/error_handler";
import { ActiveUserPlanResponse, UserActivityResponse } from "@/types/subscription_activity";
import { SubscriptionActivityService } from "@/services/subscription_activity_service";


export const getUserPlans = createAsyncThunk<
    ActiveUserPlanResponse[],
    void,
    { rejectValue: CustomError }
>(
    "activity/getUserPlans",
    async (_, { rejectWithValue }) => {
        try {
            const response = await SubscriptionActivityService.getAllUserPlans();
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const getActiveUserPlans = createAsyncThunk<
    ActiveUserPlanResponse[],
    boolean,
    { rejectValue: CustomError }
>(
    "activity/geActivetUserPlans",
    async (is_active: boolean = true, { rejectWithValue }) => {
        try {
            const response = await SubscriptionActivityService.getActiveUserPlans(is_active);
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const getUserActivities = createAsyncThunk<
    UserActivityResponse[],
    void,
    { rejectValue: CustomError }
>(
    "activity/getUserActivities",
    async (_, { rejectWithValue }) => {
        try {
            const response = await SubscriptionActivityService.getUserActivities();
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);
