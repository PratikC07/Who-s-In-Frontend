import React from "react";
import Header from "./Header.jsx";
import Loader from "./Loader.jsx";

const NavigationLoading = ({ privateRoute = true }) => {
  return (
    <div className="bg-[var(--neutral-900)] min-h-screen flex flex-col relative">
      {privateRoute && <Header />}

      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xs z-10 flex items-center justify-center">
        <div className="text-center ">
          <Loader text="Loading..." />
        </div>
      </div>
    </div>
  );
};

export default NavigationLoading;
