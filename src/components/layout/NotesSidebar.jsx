import React from "react";

export default function NotesSidebar({ notes = [] }) {
  return (
    <div className="relative h-full flex">
  

  {/* Notes Section */}
  <div className="flex-1 flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-center px-3 sm:px-4 py-3 border-b bg-white">
      <h2 className="text-sm sm:text-base font-semibold text-gray-800">Notes</h2>
      <div className="flex items-center gap-2">
        <button className="text-xs sm:text-sm  transition-colors">
          + Add
        </button>
        <button
          aria-label="Close notes"
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    {/* Notes list */}
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  </div>
</div>

  );
}

function NoteCard({ note }) {
  return (
    <div className="relative bg-yellow-50 border-l-4 border-yellow-400 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm sm:text-base text-gray-800 break-words pr-8">
        {note.text}
      </p>
      {/* <span className="absolute top-2 right-3 text-xs text-gray-400">
        {note.time}
      </span> */}
    </div>
  );
}

function ToolbarButton({ children, label }) {
  return (
    <button
      title={label}
      className="p-2 hover:bg-gray-200 rounded-md transition-colors"
    >
      {children}
    </button>
  );
}

