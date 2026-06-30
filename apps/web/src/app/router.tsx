import { Routes, Route } from "react-router-dom";

import { appRoutes } from "./routes";

import ProtectedRoute from  "@/routes/protectedRoute"

import { DashboardLayout } from "../components/layout/dashboard-layout";

export function AppRouter() {
  return (
    <Routes>

      {/* Public Routes */}

      {appRoutes
        .filter(route => !route.isProtected)
        .map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {appRoutes
          .filter(route => route.isProtected)
          .map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
      </Route>

    </Routes>
  );
}