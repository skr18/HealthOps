import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { API_ROUTES } from "@/api/api-routes"

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({children,}: ProtectedRouteProps) {

  const user = useAppSelector((state) => state.auth.user);

  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={API_ROUTES.auth.login}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

// If you want a custom component to accept children, you have to explicitly define it so TypeScript knows what type of data is allowed to be passed inside it.

// Summary:

// DashboardLayout: You built it from scratch, so you must explicitly define children.

// Button: You extended a native HTML button, so it inherited children automatically.