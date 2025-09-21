import React from "react";

export default function Tags({ tags = [], label = "Tags" }) {
  if (!tags.length) return null;

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-medium text-gray-400">{label}</label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center px-1 rounded-md text-[10px] font-medium bg-blue-100 text-blue-400"
          >
            {tag}
            <button 
              type="button" 
              className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-600 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              onClick={() => console.log('Remove tag:', tag)}
            >
              <span className="sr-only">Remove {tag}</span>
              <svg 
                className="h-2.5 w-2.5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </span>
        ))}
        <button
          type="button"
          className="inline-flex items-center px-1 rounded-md text-[10px] font-medium bg-blue-100 text-blue-500 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => console.log('Add tag')}
          aria-label="Add tag"
          title="Add tag"
        >
          +
        </button>
      </div>
    </div>
  );
}
