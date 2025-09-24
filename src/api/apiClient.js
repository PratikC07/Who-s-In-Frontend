// src/api/apiClient.js

import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

// 1. Create the axios instance
const apiClient = axios.create({
  baseURL: baseURL, // Your backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Add a Response Interceptor
// This is the most important part. It will automatically handle
// your custom error structure: { "status": "fail", "message": "..." }
apiClient.interceptors.response.use(
  (response) => {
    // If the response is successful (status 2xx)
    // and has the { "status": "success", "data": ... } structure,
    // we return the 'data' property directly.
    if (response.data && response.data.status === "success") {
      return response.data.data;
    }

    // For responses that don't fit the structure but are still successful
    // (like your healthcheck), just return the data.
    return response.data;
  },
  (error) => {
    // This block handles all 4xx/5xx errors
    if (error.response && error.response.data) {
      // If the error response is in your custom format { "status": "fail", "message": ... }
      if (
        error.response.data.status === "fail" &&
        error.response.data.message
      ) {
        // We reject with a new Error, so our try/catch blocks
        // will get the custom message directly.
        return Promise.reject(new Error(error.response.data.message));
      }
    }

    // For generic network errors or other issues
    return Promise.reject(error);
  }
);

// 3. Helper functions for setting and clearing the auth token

/**
 * Sets the 'Authorization' header for all future requests
 * made with this apiClient instance.
 * @param {string} token - The JWT token.
 */
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

/**
 * Removes the 'Authorization' header from the apiClient instance.
 */
export const clearAuthToken = () => {
  delete apiClient.defaults.headers.common["Authorization"];
};

export default apiClient;
