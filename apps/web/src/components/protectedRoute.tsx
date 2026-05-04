import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

export default function ProtectedRoute({ children }: any) {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}