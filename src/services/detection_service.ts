import { AxiosResponse } from "axios";
import axiosHandler from "@/utils/axios";
import { AddressResponse } from "@/types/general";


export const DetectionService = {
    establishSocketConnection: async(client_id: string): Promise<Record<string, unknown>> => {
        const response: AxiosResponse<Record<string, unknown>> = await axiosHandler.get(`/ws/${client_id}`);
        return response.data;
    },
    getAllUserAddress: async (user_id: number | string): Promise<AddressResponse> => {
        const response: AxiosResponse<AddressResponse> = await axiosHandler.get(`/address/${user_id}`);
        return response.data;
    },
    sendImageDetection: async (payload: FormData): Promise<Record<string, unknown>> => {
        const response: AxiosResponse<Record<string, unknown>> = await axiosHandler.postFormData(`/detection/image`, payload);
        return response.data;
    },    
};
