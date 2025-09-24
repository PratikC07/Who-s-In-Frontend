import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ text = "Loading..." }) => {
  return (
    // <div className="absolute inset-0 flex items-center justify-center">
    //   <Loader2 className="animate-spin" />
    // </div>
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <Loader2 className="animate-spin text-[var(--primary-500)] w-16 h-16" />
      <p className="mt-4 text-xl text-[var(--neutral-200)] font-semibold">
        {text}
      </p>
    </div>
  );
};

export default Loader;
