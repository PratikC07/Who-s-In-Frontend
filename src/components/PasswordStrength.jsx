import React from "react";

const PasswordStrength = ({ password, strength }) => {
  return (
    <div>
      <div className="password-strength-meter mt-2 flex items-center justify-between">
        <div className="flex-grow flex gap-1.5">
          <div
            className={`strength-segment h-1.5 flex-1 rounded-full transition-colors duration-300 ease-in-out ${
              password.length > 0 && strength >= 0
                ? "bg-[#38e07b]"
                : "bg-zinc-700"
            }`}
            id="strength-1"
          ></div>
          <div
            className={`strength-segment h-1.5 flex-1 rounded-full transition-colors duration-300 ease-in-out ${
              password.length > 0 && strength >= 2
                ? "bg-[#38e07b]"
                : "bg-zinc-700"
            }`}
            id="strength-2"
          ></div>
          <div
            className={`strength-segment h-1.5 flex-1 rounded-full transition-colors duration-300 ease-in-out ${
              password.length > 0 && strength >= 4
                ? "bg-[#38e07b]"
                : "bg-zinc-700"
            }`}
            id="strength-3"
          ></div>
        </div>
        {password.length > 0 && (
          <p
            className={`strength-text text-xs ml-3 font-medium text-[#38e07b]`}
            id="strength-text"
          >
            {strength <= 1
              ? "Weak"
              : strength === 2 || strength === 3
              ? "Medium"
              : "Strong"}
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;
