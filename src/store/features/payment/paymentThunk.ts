import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaymentService } from "@/services/payment_service";
import { CustomError, SuccessResponse } from "@/types/general";
import { 
    PaymentHistoryRequest, PaymentOrderRequest, 
    PaymentOrderResponse, PaymentVerificationRequest 
} from "@/types/payment";
import { handleRejectResponse } from "@/utils/error_handler";


export const createOrder = createAsyncThunk<
    PaymentOrderResponse,
    PaymentOrderRequest,
    { rejectValue: CustomError }
>(
    "payment/createOrder",
    async (orderData: PaymentOrderRequest, { rejectWithValue }) => {
        try {
            const response = await PaymentService.createOrder(orderData);
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const verifyPayment = createAsyncThunk<
    SuccessResponse,
    PaymentVerificationRequest,
    { rejectValue: CustomError }
>(
    "payment/verifyPayment",
    async (verificationData: PaymentVerificationRequest, { rejectWithValue }) => {
        try {
            const response = await PaymentService.verifyPayment(verificationData);
            return response;
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const fetchPaymentHistory = createAsyncThunk<
    any,
    PaymentHistoryRequest,
    { rejectValue: CustomError }
>(
    "payment/fetchHistory",
    async (params: PaymentHistoryRequest, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(
                Object.entries(params)
                    .filter(([_, value]) => value !== undefined && value !== null)
                    .map(([key, value]) => [key, String(value)])
            ).toString();

            const response = await PaymentService.fetchTransactionHistory(queryString);
            return response.data;

        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);
