import { PathLike } from 'fs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomError } from '@/types/general';
import { handleRejectResponse } from '@/utils/error_handler';
import { PresignedUrlRequest, PresignedUrlResponse } from '@/types/predictions';
import { FileService } from '@/services/file_service';


export const getLocalPresignedURL = createAsyncThunk<
    PresignedUrlResponse,
    PresignedUrlRequest,
    { rejectValue: CustomError }
>(
    'detection/localPresignedURL',
    async (payload, { rejectWithValue }) => {
        try {
            return await FileService.localPresignedURL(payload);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const getLocalFile = createAsyncThunk<
    Blob,
    PathLike,
    { rejectValue: CustomError }
>(
    'detection/getlocalFile',
    async (file_path, { rejectWithValue }) => {
        try {
            return await FileService.localGetFile(file_path);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const downloadFile = createAsyncThunk<
    Blob,
    PathLike,
    { rejectValue: CustomError }
>(
    'detection/downloadFile',
    async (file_path, { rejectWithValue }) => {
        try {
            return await FileService.downloadFile(file_path);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const getCloudPresignedURL = createAsyncThunk<
    PresignedUrlResponse,
    PresignedUrlRequest,
    { rejectValue: CustomError }
>(
    'detection/cloudPresignedURL',
    async (payload, { rejectWithValue }) => {
        try {
            return await FileService.cloudPresignedURL(payload);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);