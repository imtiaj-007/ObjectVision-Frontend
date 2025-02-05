import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from "axios";
import { config } from "@/configuration/config";


const baseURL: string | undefined = config.API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Before sending request, add token and Headers as required
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

        const internalConfig: InternalAxiosRequestConfig = {
            ...config,
            headers: config.headers || {},
        };

        if (accessToken) {
            internalConfig.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Handle FormData and multipart requests
        if (internalConfig.data instanceof FormData) {
            internalConfig.headers['Content-Type'] = 'multipart/form-data';
        }

        return internalConfig;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to check and store new access token
axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        const newAccessToken = response.headers["authorization"];

        if (newAccessToken) {
            const token = newAccessToken.replace("Bearer ", "");
            if (typeof window !== "undefined") {
                localStorage.setItem("access_token", token);
            }
        }

        return response;
    },
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.clear();
                window.location.href = "/auth/login";
            }
        }

        return Promise.reject(error);
    }
);


// Axios request handlers
const axiosHandler = {
    request: (config: AxiosRequestConfig) => axiosInstance.request(config),
    get: (url: string, config?: AxiosRequestConfig) => axiosInstance.get(url, config),
    post: (url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.post(url, data, config),
    put: (url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.put(url, data, config),
    patch: (url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.patch(url, data, config),
    delete: (url: string, config?: AxiosRequestConfig) => axiosInstance.delete(url, config),

    // Helper function for FormData requests
    postFormData: (url: string, formData: FormData, config: AxiosRequestConfig = {}) => {
        return axiosInstance.post(url, formData, {
            ...config,
            headers: {
                ...config.headers,
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default axiosHandler;
