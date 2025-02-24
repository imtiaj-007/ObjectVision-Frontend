import { CustomError } from "@/types/general";
import { isAxiosError } from "axios";

export const handleRejectResponse = (error: unknown): CustomError => {
    if (isAxiosError(error)) {
        return {
            message: error.response?.data?.message || error.message,
            status_code: error.response?.status || 500,
        };
    }
    return {
        message: 'An unexpected error occurred',
        status_code: 500,
    };
};