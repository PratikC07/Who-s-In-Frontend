import React from "react";
import { ClipboardList } from "lucide-react";
import CreatePollButton from "./CreatePollButton.jsx";

const EmptyPollSection = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="relative w-full max-w-xs mb-8">
        {/* Blur background effect */}
        <div className="absolute inset-0 bg-[var(--primary-500)] blur-3xl opacity-20 rounded-full"></div>
        {/* Icon container with animation */}
        <div className="relative w-full h-auto animate-bounce-slow flex items-center justify-center">
          <ClipboardList className="h-[160px] w-[160px] text-[var(--primary-500)]" />
        </div>
      </div>
      <h3 className="text-3xl sm:text-4xl font-black text-[var(--neutral-50)] tracking-tighter mb-4">
        It's quiet in here... too quiet.
      </h3>
      <p className="text-lg sm:text-xl text-[var(--neutral-200)] mb-8 max-w-lg">
        Create a poll to get started and see what your group thinks.
      </p>
      <CreatePollButton />
    </div>
  );
};

export default EmptyPollSection;
