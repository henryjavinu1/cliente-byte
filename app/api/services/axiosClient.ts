import axios from "axios";
import { refreshToken } from "./auth.service";

export const api = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshedToken = await refreshToken();

        if (typeof window !== "undefined") {
          localStorage.setItem("token", refreshedToken);
        }
        api.defaults.headers["Authorization"] = `Bearer ${refreshedToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Error al refrescar token", refreshError);
      }
    }

    return Promise.reject(error);
  }
);
