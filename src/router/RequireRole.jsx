import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireRole({ allowedRoles }) {
  const { user, access } = useSelector((state) => state.auth);
  const token = access || localStorage.getItem("access");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role;
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
