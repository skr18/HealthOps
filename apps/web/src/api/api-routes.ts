export const API_ROUTES = {
  auth: {
    signup: "/api/v1/auth/signup",
    login: "/api/v1/auth/login",
    logout: "/api/v1/auth/logout",
    refresh: "/api/v1/auth/refresh",
    nicknameAvailability: "/api/v1/auth/nickname-availability",
  },

  doctors: {
    search: "/api/v1/doctors",
    list: "/api/v1/doctors",
    details: (doctorId: number) =>
      `/api/v1/doctors/${doctorId}`,
    approve: (doctorId: number) =>
      `/api/v1/doctors/${doctorId}/approve`
  },

  medicines: {
    list: "/api/v1/medicines",
    details: (medicineId: string | number) =>
      `/api/v1/medicines/${medicineId}`,
  },
} as const;