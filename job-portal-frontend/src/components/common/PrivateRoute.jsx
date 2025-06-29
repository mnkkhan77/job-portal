import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // redirect to login, preserving origin
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // logged in ➜ render nested route
  return <Outlet />;
}
