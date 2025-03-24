import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomError } from "@/types/general";
import { processImage } from "./detectionThunk";
import { ResultsStateResponse } from "@/types/predictions";
import { FormInformation } from "@/types/detection";


export interface DetectionState {
    image_form_data: FormInformation | null;
    image_history: Record<string, ResultsStateResponse>[];
    loading: boolean;
    error: CustomError | null;
}

const initialState: DetectionState = {
    image_form_data: null,
    image_history: [],
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
        setImageHistory: (state, action: PayloadAction<ResultsStateResponse>) => {
            state.image_history[action.payload.filename] = action.payload.results;
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
            })
            .addCase(processImage.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(processImage.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })
    },
});

export const { setImageFormData, setImageHistory, clearErrors } = detectionSlice.actions;
export default detectionSlice.reducer;
