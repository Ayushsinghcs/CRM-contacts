import React, { useEffect, useState } from "react";
import LayoutRenderer from "../components/layout/LayoutRenderer";
import conversationsData from "../data/conversations.json";
import notesData from "../data/notes.json";
import contactsData from "../data/contacts.json";
import layoutData from "../data/layout.json";
import layoutAltData from "../data/layout-alt.json";
import contactFieldsData from "../data/contactFields.json";

export default function ContactDetailsPage() {
  const [layout] = useState(layoutData);
  const [contactFields] = useState(contactFieldsData);
  const [contactData] = useState(contactsData);
  const [conversations] = useState(conversationsData);
  const [notes] = useState(notesData);
  const [useAltLayout, setUseAltLayout] = useState(false);
  const [customLayout, setCustomLayout] = useState(null); // when set, overrides selected layout
  const [editorOpen, setEditorOpen] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    // No network fetch required; data is imported from src/data
  }, []);

  if (!layout || !contactFields || !contactData || !conversations || !notes) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading Contact Details…
      </div>
    );
  }

  // Normalize layout data so LayoutRenderer always receives { columns: [...] }
  const normalizeLayout = (l) => {
    if (!l) return { columns: [] };
    if (Array.isArray(l.columns)) return l;
    // Support alt schema: { sections: [{ id, title, component }] }
    if (Array.isArray(l.sections)) {
      const mappedComponents = l.sections.map((section) => {
        switch (section.component) {
          case "ContactFields":
            return {
              type: "CollapsibleSection",
              props: { title: section.title || "Contact", fields: "contactFields" },
            };
          case "Notes":
            return { type: "NotesSidebar" };
          default:
            return { type: "Accordion", props: { title: section.title || section.id || "Section", fields: "contactFields" } };
        }
      });
      return {
        columns: [
          {
            id: "main",
            components: mappedComponents,
          },
        ],
      };
    }
    // Fallback empty layout
    return { columns: [] };
  };

  const selectedBaseLayout = useAltLayout ? layoutAltData : layout;
  const chosenLayout = customLayout ? customLayout : normalizeLayout(selectedBaseLayout);

  const openEditor = () => {
    // Prefill with the currently applied layout (normalized) so edits reflect what is rendered
    setJsonText(JSON.stringify(chosenLayout, null, 2));
    setJsonError("");
    setEditorOpen(true);
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      // Accept either normalized (has columns) or alt schema (has sections) and normalize
      const normalized = normalizeLayout(parsed);
      if (!Array.isArray(normalized.columns)) {
        throw new Error("Invalid layout: expected an object with a 'columns' array after normalization.");
      }
      setCustomLayout(normalized);
      setJsonError("");
      setEditorOpen(false);
    } catch (e) {
      setJsonError(e.message || "Invalid JSON");
    }
  };

  return (
    <>
      {/* bottom-right controls */}
      <div className="hidden lg:block fixed bottom-10 right-14 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseAltLayout((v) => !v)}
            className="bg-white text-gray-800 border border-gray-300 px-3 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium"
            title="Toggle between default layout.json and layout-alt.json"
          >
            {useAltLayout ? "Alt Layout" : "Default Layout"}
          </button>
          <button
            onClick={openEditor}
            className="bg-primary-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            Edit Layout JSON
          </button>
        </div>
      </div>

      <LayoutRenderer
        layout={chosenLayout}
        configs={{
          contactFields,
          contactData,
          conversations,
          notes,
        }}
      />

      {/* JSON Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setEditorOpen(false)} />
          <div className="relative bg-white w-[95%] max-w-4xl max-h-[85vh] rounded-lg shadow-xl border border-gray-200 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit Layout JSON</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setEditorOpen(false)}>✕</button>
            </div>
            <div className="p-4 overflow-auto">
              <p className="text-sm text-gray-600 mb-2">Edit the JSON below. You can paste either a columns-based layout or a sections-based layout; it will be normalized on save.</p>
              <textarea
                className="w-full h-[50vh] font-mono text-sm border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                spellCheck={false}
              />
              {jsonError && (
                <div className="mt-2 text-sm text-red-600">{jsonError}</div>
              )}
            </div>
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xs text-gray-500">Current source: {useAltLayout ? "layout-alt.json (normalized)" : "layout.json (normalized)"}</div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setEditorOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700"
                  onClick={applyJson}
                >
                  Save & Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

