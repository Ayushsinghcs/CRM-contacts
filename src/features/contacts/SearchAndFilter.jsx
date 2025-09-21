import React from "react";
function SearchAndFilter() {
    return (
      <div className="flex items-center gap-2 px-2 py-2">
        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            <div className="flex flex-col gap-0.5">
              <div className="w-3 h-0.5 bg-gray-400"></div>
              <div className="w-2 h-0.5 bg-gray-400"></div>
              <div className="w-1 h-0.5 bg-gray-400"></div>
            </div>
          </span>
          <input
            type="text"
            placeholder="Search Fields and Folders"
            className="w-full border rounded-md pl-8 pr-8 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    );
  }
  
export default SearchAndFilter;

