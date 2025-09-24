import React, { useEffect, useState } from "react";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import PollCreationPage from "./pages/PollCreationPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { PollResultPage } from "./pages/PollResultPage.jsx";
import { Toaster } from "react-hot-toast";
import PollResultPage2 from "./pages/PollResultPage2.jsx";
import VotePage from "./pages/VotePage.jsx";
import GlobalLoadingOverlay from "./components/GlobalLoadingOverlay.jsx";

const useToastPosition = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? "bottom-center" : "top-center";
};

const App = () => {
  const toastPosition = useToastPosition();

  return (
    <>
      <Routes>
        {/* ===================================================================== */}
        {/* PUBLIC ONLY ROUTES (Users are redirected away if logged in) */}
        {/* ===================================================================== */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* ===================================================================== */}
        {/* PRIVATE ONLY ROUTES (Users must be logged in to access) */}
        {/* ===================================================================== */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/poll-creation"
          element={
            <PrivateRoute>
              <PollCreationPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        {/* ===================================================================== */}
        {/* SHARED ROUTES (Accessible to EVERYONE, logged in or not) */}
        {/* ===================================================================== */}

        <Route path="/vote/:id" element={<VotePage />} />
        <Route path="/poll-result/:id" element={<PollResultPage />} />
        <Route path="/poll-result-closed/:id" element={<PollResultPage2 />} />
      </Routes>

      {/* Global Loading Overlay - shows during auth transitions */}
      <GlobalLoadingOverlay />
      {/* Add Toaster component */}
      <Toaster
        position={toastPosition}
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--neutral-800)",
            color: "var(--neutral-50)",
            border: "1px solid var(--neutral-700)",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 16px",
            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
          },
          success: {
            style: {
              background: "var(--neutral-800)",
              color: "var(--primary-500)",
              border: "1px solid var(--primary-500)",
              boxShadow:
                "0 4px 12px rgba(56, 224, 123, 0.25), 0 0 0 1px rgba(56, 224, 123, 0.1)",
            },
            iconTheme: {
              primary: "var(--primary-500)",
              secondary: "var(--neutral-800)",
            },
          },
          error: {
            style: {
              background: "var(--neutral-800)",
              color: "var(--danger-500)",
              border: "1px solid var(--danger-500)",
              boxShadow:
                "0 4px 12px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(239, 68, 68, 0.1)",
            },
            iconTheme: {
              primary: "var(--danger-500)",
              secondary: "var(--neutral-800)",
            },
          },
          loading: {
            style: {
              background: "var(--neutral-800)",
              color: "var(--neutral-200)",
              border: "1px solid var(--neutral-600)",
            },
          },
          info: {
            style: {
              background: "var(--neutral-800)",
              color: "var(--neutral-200)",
              border: "1px solid var(--neutral-600)",
              boxShadow:
                "0 4px 12px rgba(163, 163, 163, 0.25), 0 0 0 1px rgba(163, 163, 163, 0.1)",
            },
            iconTheme: {
              primary: "var(--neutral-400)",
              secondary: "var(--neutral-800)",
            },
          },
        }}
      />
    </>
  );
};

export default App;
