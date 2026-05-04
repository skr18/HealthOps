import { api } from "./axios";

export const signup = (data: { email: string; password: string }) =>
  api.post("/auth/signup", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);