import { WebSocketMessage } from '@/types/general';
import { ResultsStateResponse } from '@/types/predictions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProcessingState = {
    status: string;
    progress: number;
    data: ResultsStateResponse | null;
    taskId: string | null;
    error: string | null;
    messageHistory: WebSocketMessage[];
};


const initialProcessingState: ProcessingState = {
    status: "Waiting for connection...",
    progress: 0,
    data: null,
    taskId: null,
    error: null,
    messageHistory: [],
};

// Define the slice
const socketProcessingSlice = createSlice({
    name: 'processing',
    initialState: initialProcessingState,
    reducers: {
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        setProgress: (state, action: PayloadAction<{ progress: number; message?: string }>) => {
            state.progress = action.payload.progress;
            if (action.payload.message) {
                state.status = action.payload.message;
            }
        },
        setResults: (state, action: PayloadAction<ResultsStateResponse>) => {
            state.data = action.payload;
            state.status = "Processing complete";
            state.progress = 100;
        },
        setTaskId: (state, action: PayloadAction<string>) => {
            state.taskId = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        addMessage: (state, action: PayloadAction<WebSocketMessage>) => {
            state.messageHistory = [...state.messageHistory, action.payload];
        },
        resetSocketState: () => {
            return initialProcessingState;
        },
    },
});


export const {
    setStatus,
    setProgress,
    setResults,
    setTaskId,
    setError,
    addMessage,
    resetSocketState
} = socketProcessingSlice.actions;

export default socketProcessingSlice.reducer;