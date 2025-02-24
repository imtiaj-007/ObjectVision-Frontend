import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressResponse, AddressState } from '@/types/general';
import { fetchAddresses, fetchUserAddresses, createAddress, updateAddress, deleteAddress } from './addressThunk';


const initialState: AddressState = {
    addresses: [],
    totalCount: 0,
    loading: false,
    error: null,
    currentOperation: null,
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        clearAddressError: (state) => {
            state.error = null;
        },
        resetAddressState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Fetch Addresses
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOperation = 'fetch';
            })
            .addCase(fetchAddresses.fulfilled, (state, action: PayloadAction<AddressResponse>) => {
                state.addresses = action.payload.data;
                state.totalCount = action.payload.total_count || 0;
                state.loading = false;
                state.currentOperation = null;
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'Failed to fetch addresses', status_code: 500 };
                state.currentOperation = null;
            })

            // Fetch User Addresses
            .addCase(fetchUserAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOperation = 'fetch';
            })
            .addCase(fetchUserAddresses.fulfilled, (state, action: PayloadAction<AddressResponse>) => {
                state.addresses = action.payload.data;
                state.totalCount = action.payload.total_count || 0;
                state.loading = false;
                state.currentOperation = null;
            })
            .addCase(fetchUserAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'Failed to fetch user addresses', status_code: 500 };
                state.currentOperation = null;
            })

            // Create Address
            .addCase(createAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOperation = 'create';
            })
            .addCase(createAddress.fulfilled, (state) => {
                state.loading = false;
                state.currentOperation = null;
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'Failed to create address', status_code: 500 };
                state.currentOperation = null;
            })

            // Update Address
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOperation = 'update';
            })
            .addCase(updateAddress.fulfilled, (state) => {
                state.loading = false;
                state.currentOperation = null;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'Failed to update address', status_code: 500 };
                state.currentOperation = null;
            })

            // Delete Address
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentOperation = 'delete';
            })
            .addCase(deleteAddress.fulfilled, (state) => {
                state.loading = false;
                state.currentOperation = null;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'Failed to delete address', status_code: 500 };
                state.currentOperation = null;
            })
    },
});

export const { clearAddressError, resetAddressState } = addressSlice.actions;
export default addressSlice.reducer;
