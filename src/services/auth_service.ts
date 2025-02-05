import { AxiosResponse, isAxiosError } from "axios";
import axiosHandler from "@/utils/axios";
import { 
    AuthResponse, 
    SignupFormData, 
    LoginFormData     
} from "@/interfaces/auth";


export const signup = async (data: SignupFormData): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axiosHandler.post("/auth/signup", data);
        return response.data;
        
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error;
        }
        throw error;
    }
};

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axiosHandler.post("/auth/login", data);

        if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);            
        }
        return response.data;

    } catch (error: unknown) {
        if (isAxiosError(error)) {            
            throw error;
        }
        throw error;
    }
};
