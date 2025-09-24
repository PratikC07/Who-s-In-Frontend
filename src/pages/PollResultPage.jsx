import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import "../styles/Dashboard.css";
import "../styles/PollResult.css";
import PollResultFirstSection from "../components/PollResultFirstSection.jsx";
import PollResultSecondSection from "../components/PollResultSecondSection.jsx";
import { LockKeyhole, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Backdrop from "../components/Backdrop.jsx";
import PollCloseBox from "../components/PollCloseBox.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useRealtimePollResults } from "../hooks/usePolls.js";
import Loader from "../components/Loader.jsx";
import { useClosePoll } from "../hooks/usePolls.js";
import toast from "react-hot-toast";
import ErrorMessage from "../components/ErrorMessage.jsx";
import BackButton from "../components/BackButton.jsx";
import ShareButton from "../components/ShareButton.jsx";

export const PollResultPage = () => {
  const { id: pollId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // 1. Get auth state
  const { user, isAuthenticated } = useAuth();

  // 2. Get poll data (this hook handles real-time updates)
  const {
    data: pollResults,
    isLoading: isPollResultsLoading,
    error: pollResultsError,
  } = useRealtimePollResults(pollId);

  const { mutate: closePoll, isPending: isClosing } = useClosePoll();

  // This logic now lives inside the component!
  const isOwner = isAuthenticated && user?.id === pollResults?.UserId;

  // Add logic to handle redirection when a poll closes
  useEffect(() => {
    if (pollResults?.status === "closed") {
      // Redirect to the final, static results page
      navigate(`/poll-result-closed/${pollId}`, { replace: true });
    }
  }, [pollResults, pollId, navigate]);

  // Handle case where poll is not found
  if (!pollResults && !isPollResultsLoading) {
    // Render an error or "Not Found" page
    return <div>Poll not found.</div>;
  }

  if (isPollResultsLoading) {
    return (
      <div className="bg-[var(--neutral-900)] min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader text="Loading poll results..." />
          </div>
        </div>
      </div>
    );
  }

  // 4. Handle error state
  if (pollResultsError) {
    return (
      <div className="bg-[var(--neutral-900)] min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ErrorMessage message={pollResultsError.message} />
          </div>
        </div>
      </div>
    );
  }

  const redirectToSignup = () => {
    navigate("/signup", { replace: true });
  };

  const OpenClosePollBox = () => {
    console.log("Opening close poll box...");
    setIsOpen(true);
  };

  const submitClosePoll = () => {
    console.log("Submitting close poll...");
    closePoll(pollId, {
      onSuccess: () => {
        toast.success("Poll has been closed!");
        // The useEffect will handle the navigation when the data updates.
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(`Failed to close poll: ${error.message}`);
        setIsOpen(false);
      },
    });
  };

  return (
    <div className="bg-[var(--neutral-900)]">
      <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden font-family: 'Spline Sans', 'Noto Sans', sans-serif;">
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
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
              <PollResultFirstSection />
              <PollResultSecondSection pollResults={pollResults} />
            </div>
          </main>

          <footer className="px-4 py-6 text-center transition-filter duration-300">
            {!isOwner ? (
              <div className="mx-auto max-w-4xl">
                <p className="mb-4 text-[var(--neutral-400)]">
                  Ready to make your own decisions?
                </p>
                <button
                  onClick={redirectToSignup}
                  className="transform rounded-full bg-[var(--primary-500)] px-8 py-3 font-bold text-black transition-colors duration-300 hover:scale-105 hover:bg-[var(--primary-600)]"
                >
                  Create Your First Poll
                </button>
                <p className="mt-8 text-xs text-[var(--neutral-700)]">
                  © 2024 Who's In? All rights reserved.
                </p>
              </div>
            ) : (
              <div className="organizer-actions mt-8 w-full max-w-sm mx-auto flex flex-col items-center gap-4">
                <button
                  onClick={OpenClosePollBox}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--danger-500)] px-3 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-[var(--danger-600)]"
                >
                  <LockKeyhole className="w-5 h-5" />
                  Close Poll
                </button>
                <p className="text-sm text-[var(--neutral-400)]">
                  Closing the poll is permanent and cannot be undone.
                </p>
                <p className="mt-8 text-xs text-[var(--neutral-700)]">
                  © 2024 Who's In? All rights reserved.
                </p>
              </div>
            )}
          </footer>

          {/* Poll Close Box */}
          {isOpen && (
            <div className="fixed inset-0 z-30 flex items-center justify-center">
              <PollCloseBox
                SubmitClosePoll={submitClosePoll}
                CancelClosePoll={() => setIsOpen(false)}
                isClosing={isClosing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
