import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomError } from "@/types/general";
import { getCloudPresignedURL, getLocalPresignedURL } from "./fileThunk";
import { PresignedUrlResponse } from "@/types/predictions";


export interface FileState {
    presignedURLs: Record<string, PresignedUrlResponse>;
    fileURLs: Record<string, string>;
    loading: boolean;
    error: CustomError | null;
}

const initialState: FileState = {
    presignedURLs: {},
    fileURLs: {},
    loading: false,
    error: null,
};


const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        setFileURLs: (state, action: PayloadAction<string[]>) => {
            state.fileURLs[action.payload[0]] = action.payload[1];
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Generate local presigned URL
            .addCase(getLocalPresignedURL.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLocalPresignedURL.fulfilled, (state, action: PayloadAction<PresignedUrlResponse>) => {
                if(action.payload?.file_path) {
                    const outputPath = action.payload.file_path;
                    state.presignedURLs[outputPath] = action.payload;
                }
                state.loading = false;
            })
            .addCase(getLocalPresignedURL.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })

            // Generate cloud presigned URL
            .addCase(getCloudPresignedURL.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCloudPresignedURL.fulfilled, (state, action: PayloadAction<PresignedUrlResponse>) => {
                if(action.payload?.file_path) {
                    const outputPath = action.payload.file_path;
                    state.presignedURLs[outputPath] = action.payload;
                }
                state.loading = false;
            })
            .addCase(getCloudPresignedURL.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })
    },
});

export const { setFileURLs, clearErrors } = fileSlice.actions;
export default fileSlice.reducer;
