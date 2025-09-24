import React from "react";

import VotePageForm from "../components/VotePageForm.jsx";
import { usePollForVoting } from "../hooks/usePolls.js";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const VotePage = () => {
  const { id: pollId } = useParams();
  const { data: poll, isLoading, isError, error } = usePollForVoting(pollId);

  return (
    <div className="bg-[var(--neutral-900)]">
      <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden font-family: 'Spline Sans', 'Noto Sans', sans-serif;">
        {/* Poll Creation Form */}
        <div className="layout-container flex flex-1 items-center justify-center h-full grow flex-col">
          <main className="w-full max-w-2xl mx-auto p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-[var(--primary-500)] tracking-tighter">
                Who's In?
              </h1>
            </div>
            {isLoading && <Loader text="Loading poll..." />}
            {isError && <ErrorMessage message={error.message} />}
            {poll && <VotePageForm poll={poll} />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default VotePage;
