import React from "react";
import { Copy, ArrowRight, Check, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const PollCreatedShareWindow = ({ shareLink }) => {
  // const shareLink = "https://www.google.com";
  const navigate = useNavigate();

  const handleCopyToClipboard = async () => {
    if (!shareLink) {
      toast.error("No link to copy.");
      return;
    }
    toast.dismiss();
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link");
    }
  };

  const handleDone = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[var(--neutral-800)] border border-[var(--neutral-700)] rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              {/* Check icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Optional glow effect */}
                  <div className="absolute inset-0 w-28 h-28 bg-[var(--primary-500)]/50 rounded-full blur-xl animate-pulse  "></div>
                  {/* Check icon */}
                  <div className="w-28 h-28 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-600)] rounded-full flex items-center justify-center animate-bounce ">
                    <CheckCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-[var(--neutral-50)]">
                Poll Created!
              </h1>
              <p className="text-[var(--neutral-200)] mt-2">
                Your poll is live. Share it with your friends!
              </p>
            </div>
            <div className="mt-8">
              <label
                className="block text-sm font-medium text-[var(--neutral-200)] mb-2 text-center"
                htmlFor="poll-link"
              >
                Share this link
              </label>
              <div className="relative flex rounded-lg shadow-sm ">
                <input
                  className=" select-none focus:outline-none pointer-events-none form-input block w-full h-12 rounded-md bg-[var(--neutral-700)] border-[var(--neutral-700)] text-[var(--neutral-100)] placeholder-[var(--neutral-200)] transition duration-150 ease-in-out sm:text-sm text-center pr-12"
                  id="poll-link"
                  readOnly
                  type="text"
                  value={shareLink || "Generating link..."}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-[var(--neutral-200)] hover:text-[var(--primary-500)] hover:bg-[var(--neutral-600)] transition-all duration-200 rounded-r-md group cursor-pointer"
                  onClick={handleCopyToClipboard}
                >
                  <Copy />
                </button>
              </div>
            </div>
          </div>
          <div className="px-8 py-6 bg-[var(--neutral-800)] flex justify-center">
            <button
              onClick={handleDone}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[var(--primary-500)] px-8 py-3 font-bold text-black transition-colors duration-300 hover:bg-[var(--primary-600)] cursor-pointer"
            >
              Done
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollCreatedShareWindow;
