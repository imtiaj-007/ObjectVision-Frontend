import { AxiosResponse } from "axios";
import axiosHandler from "@/utils/axios";
import {
    SignupResponse,
    AuthResponse,
    SignupFormData,
    LoginFormData,
    OTPVerify,
    OTPSuccess,
    OTPUrlObj
} from "@/types/auth";


export const authService = {
    signup: async (data: SignupFormData): Promise<SignupResponse> => {
        const response: AxiosResponse<SignupResponse> = await axiosHandler.post("/auth/signup", data);
        return response.data;
    },

    login: async (data: LoginFormData): Promise<AuthResponse> => {
        const response: AxiosResponse<AuthResponse> = await axiosHandler.post("/auth/login", data);
        return response.data;
    },

    verifyOtp: async (data: OTPVerify): Promise<OTPSuccess> => {
        const response: AxiosResponse<OTPSuccess> = await axiosHandler.post("/otp/verify", data);
        return response.data;
    },

    resendOtp: async (data: OTPUrlObj): Promise<OTPSuccess> => {
        const response: AxiosResponse<OTPSuccess> = await axiosHandler.post("/otp/resend", data);
        return response.data;
    }
};