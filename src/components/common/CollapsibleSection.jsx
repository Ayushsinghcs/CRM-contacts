import React from "react";

function CollapsibleSection({ title, children, onAdd }) {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 text-sm sm:text-base font-medium">
        {/* Title */}
        <span className="text-gray-900 truncate">{title}</span>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-indigo-600 flex-shrink-0">
          {/* Add button (show full label on sm+, no extra icon on mobile) */}
          <button
            onClick={onAdd}
            className="flex items-center gap-1 hover:underline transition-colors"
          >
            <span className="hidden sm:inline">+ Add</span>
          </button>
          {/* Collapse toggle button with chevron icon */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Collapse section" : "Expand section"}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <svg
              className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

export default CollapsibleSection;