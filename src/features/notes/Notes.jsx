import React from "react";
import dayjs from "dayjs";

export default function Notes({ items = [] }) {
  if (!items.length) return <div className="text-sm text-gray-400">No notes</div>;
  return (
    <div className="space-y-4">
      {items.map(note => (
        <div key={note.id} className="border rounded-md p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{note.author}</div>
            <div className="text-xs text-gray-400">{dayjs(note.timestamp).fromNow?.() ?? dayjs(note.timestamp).format("MMM D")}</div>
          </div>
          <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{note.content}</div>
        </div>
      ))}
    </div>
  );
}
