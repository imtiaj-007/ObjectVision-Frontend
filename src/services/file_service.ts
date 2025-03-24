import { PathLike } from "fs";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import axiosHandler from "@/utils/axios";
import { PresignedUrlRequest, PresignedUrlResponse } from "@/types/predictions";

export const FileService = {
    localPresignedURL: async (payload: PresignedUrlRequest): Promise<PresignedUrlResponse> => {
        const response: AxiosResponse<PresignedUrlResponse> = await axiosHandler.post(`/files/local/generate-presigned-url`, payload);
        return response.data;
    },
    localGetFile: async (file_path: PathLike): Promise<PathLike> => {
        const response: AxiosResponse<PathLike> = await axiosHandler.get(`/files/local/${file_path}`);
        return response.data;
    },
    downloadFile: async(file_path: PathLike): Promise<Blob> => {
        const config: AxiosRequestConfig = {
            responseType: 'blob'
        };
        
        const response: AxiosResponse = await axiosHandler.get(`/files/download/${file_path}`, config);
        return response.data;
    },
};