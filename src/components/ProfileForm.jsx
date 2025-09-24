import React from "react";
import { Lock } from "lucide-react";
import Loader from "./Loader.jsx";
import ButtonLoader from "./ButtonLoader.jsx";

const ProfileForm = ({
  formData,
  setFormData,
  handleSave,
  isSaving,
  isDirty,
  isPageBusy,
}) => {
  // console.log("isDirty", isDirty);
  return (
    <div className="w-full p-8 bg-[var(--neutral-800)]/40 rounded-2xl border border-[var(--neutral-700)] backdrop-blur-sm">
      <form className="space-y-4" onSubmit={handleSave}>
        <div>
          <label
            className="block text-sm font-medium text-[var(--neutral-200)] mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full bg-[var(--neutral-700)] border border-[var(--neutral-600)] text-[var(--neutral-50)] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition duration-200"
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={isSaving || isPageBusy}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-[var(--neutral-200)] mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="w-full bg-[var(--neutral-700)]/50 border border-[var(--neutral-700)] text-[var(--neutral-400)] rounded-lg px-4 py-3 cursor-not-allowed"
              disabled
              readOnly
              id="email"
              type="email"
              value={formData.email}
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--neutral-400)] w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-end sm:justify-end pt-4 ">
          <button
            className={`relative w-full sm:w-auto sm:min-w-[180px] flex items-center justify-center gap-2 rounded-full h-12 px-6 text-[var(--neutral-900)] text-base font-bold leading-normal transition-colors cursor-pointer ${
              isSaving || isDirty === false || isPageBusy
                ? "bg-[var(--primary-600)]"
                : "bg-[var(--primary-500)] hover:bg-[var(--primary-600)]"
            }`}
            type="submit"
            onClick={handleSave}
            disabled={isSaving || isDirty === false || isPageBusy}
          >
            {isSaving ? <ButtonLoader /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
