// src/api/user.js
import apiClient from "./apiClient";

/**
 * Gets the profile for the currently authenticated user.
 * @returns {Promise<{userProfile: object}>}
 */
export const getMyProfile = async () => {
  const data = await apiClient.get("/user/profile");

  return data.userProfile;
};

/**
 * Updates the user's profile.
 * @param {{name: string, profilePicture: File | null}} profileData
 * @returns {Promise<{updatedUser: object}>}
 */
export const updateUserProfile = async ({ name, profilePicture }) => {
  const formData = new FormData();
  formData.append("name", name);

  // Only append the picture if a new one was selected
  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  const data = await apiClient.put("/user/profile", formData, {
    headers: {
      // Axios will automatically set the correct multipart header
      // when it sees a FormData object, but being explicit can
      // sometimes help avoid issues.
      "Content-Type": "multipart/form-data",
    },
  });

  return data.updatedUser; // API returns { updatedUser: {...} }
};
