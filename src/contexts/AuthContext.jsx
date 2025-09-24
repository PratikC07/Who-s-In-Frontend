// src/contexts/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../api/auth";
import { getMyProfile } from "../api/user";
import { setAuthToken, clearAuthToken } from "../api/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { getAllUserPolls } from "../api/polls";

// 1. Define the initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start as true to check for existing token
  isInitializing: true, // Separate state for initial app load
  isLoggingIn: false,
  isLoggingOut: false,
};

// 2. Define the reducer actions
const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_LOADING":
      return { ...state, isLoading: true };
    case "INIT_LOADING":
      return {
        ...state,
        isInitializing: true,
        isLoading: true,
      };
    case "LOGIN_LOADING":
      return {
        ...state,
        isLoggingIn: true,
        isLoading: true,
      };
    case "LOGOUT_LOADING":
      return {
        ...state,
        isLoggingOut: true,
        isLoading: true,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isInitializing: false,
        isLoggingIn: false,
        isLoggingOut: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        isLoading: false,
        isInitializing: false,
        isLoggingIn: false,
        isLoggingOut: false,
        isAuthenticated: false,
        user: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        isInitializing: false,
        isLoggingIn: false,
        isLoggingOut: false,
        isAuthenticated: false,
        user: null,
      };
    case "UPDATE_USER": // Add a new action type
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };
    default:
      return state;
  }
};

// 3. Create the context
const AuthContext = createContext(initialState);

// 4. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const queryClient = useQueryClient();

  // 5. Check for an existing token on app load
  useEffect(() => {
    const loadUser = async () => {
      dispatch({ type: "INIT_LOADING" });

      const token = localStorage.getItem("authToken");

      if (!token) {
        dispatch({ type: "AUTH_ERROR" });

        return;
      }

      setAuthToken(token);
      try {
        // Add timeout for slow network connections
        const timeoutPromise = new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Network timeout")), 15000) // 15 second timeout
        );

        const profilePromise = getMyProfile();

        // Race between the API call and timeout
        const data = await Promise.race([profilePromise, timeoutPromise]);

        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: data },
        });
      } catch (error) {
        console.error("Error loading user:", error);

        // If it's a timeout, show more helpful message
        if (error.message === "Network timeout") {
          toast.error(
            "Connection is slow. Please check your network and try again."
          );
        }

        // Token is invalid, expired, or network failed
        clearAuthToken();
        localStorage.removeItem("authToken");
        dispatch({ type: "AUTH_ERROR" });
      }
    };

    loadUser();
  }, []);

  // Create a new function to update the user
  const updateUser = (updatedUserData) => {
    dispatch({ type: "UPDATE_USER", payload: { user: updatedUserData } });
  };

  // 6. Login function
  const login = async (email, password) => {
    dispatch({ type: "LOGIN_LOADING" });
    try {
      // Add timeout for slow network connections
      const timeoutPromise = new Promise(
        (_, reject) =>
          setTimeout(() => reject(new Error("Login timeout")), 10000) // 10 second timeout for login
      );

      const loginPromise = loginUser(email, password);

      // Race between the API call and timeout
      const data = await Promise.race([loginPromise, timeoutPromise]);

      localStorage.setItem("authToken", data.token);
      setAuthToken(data.token);

      // --- PREFETCH DATA HERE ---
      // This "warms up" the dashboard's data cache before navigating.
      await queryClient.prefetchQuery({
        queryKey: ["polls"],
        queryFn: getAllUserPolls,
      });

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: data.user },
      });

      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });

      // Handle timeout specifically
      if (error.message === "Login timeout") {
        toast.error(
          "Login is taking longer than expected. Please check your connection and try again."
        );
      } else {
        toast.error(error.message);
      }
      return false;
    }
  };

  // 7. Register function
  const register = async (name, email, password) => {
    dispatch({ type: "LOGIN_LOADING" }); // Registration logs user in immediately
    try {
      // Add timeout for slow network connections
      const timeoutPromise = new Promise(
        (_, reject) =>
          setTimeout(() => reject(new Error("Registration timeout")), 10000) // 10 second timeout for registration
      );

      const registerPromise = registerUser(name, email, password);

      // Race between the API call and timeout
      const data = await Promise.race([registerPromise, timeoutPromise]);

      localStorage.setItem("authToken", data.token);
      setAuthToken(data.token);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: data.user },
      });
      toast.success("Registered successfully!");
      return true;
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });

      // Handle timeout specifically
      if (error.message === "Registration timeout") {
        toast.error(
          "Registration is taking longer than expected. Please check your connection and try again."
        );
      } else {
        toast.error(error.message);
      }
      return false;
    }
  };

  // 8. Logout function
  const logout = () => {
    dispatch({ type: "LOGOUT_LOADING" });
    // Simulate a network call if needed
    setTimeout(() => {
      localStorage.removeItem("authToken");
      clearAuthToken();
      dispatch({ type: "LOGOUT" });
      toast("Logged out", { icon: "👋" });
      // navigate("/login");  // Because we have PrivateRoute.jsx, that will automatically redirect to login page
    }, 500); // 500ms delay for demonstration
  };

  // 9. Provide the state and functions to children
  return (
    <AuthContext.Provider
      value={{
        ...state,
        updateUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 10. Create a custom hook for easy access
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
