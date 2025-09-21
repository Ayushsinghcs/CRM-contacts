import React, { useState } from "react";

export default function Tabs({ tabs = [] }) {
  const [active, setActive] = useState(tabs[0] || null);

  return (
    <div className="flex border-b text-sm font-medium">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`flex-1 py-2 text-center ${
            tab === active
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
