import React from "react";
import SignupForm from "../components/SignupForm.jsx";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="bg-[#101110] text-white">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#181918]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              Create your account
            </h1>
            <p className="mt-2 text-zinc-400">
              Join "Who's In?" to start making plans.
            </p>
          </div>
          <SignupForm />
          <p className="text-sm text-center text-zinc-400">
            Already have an account?
            <Link
              className="font-medium text-[#38e07b] hover:text-[#32c96f] transition-colors"
              to="/login"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
