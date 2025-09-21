import React from "react";

export default function Field({ label, value }) {
  return (
    <div className="px-1 sm:px-3 sm:py-1 ">
      <div className="text-xs sm:text-sm uppercase text-gray-400 font-medium tracking-wide mb-1">
        {label}
      </div>
      <div className="text-sm sm:text-base text-gray-900 break-words">
        {value || "—"}
      </div>
    </div>
  );
}