import React from "react";
import PollOptionVoterCard from "./PollOptionVoterCard";
import { ChartNoAxesCombined } from "lucide-react";

const PollOptionCard = ({
  option,
  isTop = false,
  activeOptionId,
  setActiveOptionId,
  totalVotes,
}) => {
  // Determine if this specific card's list should be open
  const isOpen = activeOptionId === option.id;

  const calculatePercentage = () => {
    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
    return percentage.toFixed(2);
  };

  const ToggleVotersList = () => {
    // If it's already open, close it. Otherwise, open it.
    setActiveOptionId(isOpen ? null : option.id);
  };

  // Dynamic grid based on voter count
  const getGridLayout = (count) => {
    if (count <= 2) return "grid-cols-1";
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2";
    if (count <= 9) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  return (
    <div className={`relative poll-option ${isOpen ? "z-30" : "z-10"}`}>
      <button
        className={`relative z-20 flex w-full flex-col gap-2 rounded-xl border-2 p-6 text-left cursor-pointer transition-colors duration-300  ${
          isTop
            ? "border-[var(--primary-500)] bg-[var(--neutral-800)]/50 hover:bg-[var(--neutral-700)]/50 glow-subtle"
            : "border-[var(--neutral-800)] bg-[var(--neutral-900)]/50 hover:bg-[var(--neutral-800)]/50"
        }`}
        onClick={ToggleVotersList}
        type="button"
      >
        {/* top section */}
        <div className="flex items-start justify-between gap-4">
          <h4
            className={`text-lg font-bold ${
              isTop ? "text-[var(--primary-500)]" : "text-[var(--neutral-100)]"
            }`}
          >
            {option.text}
          </h4>
          <div
            className={`flex flex-shrink-0 items-center gap-2 ${
              isTop
                ? "text-[var(--primary-500)] visible"
                : "text-[var(--neutral-100)] hidden"
            }`}
          >
            <ChartNoAxesCombined className="w-6 h-6" />
            <span className="text-md font-semibold">Leading</span>
          </div>
        </div>
        {/* progress bar */}
        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="h-3 w-full rounded-full bg-[var(--neutral-700)]">
            <div
              className={`h-3 rounded-full bg-[var(--primary-500)] transition-all duration-500 ${
                isTop ? "bg-[var(--primary-500)]" : "bg-[var(--neutral-700)]"
              }`}
              style={{ width: `${calculatePercentage()}%` }}
            ></div>
          </div>
          <span
            className={`flex-shrink-0 text-2xl font-bold ${
              isTop
                ? "text-[var(--primary-500)] vote-pulse"
                : "text-[var(--neutral-100)]"
            }`}
          >
            {option.votes} Votes
          </span>
        </div>
      </button>
      <div
        className={`voter-dropdown absolute top-full z-30 mt-2 w-full origin-top transform rounded-xl border border-[var(--neutral-700)] bg-[var(--neutral-800)]/95 p-4 backdrop-blur-sm ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-4 hidden"
        }`}
      >
        <h5 className="mb-3 font-bold text-[var(--neutral-100)]">Voters:</h5>
        <ul
          className={`grid gap-x-3 gap-y-3 ${getGridLayout(
            option.voters.length
          )}`}
        >
          {option.voters.map((voter, index) => (
            <PollOptionVoterCard key={index} voterName={voter.name} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PollOptionCard;
