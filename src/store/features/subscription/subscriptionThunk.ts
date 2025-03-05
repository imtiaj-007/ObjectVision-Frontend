import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError } from "@/types/general";
import { handleRejectResponse } from "@/utils/error_handler";
import { PlanType } from "@/types/subscription";
import { SubscriptionService } from "@/services/subscription_service";


export const getSubscriptions = createAsyncThunk<
    PlanType[],
    void,
    { rejectValue: CustomError }
>(
    "general/getSubscriptions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await SubscriptionService.getAllSubscriptions();
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);



