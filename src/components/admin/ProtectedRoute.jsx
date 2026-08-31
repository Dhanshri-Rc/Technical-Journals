import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../../services/authService";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return children;
}
