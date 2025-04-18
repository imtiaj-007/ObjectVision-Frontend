import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomError } from "@/types/general";
import { getDetectionPredictions, processImage } from "./detectionThunk";
import { ResultsState, ResultsStateResponse } from "@/types/predictions";
import { FormInformation } from "@/types/detection";


export interface DetectionState {
    image_form_data: FormInformation | null;
    queued_image: ResultsState | null;
    total_image_count: number;
    cachedPages: Record<string, ResultsState[]>;
    loading: boolean;
    error: CustomError | null;
}

const initialState: DetectionState = {
    image_form_data: null,
    queued_image: null,
    total_image_count: 0,
    cachedPages: {},
    loading: false,
    error: null,
};


const detectionSlice = createSlice({
    name: "detection",
    initialState,
    reducers: {
        setImageFormData: (state, action: PayloadAction<FormInformation>) => {
            state.image_form_data = action.payload;
        },
        setQueuedImage: (state, action: PayloadAction<ResultsState>) => {
            state.queued_image = action.payload;
        },
        clearImageQueue: (state) => {
            state.queued_image = null;
        },
        clearCache: (state) => {
            state.cachedPages = {};
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Process Image
            .addCase(processImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(processImage.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(processImage.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })

            // Get Detection Results
            .addCase(getDetectionPredictions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDetectionPredictions.fulfilled, (state, action: PayloadAction<ResultsStateResponse>) => {
                if (action.payload.data && action.payload.data.length > 0) {
                    const { data, total_count, meta } = action.payload;
                    const cacheKey = `pageKey-${meta.page}-${meta.limit}`;
                    
                    state.cachedPages[cacheKey] = data;
                    state.total_image_count = total_count;
                }
                state.loading = false;
            })
            .addCase(getDetectionPredictions.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })
    },
});

export const { setImageFormData, setQueuedImage, clearImageQueue, clearCache, clearErrors } = detectionSlice.actions;
export default detectionSlice.reducer;
