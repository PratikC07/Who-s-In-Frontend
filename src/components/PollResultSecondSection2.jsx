import React, { useState } from "react";
import PollOptionCard2 from "./PollOptionCard2";
import Backdrop from "./Backdrop";
import { Crown } from "lucide-react";

const PollResultSecondSection2 = ({ pollResults }) => {
  const [activeOptionId, setActiveOptionId] = useState(null);

  console.log("pollResults of PollResultSecondSection2", pollResults);

  const calculateTopOption = () => {
    const topOption = pollResults.options.reduce((max, option) => {
      return option.votes > max.votes ? option : max;
    }, pollResults.options[0]);
    // console.log("topOption of calculateTopOption", topOption);
    return topOption;
  };

  const topOption = calculateTopOption();

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* Conditionally render the backdrop when an option is active */}
      {activeOptionId && <Backdrop onClick={() => setActiveOptionId(null)} />}
      <h3 className="mb-8 text-center text-2xl text-[var(--neutral-50)] font-bold tracking-tight transition-filter duration-300">
        {pollResults.title}
      </h3>
      <div className="relative flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-lg rounded-3xl border-2 border-[var(--primary-500)] bg-[var(--neutral-800)]/50 p-6 sm:p-8 celebration-bg glow-subtle mb-12">
        {/* winner crown */}
        <div className="relative animate-bounce flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-300">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          {/* Winner ribbon */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            WINNER
          </div>
        </div>
        <div className=" text-center">
          <h4 className="text-xl sm:text-2xl font-bold text-[var(--primary-500)]">
            {topOption.text}
          </h4>
          <p className="mt-1 sm:mt-2 text-4xl sm:text-5xl font-bold text-white">
            {topOption.votes} Votes
          </p>
          <p className="mt-1 text-sm text-[var(--neutral-400)]">
            is the winning option!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 w-full">
        {pollResults.options.map((option) => (
          <PollOptionCard2
            key={option.id}
            option={option}
            isTop={option.id === topOption.id}
            activeOptionId={activeOptionId}
            setActiveOptionId={setActiveOptionId}
          />
        ))}
      </div>
    </div>
  );
};

export default PollResultSecondSection2;
