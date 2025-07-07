import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./../../hooks/auth/useAuth";

export default function AdminRoute() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
