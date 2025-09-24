import React from "react";
import generateAvatar from "../utils/generateAvatar.js";

const PollOptionVoterCard = ({ voterName }) => {
  const voterAvatarLink = generateAvatar(voterName);

  return (
    <li className="flex items-center gap-3">
      <img
        alt="Voter avatar"
        className="h-8 w-8 rounded-full"
        src={voterAvatarLink}
      />
      <span className="text-[var(--neutral-200)]">{voterName}</span>
    </li>
  );
};

export default PollOptionVoterCard;
