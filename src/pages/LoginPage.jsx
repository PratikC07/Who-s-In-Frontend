import React from "react";
import LoginForm from "../components/LoginForm.jsx";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="bg-[#101110] text-white">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#181918]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Who's In?</h1>
            <p className="mt-2 text-zinc-400">
              Welcome back! Please enter your details.
            </p>
          </div>
          <LoginForm />
          <p className="text-sm text-center text-zinc-400">
            Don't have an account?
            <Link
              className="font-medium text-[#38e07b] hover:text-[#32c96f] transition-colors"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
