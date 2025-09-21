import React from "react";
function SidebarHeader({ currentIndex = 1, total = 356 }) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        {/* Back */}
        <button className="text-gray-600 hover:text-gray-800 text-lg">←</button>
  
        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-800">Contact Details</h2>
  
        {/* Pagination */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{currentIndex} of {total}</span>

          <button className="hover:text-gray-700 text-lg">‹</button>
          <button className="hover:text-gray-700 text-lg">›</button>
        </div>
      </div>
    );
  }
  
  export default SidebarHeader;