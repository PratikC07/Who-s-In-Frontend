import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isInitializing } = useAuth();

  // 1. If still loading/initializing, don't redirect yet (prevents flash)
  if (isLoading || isInitializing) {
    return null; // Let GlobalLoadingOverlay handle the loading state
  }

  // 2. If check is done and user is not auth'd, redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. If check is done and user is auth'd, render the page
  return children;
};

export default PrivateRoute;
