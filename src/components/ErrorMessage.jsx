import React from "react";
import { TriangleAlert } from "lucide-react";

const ErrorMessage = ({ message = "Something went wrong." }) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-20 px-4"
      role="alert"
    >
      <TriangleAlert className="h-16 w-16 text-[var(--danger-500)] mb-4" />
      <h3 className="text-3xl font-bold text-red-300">Oops!</h3>
      <p className="mt-2 text-red-300">{message}</p>
    </div>
  );
};

export default ErrorMessage;
