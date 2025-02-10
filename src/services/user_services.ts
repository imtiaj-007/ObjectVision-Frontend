import { AxiosResponse, isAxiosError } from "axios";
import axiosHandler from "@/utils/axios";
import { 
    AuthResponse, 
    SignupFormData, 
} from "@/interfaces/auth";


export const signup = async (data: SignupFormData): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axiosHandler.post("/user/create", data);
        return response.data;
        
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error;
        }
        throw error;
    }
};