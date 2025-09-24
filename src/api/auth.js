// src/api/auth.js
import apiClient from "./apiClient";

/**
 * Logs in a user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string, user: object}>}
 */
export const loginUser = async (email, password) => {
  const data = await apiClient.post("/auth/login", { email, password });
  return data;
};

/**
 * Registers a new user.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string, user: object}>}
 */
export const registerUser = async (name, email, password) => {
  const data = await apiClient.post("/auth/register", {
    name,
    email,
    password,
  });
  return data;
};
