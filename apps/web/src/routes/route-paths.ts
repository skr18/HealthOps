export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",

  doctors: {
    list: "/doctors",
    details: (doctorId: string | number) =>
      `/doctors/${doctorId}`,
  },

  medicines: {
    list: "/medicines",
    cart: "/cart",
  },

  profile: "/profile",

  admin: {
    dashboard: "/admin",
    doctorApprovals: "/admin/doctor-approvals",
  },
} as const;