import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import "../styles/Dashboard.css";
import { LogOut } from "lucide-react";
import ProfileImageSection from "../components/ProfileImageSection.jsx";
import ProfileForm from "../components/ProfileForm.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import ButtonLoader from "../components/ButtonLoader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useUserProfile, useUpdateProfile } from "../hooks/useUser.js";
import BackButton from "../components/BackButton.jsx";
import BottomLine from "../components/BottomLine.jsx";

const ProfilePage = () => {
  const { logout, isLoggingOut } = useAuth(); // We still need logout from the context

  // 1. Fetch profile data using our new hook
  const { data: userProfile, isLoading, isError, error } = useUserProfile();

  // 2. Call the mutation hook
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

  // A single variable to determine if the page is busy
  const isPageBusy = isSaving || isLoggingOut;

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // 1. New state to track if the form has changes
  const [isDirty, setIsDirty] = useState(false);

  // console.log("user", user);
  // console.log("userProfile", userProfile);

  // 3. Use useEffect to sync our local state once the data loads
  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
      setFormData({ name: userProfile.name, email: userProfile.email });
      // Reset dirty state when new data is fetched
      setIsDirty(false);
    }
  }, [userProfile]);

  // 2. New useEffect to check for changes
  useEffect(() => {
    if (!userProfile) return;

    // A change has occurred if the name is different OR a new file has been selected.
    const hasChanged =
      userProfile.name !== formData.name || profilePictureFile !== null;

    setIsDirty(hasChanged);
  }, [formData.name, profilePictureFile, userProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePictureFile(file);
    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, photoUrl: previewUrl }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isDirty === false) return; // Prevent submission if no changes

    const profileData = {
      name: formData.name,
      profilePicture: profilePictureFile,
    };

    // 4. Call the mutation. TanStack Query handles the rest!
    updateProfile(profileData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        setProfilePictureFile(null);
      },
      onError: (error) => {
        toast.error(`Update failed: ${error.message}`);
      },
    });
  };

  // 5. Handle dedicated loading and error states
  if (isLoading) {
    return (
      <div className="bg-[var(--neutral-900)] min-h-screen">
        <Header />
        <Loader text="Loading profile..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[var(--neutral-900)] min-h-screen">
        <Header />
        <div className="p-10">
          <ErrorMessage message={error.message} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--neutral-900)]">
      <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden font-family: 'Spline Sans', 'Noto Sans', sans-serif;">
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          {profile == null ? (
            <Loader text=" Loading Profile" />
          ) : (
            <>
              <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 mt-6 flex justify-between items-center">
                <BackButton />
              </div>
              <main className="relative flex-1 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
                {/* Profile Form */}
                <div className="mx-auto w-full max-w-xl">
                  <div className="flex flex-col items-center gap-8 sm:gap-12 p-4 sm:p-6 md:p-10 ">
                    <ProfileImageSection
                      profile={profile}
                      handleProfileImageChange={handleImageChange}
                    />
                    <ProfileForm
                      formData={formData}
                      setFormData={setFormData}
                      handleSave={handleSave}
                      isSaving={isSaving}
                      isDirty={isDirty}
                      isPageBusy={isPageBusy}
                    />
                    {/* Log Out Button */}
                    <div className="w-full mt-4">
                      <button
                        className="relative w-full flex items-center justify-center gap-3 rounded-full h-12 px-6 bg-transparent border border-red-500/30 text-red-400 text-base font-bold leading-normal transition-all hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300"
                        onClick={logout}
                        disabled={isPageBusy}
                      >
                        {isLoggingOut ? (
                          <ButtonLoader />
                        ) : (
                          <>
                            <LogOut className="w-5 h-5" />
                            <span>Log Out</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </>
          )}
          <BottomLine />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
