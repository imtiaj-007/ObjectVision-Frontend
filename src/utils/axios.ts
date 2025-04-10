import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from "axios";
import { settings } from "@/configuration/config";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}
const baseURL: string | undefined = settings.API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": settings.API_KEY
    },
});

const refreshInstance = axios.create({
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
        const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

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
                localStorage.setItem("access_token", token);
            }
        }

        return response;
    },
    async (error: unknown) => {
        // Check if the error is an AxiosError
        if (!axios.isAxiosError(error) || !error.config) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as CustomAxiosRequestConfig;

        // Check if the error is a 401 and the request hasn't been retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the access token
                const refreshResponse = await refreshInstance.get("/auth/refresh_token");
                const newAccessToken = refreshResponse.data.access_token;

                if (newAccessToken) {
                    localStorage.setItem("access_token", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest); // Retry the original request
                }
            } catch (refreshError: unknown) {
                // If refresh fails, redirect to login
                if (typeof window !== "undefined") {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = "/auth/login";
                    return Promise.reject(refreshError);
                }
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