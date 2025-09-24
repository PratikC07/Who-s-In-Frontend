import React from "react";
import Loader from "./Loader.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Header from "./Header.jsx";

const GlobalLoadingOverlay = () => {
  const { isInitializing, isLoggingIn, isLoggingOut, isLoading } = useAuth();

  // REFINED LOGIC: Show overlay for FULL APP transitions and brief login transitions
  // This prevents flashing during auth state changes
  const shouldShowOverlay =
    isInitializing || isLoggingOut || (isLoggingIn && isLoading);

  // Show overlay during initialization, logout, and login completion
  // Login form still shows its own button loading state, but overlay handles final transition

  if (!shouldShowOverlay) {
    return null;
  }

  console.log(isInitializing, isLoggingIn, isLoggingOut, isLoading);

  // Determine the loading message based on the current operation
  const getLoadingMessage = () => {
    if (isInitializing) return "";
    if (isLoggingOut) return "Signing you out...";
    if (isLoggingIn) return "Signing you in...";
    return "Loading...";
  };

  // Determine if we should show header (not during logout or login completion)
  const showHeader = !isLoggingOut && !isLoggingIn;

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--neutral-900)] flex flex-col">
      {/* Optional Header during initialization and login */}
      {showHeader && isInitializing && <Header />}

      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xs z-10 flex items-center justify-center">
        <div className="text-center ">
          <Loader text={getLoadingMessage()} />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoadingOverlay;
