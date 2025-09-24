import React from "react";
import { TriangleAlert } from "lucide-react";
import Loader from "./Loader.jsx";
import ButtonLoader from "./ButtonLoader.jsx";

// This component is now just the UI for the box itself.
const PollCloseBox = ({ SubmitClosePoll, CancelClosePoll, isClosing }) => {
  return (
    // The root element is now the styled content box.
    // We pass the z-index and positioning from the parent.
    <div className="bg-[var(--neutral-800)]/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl text-white max-w-md w-full m-4">
      <div className="p-8 text-center">
        <TriangleAlert className="w-20 h-20 mx-auto mb-5 text-[var(--primary-500)]" />
        <h2 className="text-3xl font-bold mb-3">Close This Poll?</h2>
        <p className="text-white/70 text-base mb-8">
          This action is permanent and cannot be undone. Are you sure you want
          to proceed?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={CancelClosePoll}
            className="flex-1 rounded-xl bg-white/10 px-6 py-3.5 text-base font-bold text-white transition-all hover:bg-white/20"
            disabled={isClosing}
          >
            Cancel
          </button>
          <button
            onClick={SubmitClosePoll}
            className={`flex-1 flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-bold text-[var(--neutral-900)] transition-all shadow-[0_0_25px_var(--primary-500)/0.6] ${
              isClosing ? "bg-[#32c96f]" : "bg-[#38e07b] hover:bg-[#32c96f]"
            }`}
            disabled={isClosing}
          >
            {isClosing ? <ButtonLoader /> : "Yes, Close It"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollCloseBox;
