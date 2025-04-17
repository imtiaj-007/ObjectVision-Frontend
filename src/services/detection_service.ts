import { AxiosResponse } from "axios";
import axiosHandler from "@/utils/axios";
import { ResultsStateResponse } from "@/types/predictions";
import { DetectionResultsParams } from "@/types/detection";



export const DetectionService = {
    establishSocketConnection: async (client_id: string): Promise<Record<string, unknown>> => {
        const response: AxiosResponse<Record<string, unknown>> = await axiosHandler.get(`/ws/${client_id}`);
        return response.data;
    },
    getDetectionResults: async (params: DetectionResultsParams): Promise<ResultsStateResponse> => {
        const req_params = new URLSearchParams({
            page: params.page.toString(),
            limit: params.limit.toString()
        });
        const response: AxiosResponse<ResultsStateResponse> = await axiosHandler.get(`/detection/?${req_params.toString()}`);
        return { ...response.data, meta: params };
    },
    sendImageDetection: async (payload: FormData): Promise<Record<string, unknown>> => {
        const response: AxiosResponse<Record<string, unknown>> = await axiosHandler.postFormData(`/detection/image`, payload);
        return response.data;
    },
};
