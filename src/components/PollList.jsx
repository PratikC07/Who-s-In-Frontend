import React from "react";
import PollCard from "./PollCard.jsx";

const PollList = ({ polls }) => {
  // console.log(polls);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 py-6">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollList;
