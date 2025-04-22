import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from "axios";
import { settings } from "@/configuration/config";
import { storage } from "@/utils/storage";


const baseURL: string | undefined = settings.API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": settings.API_KEY
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const accessToken = storage.getToken()?.access_token;

        const internalConfig: InternalAxiosRequestConfig = {
            ...config,
            headers: config.headers || {},
        };
        internalConfig.headers["x-api-key"] = settings.API_KEY;

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

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        const newAccessToken = response.headers["authorization"];

        if (newAccessToken) {
            const token = newAccessToken.replace("Bearer ", "");
            if (typeof window !== "undefined") {
                const prev_token = storage.getToken();
                if (!prev_token) {
                    window.location.replace('/auth/error?type=unauthorized');
                } else {
                    storage.setToken({ ...prev_token, access_token: token });
                }
            }
        }

        return response;
    },
    async (error: unknown) => {
        // Check if the error is an AxiosError
        if (!axios.isAxiosError(error) || !error.config) {
            return Promise.reject(error);
        }
        else if (error.status === 401 && !window.location.pathname.startsWith('/auth')) {
            storage.clearToken();
            storage.remove('user_details');
            window.location.replace('/auth/error?type=unauthorized');
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