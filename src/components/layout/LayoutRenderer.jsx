import DynamicComponent from "./DynamicComponent";
import React, { useState } from "react";

export default function LayoutRenderer({ layout, configs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Mobile menu toggle */}
      <div className="lg:hidden fixed top-7 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white border border-gray-300 rounded-md p-2 ml-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile-first responsive grid */}
      <div className="px-4 py-4 grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4 lg:grid-cols-[300px_1fr_360px] xl:grid-cols-[320px_1fr_380px] h-screen">
        {layout.columns.map(col => (
          <div
            key={col.id}
            className={`
              ${col.id === "left" 
                ? `border-r border-gray-200 bg-white overflow-y-auto ${
                    mobileMenuOpen ? "fixed inset-y-0 left-0 w-80 z-50 lg:relative lg:w-auto" : "hidden lg:block"
                  }` 
                : col.id === "right" 
                ? "border-l border-gray-200 bg-white overflow-y-auto hidden lg:block" 
                : "bg-gray-50 overflow-y-auto"
              }
              ${col.id === "left" ? "order-1 lg:order-1" : ""}
              ${col.id === "main" ? "order-2 lg:order-2" : ""}
              ${col.id === "right" ? "order-3 lg:order-3" : ""}
            `}
            style={{ width: col.width || "auto" }}
          >
            {/* Responsive padding */}
            <div className="p-3 sm:p-2 lg:p-2 space-y-3 sm:space-y-4 rounded-sm">
              {col.components.map((c, i) => (
                <DynamicComponent key={i} def={c} configs={configs} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed right-side toolbar outside columns (visible on lg+) */}
      <div className="hidden lg:flex fixed top-5 right-0 z-50 flex-col items-center gap-4 py-4 px-2">
        <ToolbarButton title="Clock" label="Clock">🕒</ToolbarButton>
        <ToolbarButton title="Share" label="Share">🔗</ToolbarButton>
        <ToolbarButton title="Copy" label="Copy">📋</ToolbarButton>
        <ToolbarButton title="Notes" label="Notes" active={true}>📄</ToolbarButton>
        <ToolbarButton title="Calendar" label="Calendar">📅</ToolbarButton>
      </div>
    </div>
  );
}

function ToolbarButton({ children, label, active }) {
  return (
    <button
      title={label}
      className={`p-2 rounded-md transition-colors 
        ${active ? "bg-white shadow border border-gray-200" : "hover:bg-gray-200"}`}
    >
      {children}
    </button>
  );
}