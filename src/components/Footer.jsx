import React from "react";

const Footer = ({ RedirectToSignup, isOwner }) => {
  return (
    <footer className="mt-2 border-[var(--neutral-800)] px-4 py-6 text-center transition-filter duration-300">
      <div className="mx-auto max-w-4xl">
        {!isOwner && (
          <>
            <p className="mb-4 text-[var(--neutral-400)]">
              Ready to make your own decisions?
            </p>
            <button
              onClick={RedirectToSignup}
              className="transform rounded-full bg-[var(--primary-500)] px-8 py-3 font-bold text-black transition-colors duration-300 hover:scale-105 hover:bg-[var(--primary-600)]"
            >
              Create a New Poll
            </button>
          </>
        )}
        <p className="mt-8 text-xs text-[var(--neutral-700)]">
          © 2024 Who's In? All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
