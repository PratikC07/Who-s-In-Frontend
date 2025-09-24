import React from "react";

const PollResultFirstSection = () => {
  return (
    <div className="relative w-full text-center transition-filter duration-300">
      <h2 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[var(--neutral-50)]">
        Poll Results
      </h2>
      <p className="mt-2 text-center text-base sm:text-lg text-[var(--neutral-400)]">
        Results are updating in real-time.
      </p>
    </div>
  );
};

export default PollResultFirstSection;
