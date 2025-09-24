import React, { useState } from "react";
import "../styles/Dashboard.css";
import { PlusCircle } from "lucide-react";
import OptionInputCard from "./OptionInputCard.jsx";
import ButtonLoader from "./ButtonLoader.jsx";
import { useCreatePoll } from "../hooks/usePolls.js";
import toast from "react-hot-toast";

const PollCreationForm = ({ handlePollCreated }) => {
  // State for managing the poll title
  const [pollTitle, setPollTitle] = useState("");

  const baseURL = import.meta.env.VITE_BACKEND_REDIRECT_BASE_URL;

  // State for managing dynamic options
  const [options, setOptions] = useState([
    { id: 1, value: "", placeholder: "Taco Tuesday" },
    { id: 2, value: "", placeholder: "Wok Wednesday" },
    { id: 3, value: "", placeholder: "Add another option..." },
  ]);

  // Generate unique IDs for new options
  const [nextId, setNextId] = useState(4);

  // 2. Call the hook to get the mutation function and loading state
  const { mutate: createPoll, isPending: isCreating } = useCreatePoll();

  // Add a new option
  const addOption = () => {
    // Limit the number of options for better UI/UX
    if (options.length >= 10) {
      toast.error("You can add a maximum of 10 options.");
      return;
    }
    const newOption = {
      id: nextId,
      value: "",
      placeholder: `New option...`,
    };
    setOptions([...options, newOption]);
    setNextId(nextId + 1);
  };

  // Remove an option
  const removeOption = (optionId) => {
    // Prevent removing if only two options remain
    if (options.length <= 2) return;

    setOptions((prevOptions) => {
      return prevOptions.filter((option) => option.id !== optionId);
    });
  };

  // Update option value
  const updateOption = (optionId, newValue) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option) =>
        option.id === optionId ? { ...option, value: newValue } : option
      );
    });
  };

  // 3. Update the handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!pollTitle.trim()) {
      return toast.error("Please enter a poll title.");
    }
    const filledOptions = options
      .map((opt) => opt.value.trim())
      .filter((optValue) => optValue !== "");

    if (filledOptions.length < 2) {
      return toast.error("Please provide at least two options.");
    }

    const pollData = {
      title: pollTitle.trim(),
      options: filledOptions,
    };

    // 4. Call the mutation
    createPoll(pollData, {
      onSuccess: (newPollData) => {
        toast.success("Poll created successfully!");
        handlePollCreated(baseURL + "/" + newPollData.shareableUrl); // Pass the shareable URL up
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  return (
    <main className=" relative flex flex-1 justify-center px-4 py-8 sm:py-12  ">
      <div className="w-full max-w-2xl p-6 sm:p-8 md:p-12 rounded-xl border border-white/10 bg-[var(--neutral-800)]/40">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-[var(--neutral-50)] sm:text-4xl md:text-5xl">
            Create a New Poll
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--neutral-200)]">
            Let's get this party started. Or, you know, just decide on lunch.
          </p>
        </div>
        <form className="mt-12 sm:mt-12 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 flex flex-col gap-1">
            <label
              className="text-sm font-medium text-[var(--neutral-200)] px-1"
              htmlFor="poll-title"
            >
              Poll Title
            </label>
            <input
              className="form-input text-lg border border-[var(--neutral-700)] rounded-md p-2 px-4 text-[var(--neutral-50)]"
              id="poll-title"
              placeholder="What's the plan?"
              type="text"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              disabled={isCreating}
            />
          </div>
          <div className="space-y-4 flex flex-col">
            <label className="text-sm font-medium text-[var(--neutral-200)] px-1">
              Options
            </label>
            <div className="space-y-4 rounded-md p-4 border border-white/10  ">
              {options.map((option) => (
                <OptionInputCard
                  key={option.id}
                  option={option}
                  removeOption={removeOption}
                  updateOption={updateOption}
                  canRemove={options.length > 2}
                  disabled={isCreating}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <button
              className="group flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[var(--neutral-700)] py-3 text-center text-[var(--neutral-200)] transition-colors hover:border-[var(--primary-500)] hover:text-[var(--primary-500)] "
              type="button"
              onClick={addOption}
              disabled={isCreating}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Option</span>
            </button>
            <button
              onClick={handleSubmit}
              className={`flex h-14 items-center justify-center rounded-full px-8 text-lg font-bold text-[var(--neutral-900)] shadow-lg transition-all duration-300 ease-in-out active:scale-95 ${
                isCreating ? "bg-[#32c96f]" : "bg-[#38e07b] hover:bg-[#32c96f]"
              }`}
              type="submit"
              disabled={isCreating}
            >
              {isCreating ? <ButtonLoader /> : "Create Poll"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PollCreationForm;
