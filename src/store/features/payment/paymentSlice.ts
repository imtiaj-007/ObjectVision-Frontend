import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isRazorpayPaymentDetails, PaymentOrderResponse, RazorpayPaymentDetails } from "@/types/payment";
import { createOrder, fetchPaymentHistory, verifyPayment } from "./paymentThunk";
import { CustomError, SuccessResponse } from "@/types/general";


export interface PaymentState {
    currentOrder: PaymentOrderResponse | null;
    paymentResult: RazorpayPaymentDetails | null;
    paymentHistory: Array<unknown>;
    loading: {
        createOrder: boolean;
        verifyPayment: boolean;
        fetchHistory: boolean;
    };
    error: {
        createOrder: CustomError | string | undefined | null;
        verifyPayment: CustomError | string | undefined | null;
        fetchHistory: CustomError | string | undefined | null;
    };
}

const initialState: PaymentState = {
    currentOrder: null,
    paymentResult: null,
    paymentHistory: [],
    loading: {
        createOrder: false,
        verifyPayment: false,
        fetchHistory: false,
    },
    error: {
        createOrder: null,
        verifyPayment: null,
        fetchHistory: null,
    },
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        resetPaymentState: (state) => {
            state.currentOrder = null;
            state.paymentResult = null;
            state.error = {
                createOrder: null,
                verifyPayment: null,
                fetchHistory: null,
            };
        },
        clearErrors: (state) => {
            state.error = {
                createOrder: null,
                verifyPayment: null,
                fetchHistory: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading.createOrder = true;
                state.error.createOrder = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<PaymentOrderResponse>) => {
                state.loading.createOrder = false;
                state.currentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading.createOrder = false;
                state.error.createOrder = action.payload as CustomError;
            })

            // Verify Payment
            .addCase(verifyPayment.pending, (state) => {
                state.loading.verifyPayment = true;
                state.error.verifyPayment = null;
            })
            .addCase(verifyPayment.fulfilled, (state, action: PayloadAction<SuccessResponse>) => {
                state.loading.verifyPayment = false;
                if(isRazorpayPaymentDetails(action.payload.extra_data))
                    state.paymentResult = action.payload.extra_data;  
                state.currentOrder = null;              
            })
            .addCase(verifyPayment.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading.verifyPayment = false;
                state.error.verifyPayment = action.payload as CustomError;
            })

            // Fetch Payment History
            .addCase(fetchPaymentHistory.pending, (state) => {
                state.loading.fetchHistory = true;
                state.error.fetchHistory = null;
            })
            .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
                state.loading.fetchHistory = false;
                state.paymentHistory = action.payload;
            })
            .addCase(fetchPaymentHistory.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading.fetchHistory = false;
                state.error.fetchHistory = action.payload as CustomError;
            });
    },
});

export const { resetPaymentState, clearErrors } = paymentSlice.actions;
export default paymentSlice.reducer;
