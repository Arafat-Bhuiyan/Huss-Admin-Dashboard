import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireRole({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
