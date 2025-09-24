import React, { useState } from "react";
import PollOptionCard from "./PollOptionCard";
import Backdrop from "./Backdrop";

const PollResultSecondSection = ({ pollResults }) => {
  const [activeOptionId, setActiveOptionId] = useState(null);
  console.log("pollResults of PollResultSecondSection", pollResults);

  const calculateTotalVotes = () => {
    return pollResults.options.reduce((total, option) => {
      return total + option.votes;
    }, 0);
  };

  const calculateTopOption = () => {
    const topOption = pollResults.options.reduce((max, option) => {
      return option.votes > max.votes ? option : max;
    }, pollResults.options[0]);
    return topOption;
  };

  return (
    <div className="w-full relative">
      {/* Conditionally render the backdrop when an option is active */}
      {activeOptionId && <Backdrop onClick={() => setActiveOptionId(null)} />}
      <h3 className="mb-8 text-center text-3xl text-[var(--neutral-50)] font-bold tracking-tight transition-filter duration-300">
        {pollResults.title}
      </h3>
      <div className="grid grid-cols-1 gap-6">
        {pollResults.options.map((option) => (
          <PollOptionCard
            key={option.id}
            option={option}
            totalVotes={calculateTotalVotes()}
            isTop={option.id === calculateTopOption().id}
            activeOptionId={activeOptionId}
            setActiveOptionId={setActiveOptionId}
          />
        ))}
      </div>
    </div>
  );
};

export default PollResultSecondSection;
