import React, { useEffect, useState } from "react";
import LayoutRenderer from "../components/layout/LayoutRenderer";
import conversationsData from "../data/conversations.json";
import notesData from "../data/notes.json";
import contactsData from "../data/contacts.json";
import layoutData from "../data/layout.json";
import contactFieldsData from "../data/contactFields.json";

export default function ContactDetailsPage() {
  const [layout] = useState(layoutData);
  const [contactFields] = useState(contactFieldsData);
  const [contactData] = useState(contactsData);
  const [conversations] = useState(conversationsData);
  const [notes] = useState(notesData);

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

  return (
    <LayoutRenderer
      layout={layout}
      configs={{
        contactFields,
        contactData,
        conversations,
        notes,
      }}
    />
  );
}
