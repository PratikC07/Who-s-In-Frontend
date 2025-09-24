import React from "react";
import CreatePollButton from "./CreatePollButton.jsx";

const FirstSection = ({ pollLength }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 py-4">
      <h2 className="text-3xl sm:text-4xl text-[var(--neutral-50)] font-bold leading-tight tracking-tighter">
        Dashboard
      </h2>
      {pollLength !== 0 && (
        <div className="w-full sm:w-auto">
          <CreatePollButton />
        </div>
      )}
    </div>
  );
};

export default FirstSection;
