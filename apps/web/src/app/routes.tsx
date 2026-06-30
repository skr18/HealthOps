import type { ReactElement } from "react";
import type { UserRole } from "@/types/auth";

import HomePage from "@/pages/home-page";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import DashboardPage from "@/pages/dashboard";

import type { LucideIcon } from "lucide-react";

export interface AppRoute {

  path: string;

  element: ReactElement;

  title: string;

  isProtected?: boolean;

  roles?: UserRole[];

  showInSidebar?: boolean;
  
  icon?: LucideIcon;
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    title: "Home",
    element: <HomePage />,
  },

  {
    path: "/login",
    title: "Login",
    element: <LoginPage />,
  },

  {
    path: "/signup",
    title: "Signup",
    element: <SignupPage />,
  },

  {
    path: "/dashboard",
    title: "Dashboard",
    element: <DashboardPage />,

    isProtected: true,

    roles: ["ADMIN", "DOCTOR", "PATIENT"],

    showInSidebar: true,
  },
];