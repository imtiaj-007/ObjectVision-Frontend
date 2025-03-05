import { AxiosResponse } from "axios";
import axiosHandler from "@/utils/axios";
import { OrderResponse, PaymentOrderRequest, PaymentOrderResponse, PaymentVerificationRequest } from "@/types/payment";
import { SuccessResponse } from "@/types/general";
import { config } from "@/configuration/config";


export const PaymentService = {
    createOrder: async (payload: PaymentOrderRequest): Promise<PaymentOrderResponse> => {
        const response: AxiosResponse<PaymentOrderResponse> = await axiosHandler.post(`/payment/create-order`, payload);
        return response.data;
    },
    getUserOrders: async (user_id: number, page: number = config.DEFAULT_PAGE, limit: number = config.DEFAULT_PAGE_LIMIT): Promise<OrderResponse[]> => {
        const params = new URLSearchParams({ 
            page: page.toString(), 
            limit: limit.toString() 
        });
        const response: AxiosResponse<OrderResponse[]> = await axiosHandler.get(`/payment/orders/${user_id}?${params.toString()}`);
        return response.data;
    },
    verifyPayment: async (payload: PaymentVerificationRequest): Promise<SuccessResponse> => {
        const response: AxiosResponse<SuccessResponse> = await axiosHandler.post(`/payment/verify`, payload);
        return response.data;
    },
    fetchTransactionHistory: async (params: string): Promise<unknown> => {
        const response: AxiosResponse<unknown> = await axiosHandler.get(`/payment/history?${params}`);
        return response.data;
    },

    // Admin Routes
    getAllOrders: async (page: number = config.DEFAULT_PAGE, limit: number = config.DEFAULT_PAGE_LIMIT): Promise<OrderResponse[]> => {
        const params = new URLSearchParams({ 
            page: page.toString(), 
            limit: limit.toString() 
        });
        const response: AxiosResponse<OrderResponse[]> = await axiosHandler.get(`/payment/orders?${params.toString()}`);
        return response.data;
    },
};
