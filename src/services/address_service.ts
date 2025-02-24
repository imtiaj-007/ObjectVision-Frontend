import { AxiosResponse } from "axios";
import axiosHandler from "@/utils/axios";
import { Address, AddressResponse, SuccessResponse } from "@/types/general";


export const AddressService = {
    getAllAddress: async (): Promise<AddressResponse> => {
        const response: AxiosResponse<AddressResponse> = await axiosHandler.get(`/address`);
        return response.data;
    },
    getAllUserAddress: async (user_id: number | string): Promise<AddressResponse> => {
        const response: AxiosResponse<AddressResponse> = await axiosHandler.get(`/address/${user_id}`);
        return response.data;
    },
    createNewAddress: async (payload: Address): Promise<SuccessResponse> => {
        const response: AxiosResponse<SuccessResponse> = await axiosHandler.post(`/address/create`, payload);
        return response.data;
    },
    updateExistingAddress: async (address_id: number | string, payload: Address): Promise<SuccessResponse> => {
        const response: AxiosResponse<SuccessResponse> = await axiosHandler.put(`/address/update/${address_id}`, payload);
        return response.data;
    },
    deleteExistingAddress: async (address_id: number | string): Promise<SuccessResponse> => {
        const response: AxiosResponse<SuccessResponse> = await axiosHandler.delete(`/address/update/${address_id}`);
        return response.data;
    },
};
