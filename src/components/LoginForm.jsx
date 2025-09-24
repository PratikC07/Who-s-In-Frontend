import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import Loader from "./Loader.jsx";
import ButtonLoader from "./ButtonLoader.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn } = useAuth();

  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the login function from our context
    const success = await login(email, password);

    console.log(email, password);

    // On successful login, navigate to dashboard and clear form
    if (success) {
      setEmail("");
      setPassword("");
      // Navigate after successful login to prevent route protection timing issues
      navigate("/dashboard", { replace: true });
    }
    // On failure, the context shows the error toast
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-800 placeholder-zinc-500 text-white focus:outline-none focus:ring-[#38e07b] focus:border-[#38e07b] focus:z-10 sm:text-sm transition-colors"
          id="email"
          name="email"
          placeholder="Email address"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </div>
      <div className="relative">
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="new-password"
          className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-800 placeholder-zinc-500 text-white focus:outline-none focus:ring-[#38e07b] focus:border-[#38e07b] focus:z-10 sm:text-sm transition-colors pr-10"
          id="password"
          name="password"
          placeholder="Password"
          required
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-20"
          id="togglePasswordBtn"
          type="button"
          onClick={handlePasswordVisibility}
          disabled={isLoggingIn}
        >
          {showPassword ? (
            <EyeOff className="text-zinc-500 w-5 h-5 cursor-pointer hover:text-[#38e07b] transition-colors" />
          ) : (
            <Eye className="text-zinc-500 w-5 h-5 cursor-pointer hover:text-[#38e07b] transition-colors" />
          )}
        </button>
      </div>

      <div>
        <button
          className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-[#38e07b] transition-transform transform ${
            isLoggingIn
              ? "bg-[#32c96f]"
              : "bg-[#38e07b] hover:scale-105 hover:bg-[#32c96f]"
          }`}
          type="submit"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? <ButtonLoader /> : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
