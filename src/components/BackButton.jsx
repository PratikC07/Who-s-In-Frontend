import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 flex items-center justify-center ">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center justify-center text-[var(--neutral-200)] hover:text-[var(--primary-500)] transition-colors "
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default BackButton;
