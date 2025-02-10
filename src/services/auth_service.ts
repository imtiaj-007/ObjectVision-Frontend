import { AxiosResponse, isAxiosError } from "axios";
import axiosHandler from "@/utils/axios";
import { 
    SignupResponse,
    AuthResponse, 
    SignupFormData, 
    LoginFormData,     
    OTPVerify,
    OTPSuccess,
    OTPUrlObj
} from "@/interfaces/auth";


export const signup = async (data: SignupFormData): Promise<SignupResponse> => {
    try {
        const response: AxiosResponse<SignupResponse> = await axiosHandler.post("/auth/signup", data);
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

export const verify_otp = async (data: OTPVerify): Promise<OTPSuccess> => {
    try {
        const response: AxiosResponse<OTPSuccess> = await axiosHandler.post("/otp/verify", data);
        return response.data;
        
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error;
        }
        throw error;
    }
};

export const resend_otp = async (data: OTPUrlObj): Promise<OTPSuccess> => {
    try {
        const response: AxiosResponse<OTPSuccess> = await axiosHandler.post("/otp/resend", data);
        return response.data;
        
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw error;
        }
        throw error;
    }
};