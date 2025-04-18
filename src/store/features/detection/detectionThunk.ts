import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomError } from '@/types/general';
import { handleRejectResponse } from '@/utils/error_handler';
import { DetectionService } from '@/services/detection_service';
import { ResultsStateResponse } from '@/types/predictions';
import { DetectionResultsParams } from '@/types/detection';


export const createSocketConnection = createAsyncThunk<
    Record<string, unknown>,
    string,
    { rejectValue: CustomError }
>(
    'detection/socketConnection',
    async (client_id, { rejectWithValue }) => {
        try {
            return await DetectionService.establishSocketConnection(client_id);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const getDetectionPredictions = createAsyncThunk<
    ResultsStateResponse,
    DetectionResultsParams,
    { rejectValue: CustomError }
>(
    'detection/getPredictions',
    async (params, { rejectWithValue }) => {
        try {
            return await DetectionService.getDetectionResults(params);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);

export const processImage = createAsyncThunk<
    Record<string, unknown>,
    FormData,
    { rejectValue: CustomError }
>(
    'detection/imageDetection',
    async (form_data, { rejectWithValue }) => {
        try {
            return await DetectionService.sendImageDetection(form_data);
        } catch (error: unknown) {
            return rejectWithValue(handleRejectResponse(error));
        }
    }
);
