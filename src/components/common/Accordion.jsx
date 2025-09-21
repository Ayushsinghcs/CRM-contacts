import React from "react";

function Accordion({ title, children }) {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="border rounded-md m-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center px-3 py-2 bg-gray-50"
        >
          <span className="text-sm font-medium">{title}</span>
          <span>{open ? "−" : "+"}</span>
        </button>
        {open && <div className="p-3 space-y-2">{children}</div>}
      </div>
    );
  }
  
  export default Accordion;