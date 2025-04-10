import { PathLike } from "fs";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import axiosHandler from "@/utils/axios";
import { PresignedUrlRequest, PresignedUrlResponse } from "@/types/predictions";


const blobConfig: AxiosRequestConfig = {
    responseType: 'blob'
};

export const FileService = {
    localPresignedURL: async (payload: PresignedUrlRequest): Promise<PresignedUrlResponse> => {
        const response: AxiosResponse<PresignedUrlResponse> = await axiosHandler.post(`/files/local/generate-presigned-url`, payload);
        return response.data;
    },
    localGetFile: async (file_path: PathLike): Promise<Blob> => {
        const response: AxiosResponse<Blob> = await axiosHandler.get(`/files/local/${file_path}`, blobConfig);
        return response.data;
    },
    downloadFile: async(file_path: PathLike): Promise<Blob> => {        
        const response: AxiosResponse = await axiosHandler.get(`/files/download/${file_path}`, blobConfig);
        return response.data;
    },
    cloudPresignedURL: async (payload: PresignedUrlRequest): Promise<PresignedUrlResponse> => {
        const response: AxiosResponse<PresignedUrlResponse> = await axiosHandler.post(`/files/cloud/generate-presigned-url`, payload);
        return response.data;
    },
};