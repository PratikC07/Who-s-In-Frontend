import React, { useState } from "react";
import PasswordStrength from "./PasswordStrength";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "./ButtonLoader.jsx";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Call the register function
    const success = await register(name, email, password);

    if (success) {
      // On success, navigate to dashboard
      navigate("/", { replace: true });
    }

    // On failure, context shows toast
    setIsLoading(false);

    if (success) {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) strength++;

    return strength;
  };

  const handlePasswordStrength = (password) => {
    let strength = getPasswordStrength(password);
    setStrength(strength);
    console.log(strength);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input
          required
          className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-zinc-700 bg-zinc-800 placeholder-zinc-500 text-white focus:outline-none focus:ring-[#38e07b] focus:border-[#38e07b] focus:z-10 sm:text-sm transition-colors"
          id="name"
          name="name"
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
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
          disabled={isLoading}
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
          onChange={(e) => {
            setPassword(e.target.value);
            handlePasswordStrength(e.target.value);
          }}
          disabled={isLoading}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-20"
          id="togglePasswordBtn"
          type="button"
          onClick={handlePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="text-zinc-500 w-5 h-5 cursor-pointer hover:text-[#38e07b] transition-colors" />
          ) : (
            <Eye className="text-zinc-500 w-5 h-5 cursor-pointer hover:text-[#38e07b] transition-colors" />
          )}
        </button>
      </div>
      <PasswordStrength password={password} strength={strength} />
      <div>
        <button
          className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-[#38e07b] transition-transform transform ${
            isLoading
              ? "bg-[#32c96f]"
              : "bg-[#38e07b] hover:scale-105 hover:bg-[#32c96f]"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <ButtonLoader /> : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
