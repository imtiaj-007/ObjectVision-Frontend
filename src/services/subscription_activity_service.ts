import { AxiosResponse } from "axios";
import axiosHandler from "@/utils/axios";
import { ActiveUserPlanResponse, UserActivityResponse } from "@/types/subscription_activity";


export const SubscriptionActivityService = {
    getAllUserPlans: async (): Promise<ActiveUserPlanResponse[]> => {
        const response: AxiosResponse<ActiveUserPlanResponse[]> = await axiosHandler.get(`/user-activity/plans`);
        return response.data;
    },
    getActiveUserPlans: async (is_active: boolean = true): Promise<ActiveUserPlanResponse[]> => {
        const response: AxiosResponse<ActiveUserPlanResponse[]> = await axiosHandler.get(`/user-activity/active-plans?is_active=${is_active}`);
        return response.data;
    },
    getUserActivities: async (): Promise<UserActivityResponse[]> => {
        const response: AxiosResponse<UserActivityResponse[]> = await axiosHandler.get(`/user-activity/activities`);
        return response.data;
    },
};
