import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Use the real photoUrl, or generate one from their name as a fallback
  const avatarUrl = user?.photoUrl
    ? user.photoUrl
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuDdqgRtsda6SxKMjpcG1FKOvsurQdDjYc7GzFu7UWKxk0bJSFn3uOFmgKY8dszmlyNpYB8geq1YIWuO3EjE0OU1eSURui8JhN_2B0txNwvDNLpDNtm61PohXB-yJBsOYYXgVHhePJ7faRdWe1Mv7unmK8qeh4MlGY0NmlceJ0OGigu1zXKklsYGfig1LTdWVVx7i02RKLtR9_LvVcujCXes563s5KQhS8YceoDpuaYK2dXouQNmDfDVsnrK8DUZgf3JXdbKenFcl1U";

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--neutral-800)] px-4 sm:px-6 lg:px-10 py-4">
      <div
        className="flex items-center gap-3 text-white cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <svg
          className="h-8 w-8 text-[var(--primary-500)]"
          fill="none"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 36V28H4V20H12V12H20V20H28V12H36V20H44V28H36V36H28V28H20V36H12Z"
            fill="currentColor"
          ></path>
        </svg>
        <h1 className="text-[var(--neutral-50)] text-xl font-bold leading-tight tracking-tighter">
          Who's In?
        </h1>
      </div>
      {isAuthenticated && user && (
        <div className="flex flex-1 justify-end gap-8 cursor-pointer">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 "
            onClick={() => navigate("/profile")}
          >
            <img
              src={avatarUrl}
              alt="User Profile"
              className="rounded-full size-10"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
