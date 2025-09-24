import React, { useRef } from "react";
import { Camera } from "lucide-react";

const ProfileImageSection = ({ profile, handleProfileImageChange }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Profile Image */}
      <div className="relative w-32 h-32">
        <img
          src={
            profile.photoUrl
              ? profile.photoUrl
              : "https://lh3.googleusercontent.com/aida-public/AB6AXuDdqgRtsda6SxKMjpcG1FKOvsurQdDjYc7GzFu7UWKxk0bJSFn3uOFmgKY8dszmlyNpYB8geq1YIWuO3EjE0OU1eSURui8JhN_2B0txNwvDNLpDNtm61PohXB-yJBsOYYXgVHhePJ7faRdWe1Mv7unmK8qeh4MlGY0NmlceJ0OGigu1zXKklsYGfig1LTdWVVx7i02RKLtR9_LvVcujCXes563s5KQhS8YceoDpuaYK2dXouQNmDfDVsnrK8DUZgf3JXdbKenFcl1U"
          }
          className="w-full h-full rounded-full object-cover cursor-pointer border-2 border-[var(--primary-500)]"
          onClick={handleImageClick}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="hidden"
          id="profileImageInput"
        />

        {/* Camera button at bottom-right */}
        <button
          className="absolute bottom-0 right-0 bg-[var(--neutral-800)] rounded-full p-2 shadow-lg border-1 border-white hover:bg-[var(--neutral-700)] transition-colors"
          onClick={handleImageClick}
        >
          <Camera className="w-4 h-4 text-white" />
        </button>
      </div>
      {/* Profile Name and Email */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--neutral-50)]">
          {profile.name}
        </h2>
        <p className="text-sm text-[var(--neutral-400)]">{profile.email}</p>
      </div>
    </div>
  );
};

export default ProfileImageSection;
