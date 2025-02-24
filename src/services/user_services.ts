import { AxiosResponse } from "axios";
import axiosHandler from "@/utils/axios";
import { UserInfoData, UserProfileDetails, UserUpdateProfile } from "@/types/user";
import { SuccessResponse } from "@/types/general";


export const userService = {
    getProfile: async (): Promise<UserProfileDetails> => {
        const response: AxiosResponse<UserProfileDetails> = await axiosHandler.get("/user/get-profile");
        return response.data;
    },
    getUsernames: async (): Promise<Array<string>> => {
        const response: AxiosResponse<Array<string>> = await axiosHandler.get("/user/get-usernames");
        return response.data;
    },
    updateProfile: async (payload: UserUpdateProfile): Promise<SuccessResponse> => {
        const response: AxiosResponse<SuccessResponse> = await axiosHandler.put("/user/update-profile", payload);
        return response.data;
    },
    submitUserInfo: async (payload: UserInfoData): Promise<SuccessResponse> => {
        const response: AxiosResponse<SuccessResponse> = await axiosHandler.post("/user/newUser-info", payload);
        return response.data;
    }
};
