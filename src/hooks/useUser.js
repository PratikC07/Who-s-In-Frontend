import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateUserProfile } from "../api/user";
import { useAuth } from "../contexts/AuthContext";

// --- THIS IS THE NEW HOOK ---
/**
 * Hook to fetch the currently authenticated user's profile.
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"], // A unique key for this data
    queryFn: getMyProfile,
  });
};

// --- THIS IS THE UPDATED HOOK ---
/**
 * Hook to update the user's profile.
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedUser) => {
      // 1. Invalidate the query to refetch data on the ProfilePage
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      // 2. Immediately update the global user state in AuthContext
      // This will instantly update the Header and any other component
      // that relies on useAuth()
      updateUser(updatedUser);
    },
  });
};
