import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderResponse, PaymentOrderResponse } from "@/types/payment";
import { CustomError } from "@/types/general";
import { createOrder, getOrders, getOrdersOfUser } from "./orderThunk";


export interface OrderState {
    currentOrder: PaymentOrderResponse | null;
    allOrders: OrderResponse[] | null;
    userOrders: OrderResponse[] | null;
    loading: {
        currentOrder: boolean;
        allOrders: boolean;
        userOrders: boolean;
    };
    error: {
        currentOrder: CustomError | null;
        allOrders: CustomError | null;
        userOrders: CustomError | null;
    };
}

const initialState: OrderState = {
    currentOrder: null,
    allOrders: null,
    userOrders: null,
    loading: {
        currentOrder: false,
        allOrders: false,
        userOrders: false,
    },
    error: {
        currentOrder: null,
        allOrders: null,
        userOrders: null,
    },
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {        
        clearErrors: (state) => {
            state.error = {
                currentOrder: null,
                allOrders: null,
                userOrders: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading.currentOrder = true;
                state.error.currentOrder = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<PaymentOrderResponse>) => {
                state.loading.currentOrder = false;
                state.currentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading.currentOrder = false;
                state.error.currentOrder = action.payload as CustomError;
            })

            // Get User Orders
            .addCase(getOrdersOfUser.pending, (state) => {
                state.loading.userOrders = true;
                state.error.userOrders = null;
            })
            .addCase(getOrdersOfUser.fulfilled, (state, action: PayloadAction<OrderResponse[]>) => {
                state.loading.userOrders = false;
                state.userOrders = action.payload;
            })
            .addCase(getOrdersOfUser.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading.userOrders = false;
                state.error.userOrders = action.payload as CustomError;
            })
            
            // Get All Orders
            .addCase(getOrders.pending, (state) => {
                state.loading.allOrders = true;
                state.error.allOrders = null;
            })
            .addCase(getOrders.fulfilled, (state, action: PayloadAction<OrderResponse[]>) => {
                state.loading.allOrders = false;
                state.allOrders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading.allOrders = false;
                state.error.allOrders = action.payload as CustomError;
            })
            
    },
});

export const { clearErrors } = orderSlice.actions;
export default orderSlice.reducer;
