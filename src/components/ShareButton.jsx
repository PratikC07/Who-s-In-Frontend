import React, { useState } from "react";
import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

const ShareButton = ({ shareLink }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyShareLink = async () => {
    toast.dismiss();
    try {
      //   const shareLink = window.location.href;

      const baseURL = import.meta.env.VITE_BACKEND_REDIRECT_BASE_URL;
      const fullShareLink = baseURL + `/${shareLink}`;
      // console.log("fullShareLink of PollResultFirstSection", fullShareLink);
      await navigator.clipboard.writeText(fullShareLink);
      setIsCopied(true);
      toast.success("Link copied to clipboard!", {
        icon: "🔗",
        duration: 2000,
      });

      setTimeout(() => {
        toast.dismiss();
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <button
      aria-label="Share poll"
      className={`flex items-center justify-center rounded-full p-2 text-neutral-400 transition-colors duration-300 
            ${isCopied ? "" : "hover:bg-neutral-800 hover:text-white"}`}
      onClick={handleCopyShareLink}
      disabled={isCopied}
      type="button"
    >
      <Share2
        className={`w-6 h-6 ${
          isCopied
            ? "text-green-500 rotate-360 duration-1000 transition-all ease-in-out"
            : ""
        }`}
      />
    </button>
  );
};

export default ShareButton;
