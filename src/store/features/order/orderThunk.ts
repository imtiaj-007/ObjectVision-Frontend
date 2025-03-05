import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaymentService } from "@/services/payment_service";
import { CustomError } from "@/types/general";
import { 
    OrderResponse,
    PaymentOrderRequest, PaymentOrderResponse
} from "@/types/payment";
import { handleRejectResponse } from "@/utils/error_handler";
import { config } from "@/configuration/config";


export const createOrder = createAsyncThunk<
    PaymentOrderResponse,
    PaymentOrderRequest,
    { rejectValue: CustomError }
>(
    "order/createOrder",
    async (orderData: PaymentOrderRequest, { rejectWithValue }) => {
        try {
            const response = await PaymentService.createOrder(orderData);
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const getOrdersOfUser = createAsyncThunk<
    OrderResponse[],
    Record<string, number>,
    { rejectValue: CustomError }
>(
    "order/userOrders",
    async ({ user_id, page = config.DEFAULT_PAGE, limit = config.DEFAULT_PAGE_LIMIT }, { rejectWithValue }) => {
        try {
            const response = await PaymentService.getUserOrders(user_id, page, limit);
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const getOrders = createAsyncThunk<
    OrderResponse[],
    Record<string, number>,
    { rejectValue: CustomError }
>(
    "order/allOrders",
    async ({ page = config.DEFAULT_PAGE, limit = config.DEFAULT_PAGE_LIMIT }, { rejectWithValue }) => {
        try {
            const response = await PaymentService.getAllOrders(page, limit);
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

