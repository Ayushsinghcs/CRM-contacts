import React from "react";
function FieldRenderer({ field, value }) {
    switch (field.type) {
      case "phone":
        return <Field label={field.label} value={<a href={`tel:${value}`}>{value}</a>} />;
      case "email":
        return <Field label={field.label} value={<a href={`mailto:${value}`}>{value}</a>} />;
      default:
        return <Field label={field.label} value={value || "—"} />;
    }
  }
  
  function Field({ label, value }) {
    return (
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm">{value}</div>
      </div>
    );
  }
        
  export default FieldRenderer;
  export { Field };