import axios from "axios";
import { refreshAccessToken } from "../auth/services/authService";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api/v1"
});


import { showErrorToast } from "../utils/toastService";

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

const onRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        showErrorToast("Request error. Please try again.");
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (status === 401 && !originalRequest?._retry) {
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                originalRequest._retry = true;

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const data = await refreshAccessToken(refreshToken);
                        if (data.accessToken) {
                            localStorage.setItem("accessToken", data.accessToken);
                        }
                        if (data.refreshToken) {
                            localStorage.setItem("refreshToken", data.refreshToken);
                        }
                        onRefreshed(data.accessToken || localStorage.getItem("accessToken"));
                    } catch (refreshError) {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("user");
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }

                return new Promise((resolve, reject) => {
                    subscribeTokenRefresh((token) => {
                        if (!token) {
                            reject(error);
                            return;
                        }
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosClient(originalRequest));
                    });
                });
            }
        }

        if (error.response) {
            return Promise.reject(error);
        }

        const message = error.message || "Network error. Please check your connection.";
        showErrorToast(message, error.details || null);
        return Promise.reject(error);
    }
);

export default axiosClient