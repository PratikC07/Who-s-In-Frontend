import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubmitVote } from "../hooks/usePolls.js";
import toast from "react-hot-toast";
import Loader from "./Loader.jsx";
import ButtonLoader from "./ButtonLoader.jsx";

const VotePageForm = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voterName, setVoterName] = useState("");
  const { title, options, id: pollId } = poll;
  const navigate = useNavigate();

  const { mutate: submitVote, isPending } = useSubmitVote();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!voterName.trim()) {
      return toast.error("Please enter your name.");
    }

    if (voterName.trim().length < 3) {
      return toast.error("Please enter name with at least 3 characters.");
    }
    if (!selectedOption) {
      return toast.error("Please select an option.");
    }

    const voteData = {
      pollId,
      optionId: selectedOption,
      voterName: voterName.trim(),
    };

    submitVote(voteData, {
      onSuccess: () => {
        toast.success("Your vote has been submitted!");
        // Navigate to the results page after a successful vote
        navigate(`/poll-result/${pollId}`, { replace: true });
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  return (
    <div className="bg-[var(--neutral-800)] p-8 rounded-2xl shadow-2xl shadow-black/20">
      <h2 className="text-2xl font-bold text-center text-white mb-8">
        {title}
      </h2>
      <div className="space-y-6">
        <div>
          <label className="sr-only" htmlFor="name">
            Your Name
          </label>
          <input
            className="form-input block w-full rounded-lg border-0 bg-[var(--neutral-700)] px-5 py-3 text-[var(--neutral-100)] placeholder-[var(--neutral-400)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--primary-500)] transition-shadow duration-200"
            id="name"
            placeholder="Your Name"
            type="text"
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="space-y-4 pt-2 px-4">
          <legend className="sr-only">Vote</legend>

          {options.map((option, index) => (
            <div key={index} className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={option.id}
                  name="vote"
                  className="appearance-none h-5 w-5 rounded-full border-2 border-[var(--neutral-600)] bg-[var(--neutral-700)] checked:border-[var(--primary-500)] checked:bg-[var(--primary-500)] checked:shadow-[inset_0_0_0_2px_white] focus:ring-2 focus:ring-[var(--primary-500)]/50 focus:outline-none transition-all duration-200 cursor-pointer hover:border-[var(--primary-500)]/70 hover:scale-105"
                  type="radio"
                  value={option.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  checked={selectedOption === option.id}
                  disabled={isPending}
                  required
                />
              </div>

              <label
                className="ml-3 text-base leading-6 font-medium text-[var(--neutral-100)] break-words flex-1 w-0"
                htmlFor={option.id}
              >
                {option.text}
              </label>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <button
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-bold text-[var(--neutral-900)] bg-[var(--primary-500)] hover:bg-[var(--primary-600)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--neutral-800)] focus:ring-[var(--primary-500)]"
            type="submit"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <ButtonLoader /> : "Submit Vote"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotePageForm;
