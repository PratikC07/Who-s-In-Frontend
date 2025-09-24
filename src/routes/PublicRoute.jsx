import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isInitializing } = useAuth();

  // 1. If still loading/initializing, don't redirect yet (prevents flash)
  if (isLoading || isInitializing) {
    return null; // Let GlobalLoadingOverlay handle the loading state
  }

  // 2. If check is done and user IS auth'd, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. If check is done and user is NOT auth'd, show the public page
  return children;
};

export default PublicRoute;
