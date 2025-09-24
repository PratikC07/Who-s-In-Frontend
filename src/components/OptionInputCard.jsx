import React from "react";
import { X } from "lucide-react";

const OptionInputCard = ({ option, removeOption, updateOption, canRemove }) => {
  return (
    <div className="relative flex items-center  ">
      <input
        className="form-input border border-[var(--neutral-700)] rounded-md p-2 px-4 text-[var(--neutral-50)] w-full "
        placeholder={option.placeholder}
        type="text"
        value={option.value}
        onChange={(e) => updateOption(option.id, e.target.value)}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--neutral-200)] transition-colors hover:bg-[var(--neutral-700)] hover:text-[var(--neutral-50)]"
        type="button"
        onClick={() => removeOption(option.id)}
        disabled={!canRemove}
      >
        <X className="text-xl" />
      </button>
    </div>
  );
};

export default OptionInputCard;
