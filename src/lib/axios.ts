import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://6983886f9c3efeb892a607f5.mockapi.io/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to read cookie
const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

// Guard to prevent duplicate 401 handling
let isHandling401 = false;

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isHandling401) {
      isHandling401 = true;
      toast.error("Session expired. Please login again.");

      if (typeof window !== "undefined") {
        document.cookie = "auth_token=; path=/; max-age=0";
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
