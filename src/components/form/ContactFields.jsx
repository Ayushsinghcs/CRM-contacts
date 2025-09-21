import React from "react";
import FieldRenderer from "./FieldRenderer";

export default function ContactFields({ folders = [], data = {}, compact = false }) {
  return (
    <div className={compact ? "space-y-3" : "space-y-6"}>
      {folders.map((folder, idx) => (
        <Folder key={idx} folder={folder} data={data} compact={compact} />
      ))}
    </div>
  );
}

function Folder({ folder, data, compact }) {
  const [open, setOpen] = React.useState(folder.open ?? true);

  return (
    <div className="border rounded-md">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 text-sm"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{folder.title}</span>
          {folder.subtitle && <span className="text-xs text-gray-400">• {folder.subtitle}</span>}
        </div>
        <div className="text-sm text-gray-500">{open ? "−" : "+"}</div>
      </button>

      {open && (
        <div className={`p-4 grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"}`}>
          {folder.fields.map(field => (
            <div key={field.id} className="min-w-0">
              <FieldRenderer field={field} value={data[field.id]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
