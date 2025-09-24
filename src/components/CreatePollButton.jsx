import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatePollButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full h-12 px-6 bg-[var(--primary-500)] text-[var(--neutral-900)] text-base font-bold leading-normal transition-colors hover:bg-[var(--primary-600)]"
      onClick={() => navigate("/poll-creation")}
    >
      <span className="">
        <Plus />
      </span>
      <span className="truncate">Create New Poll</span>
    </button>
  );
};
export default CreatePollButton;
