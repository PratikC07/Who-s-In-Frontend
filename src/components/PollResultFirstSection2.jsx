import React from "react";
import { LockKeyhole } from "lucide-react";

const PollResultFirstSection2 = () => {
  return (
    <div className="relative w-full text-center transition-filter duration-300">
      <div className="animate-pulse-glow mb-6 inline-flex items-center gap-3 rounded-full bg-[var(--neutral-800)] px-4 py-2 text-base font-medium text-[var(--neutral-100)] border border-[var(--neutral-700)]">
        <LockKeyhole className="w-6 h-6 text-yellow-500" />
        <span>This poll is now closed.</span>
      </div>
      <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-[var(--neutral-50)]">
        Final Poll Results
      </h2>
    </div>
  );
};

export default PollResultFirstSection2;
