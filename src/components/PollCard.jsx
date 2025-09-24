import React from "react";
import { Calendar, Vote } from "lucide-react";
import formatDate from "../utils/dateFormat.js";
import { useNavigate } from "react-router-dom";

const PollCard = ({ poll }) => {
  const { title, status, createdAt, totalVotes } = poll;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/poll-result/${poll.id}`);
  };
  return (
    <div
      className="relative group bg-[var(--neutral-800)]/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/10 transition-all duration-300 hover:shadow-2xl hover:border-[var(--primary-500)]/50 hover:scale-[1.02]"
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-[var(--neutral-50)] text-lg font-bold leading-tight truncate pr-4">
            {title}
          </h3>
          <div
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${
              status === "active"
                ? " bg-green-500/20 text-green-300"
                : "bg-gray-500/20 text-gray-300"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                status === "active" ? "bg-green-400" : "bg-gray-400"
              }`}
            ></div>
            <span>{status === "active" ? "Active" : "Closed"}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-[var(--neutral-200)]">
          <Calendar className="w-4 h-4 mr-1.5" />
          <span>{formatDate(createdAt)}</span>
        </div>
        <div
          className={`flex items-center text-sm mt-1
          `}
        >
          <Vote className="w-4 h-4 mr-1.5 text-[var(--neutral-200)]" />
          <span
            className={`${
              status === "active"
                ? "text-[var(--primary-500)]"
                : "text-[var(--neutral-200)]"
            }`}
          >
            {totalVotes} votes
          </span>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
