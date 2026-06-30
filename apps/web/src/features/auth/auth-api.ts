import { api } from "@/api/axios";
import type {
  LoginRequest,
  SignupRequest,
  LoginResponse
} from "@/types/auth";

import { API_ROUTES } from "@/api/api-routes"

export const signup = (data: SignupRequest) =>
  api.post(API_ROUTES.auth.signup, data);

export const login = (data: LoginRequest) =>
  api.post<LoginResponse>(API_ROUTES.auth.login, data);

export const checkNickname  = (nickname:string) =>
  api.get<{ available: boolean }>(API_ROUTES.auth.nicknameAvailability,{ params:{nickname}});