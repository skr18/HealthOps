import axios from "axios";
import { getToken } from "@/lib/auth-storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor --> Runs before every request
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/*
Why axios instance?
reusable config
easier to attach token later
cleaner code

*/