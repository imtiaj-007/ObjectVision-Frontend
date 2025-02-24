import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomError, SuccessResponse } from '@/types/general';
import { UserInfoData, UserProfileDetails, UserUpdateProfile } from '@/types/user';
import { userService } from '@/services/user_services';
import { handleRejectResponse } from '@/utils/error_handler';


export const getUserProfile = createAsyncThunk< 
    UserProfileDetails, 
    void, 
    { rejectValue: CustomError } 
>(
    'user/getProfile',
    async ( _, { rejectWithValue }) => {
        try {
            const response = await userService.getProfile();
            return response;
        } catch (error) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);


export const getAllUsernames = createAsyncThunk< 
    Array<string>, 
    void, 
    { rejectValue: CustomError } 
>(
    'user/getUsernames',
    async ( _, { rejectWithValue }) => {
        try {
            const response = await userService.getUsernames();
            return response;
        } catch (error) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const updateUserProfile = createAsyncThunk< 
    SuccessResponse, 
    UserUpdateProfile, 
    { rejectValue: CustomError } 
>(
    'user/updateProfile',
    async ( payload, { rejectWithValue }) => {
        try {
            const response = await userService.updateProfile(payload);
            return response;            
        } catch (error) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const submitNewUserInfo = createAsyncThunk< 
    SuccessResponse, 
    UserInfoData, 
    { rejectValue: CustomError } 
>(
    'user/submitInfo',
    async ( payload: UserInfoData, { rejectWithValue }) => {
        try {
            const response = await userService.submitUserInfo(payload);
            return response;            
        } catch (error) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);
