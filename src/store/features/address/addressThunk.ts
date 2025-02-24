import { createAsyncThunk } from '@reduxjs/toolkit';
import { Address, AddressResponse, SuccessResponse, CustomError } from '@/types/general';
import { handleRejectResponse } from '@/utils/error_handler';
import { AddressService } from '@/services/address_service';

// Fetch all addresses
export const fetchAddresses = createAsyncThunk<
    AddressResponse,
    void,
    { rejectValue: CustomError }
>(
    'addresses/fetchAddresses',
    async (_, { rejectWithValue }) => {
        try {
            return await AddressService.getAllAddress();
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

// Fetch addresses for a specific user
export const fetchUserAddresses = createAsyncThunk<
    AddressResponse,
    number | string,
    { rejectValue: CustomError }
>(
    'addresses/fetchUserAddresses',
    async (userId, { rejectWithValue }) => {
        try {
            return await AddressService.getAllUserAddress(userId);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

// Create a new address
export const createAddress = createAsyncThunk<
    SuccessResponse,
    Address,
    { rejectValue: CustomError }
>(
    'addresses/createAddress',
    async (address, { rejectWithValue }) => {
        try {
            return await AddressService.createNewAddress(address);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

// Update an address
export const updateAddress = createAsyncThunk<
    SuccessResponse,
    { addressId: number | string; payload: Address },
    { rejectValue: CustomError }
>(
    'addresses/updateAddress',
    async ({ addressId, payload }, { rejectWithValue }) => {
        try {
            return await AddressService.updateExistingAddress(addressId, payload);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

// Delete an address
export const deleteAddress = createAsyncThunk<
    SuccessResponse,
    number | string,
    { rejectValue: CustomError }
>(
    'addresses/deleteAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            return await AddressService.deleteExistingAddress(addressId);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);