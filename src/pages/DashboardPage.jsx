import React from "react";
import Header from "../components/Header.jsx";
import FirstSection from "../components/FirstSection.jsx";
import "../styles/Dashboard.css";
import EmptyPollSection from "../components/EmptyPollSection.jsx";
import PollList from "../components/PollList.jsx";
import { useUserPolls, usePollsVoteUpdates } from "../hooks/usePolls.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import BottomLine from "../components/BottomLine.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const DashboardPage = () => {
  // 1. Fetch the initial list of polls with TanStack Query
  const { data: polls, isLoading, isError, error } = useUserPolls();
  const { user, isAuthenticated } = useAuth();

  const isOwner = isAuthenticated && user?.id === polls?.UserId;
  console.log(polls);
  console.log(isOwner);
  // 2. Start the real-time listener for vote count updates.
  // This hook works in the background and directly updates the cache.
  usePollsVoteUpdates();

  // 3. Handle loading state
  if (isLoading) {
    return (
      <div className="bg-[var(--neutral-900)] min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader text="Fetching your polls..." />
          </div>
        </div>
      </div>
    );
  }

  // 4. Handle error state
  if (isError) {
    return (
      <div className="bg-[var(--neutral-900)] min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ErrorMessage message={error.message} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--neutral-900)]">
      <div className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden font-family: 'Spline Sans', 'Noto Sans', sans-serif;">
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          <div className="px-4 sm:px-6 md:px-10 lg:px-20 flex flex-1 justify-center py-6 lg:py-10">
            <div className="layout-content-container flex flex-col w-full max-w-7xl">
              <FirstSection />
              {polls && polls.length > 0 ? (
                <PollList polls={polls} />
              ) : (
                <EmptyPollSection />
              )}
            </div>
          </div>
          <BottomLine />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
