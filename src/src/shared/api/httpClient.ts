import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

// Token management in memory
let accessToken: string | null = null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};
export const clearAccessToken = () => {
  accessToken = null;
};

// Create axios instance
export const httpClient = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Refresh state
let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

const processQueue = (token: string | null) => {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
};

// Request interceptor - attach token
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle 401 with refresh queue
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't retry on auth endpoints themselves
      const url = originalRequest.url || "";
      if (url.includes("/auth/login") || url.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue request until refresh completes
        return new Promise((resolve, reject) => {
          refreshQueue.push((token: string | null) => {
            if (token) {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(httpClient(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        // Try refresh
        const response = await httpClient.post<{ accessToken: string }>(
          "/auth/refresh",
        );
        const newToken = response.data.accessToken;

        setAccessToken(newToken);
        processQueue(newToken);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear token and queue
        clearAccessToken();
        processQueue(null);

        // Trigger logout from auth context if available
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:logout"));
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
