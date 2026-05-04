import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // backend url
});

// interceptor --> Runs before every request
api.interceptors.request.use((config) => { 
  const token = localStorage.getItem("token");

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