export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN"

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  nickname: string;
  email: string;
  password: string;
  role: UserRole;
  confirmPassword:string
}

export interface LoginResponse {
  access_token:string;
  user:AuthUser;
}

export interface AuthUser {
  userId: number;
  email: string;
  role: UserRole;
  expiresAt: number;
  nickname:string;
}