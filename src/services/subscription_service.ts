import { AxiosResponse } from "axios";
import axiosHandler from "@/utils/axios";
import { PlanType } from "@/types/subscription";


export const SubscriptionService = {
    getAllSubscriptions: async (): Promise<PlanType[]> => {
        const response: AxiosResponse<PlanType[]> = await axiosHandler.get(`/subscription/plans/details`);
        return response.data;
    },       
};
