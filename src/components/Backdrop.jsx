import React from "react";

const Backdrop = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 z-20 bg-[var(--neutral-900)]/50 backdrop-blur-sm"
      onClick={onClick}
      aria-hidden="true"
    ></div>
  );
};

export default Backdrop;
