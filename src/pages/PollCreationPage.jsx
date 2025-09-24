import React, { useState } from "react";
import Header from "../components/Header.jsx";
import "../styles/Dashboard.css";
import PollCreationForm from "../components/PollCreationForm.jsx";
import PollCreatedShareWindow from "../components/PollCreatedShareWindow.jsx";
import Backdrop from "../components/Backdrop.jsx";
import BackButton from "../components/BackButton.jsx";

const PollCreationPage = () => {
  const [showShareWindow, setShowShareWindow] = useState(false);
  const [shareableUrl, setShareableUrl] = useState("");

  // This function will be called by the form on a successful creation
  const handlePollCreated = (url) => {
    setShareableUrl(url);
    setShowShareWindow(true);
  };

  const handleCloseShareWindow = () => {
    setShowShareWindow(false);
    setShareableUrl("");
  };

  return (
    <div className="bg-[var(--neutral-900)]">
      <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden font-family: 'Spline Sans', 'Noto Sans', sans-serif;">
        {/* Poll Creation Form */}
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 mt-6 flex justify-between items-center">
            <BackButton />
          </div>
          <PollCreationForm handlePollCreated={handlePollCreated} />
        </div>
        {/* Poll Created Share Window */}
        {showShareWindow && (
          <>
            <Backdrop onClick={handleCloseShareWindow} />
            <div className="absolute inset-0 flex-1 flex items-center justify-center p-4 z-30">
              <PollCreatedShareWindow shareLink={shareableUrl} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PollCreationPage;
