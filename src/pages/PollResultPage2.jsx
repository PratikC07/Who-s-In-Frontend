import React from "react";
import Header from "../components/Header.jsx";
import PollResultFirstSection2 from "../components/PollResultFirstSection2.jsx";
import PollResultSecondSection2 from "../components/PollResultSecondSection2.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { usePollResults } from "../hooks/usePolls.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import BackButton from "../components/BackButton.jsx";
import ShareButton from "../components/ShareButton.jsx";

const PollResultPage2 = () => {
  const navigate = useNavigate();
  const { id: pollId } = useParams();

  // 1. Get auth state
  const { user, isAuthenticated } = useAuth();

  // 2. Fetch the final poll results using TanStack Query
  const {
    data: pollResults,
    isLoading,
    isError,
    error,
  } = usePollResults(pollId);

  // 3. Determine if the current user is the owner
  const isOwner = isAuthenticated && user?.id === pollResults?.UserId;

  const redirectToSignup = () => {
    navigate("/signup", { replace: true });
  };

  // 4. Handle Loading State
  if (isLoading) {
    return (
      <div className="bg-[var(--neutral-900)] min-h-screen">
        <Header />
        <Loader text="Loading final results..." />
      </div>
    );
  }

  // 5. Handle Error State
  if (isError) {
    return (
      <div className="bg-[var(--neutral-900)] min-h-screen">
        <Header />
        <div className="p-10">
          <ErrorMessage message={error.message} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--neutral-900)]">
      <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden font-family: 'Spline Sans', 'Noto Sans', sans-serif;">
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 mt-6 flex justify-between items-center">
            {isOwner ? <BackButton /> : <div />}
            {/* Render BackButton or an empty placeholder */}
            <ShareButton shareLink={pollResults?.shareCode} />
          </div>
          <main
            className=" relative flex-grow px-4 py-6 md:py-8 lg:py-12 sm:px-6 lg:px-8"
            id="main-content"
          >
            <div className="z-10 mx-auto max-w-4xl flex flex-col items-center gap-12">
              <PollResultFirstSection2 />
              <PollResultSecondSection2 pollResults={pollResults} />
            </div>
          </main>
          <Footer RedirectToSignup={redirectToSignup} isOwner={isOwner} />
        </div>
      </div>
    </div>
  );
};

export default PollResultPage2;
