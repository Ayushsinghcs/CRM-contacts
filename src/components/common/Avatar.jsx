import React from "react";

function initials(name = "") {
  const parts = name.split(" ").filter(Boolean);
  if (!parts.length) return "U";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export default function Avatar({ name, size = 40, src }) {
  const bgColors = ["bg-indigo-500", "bg-emerald-500", "bg-pink-500", "bg-yellow-500"];
  const color = bgColors[(name?.length ?? 0) % bgColors.length];

  if (src) {
    return <img src={src} alt={name} className={`w-${size} h-${size} rounded-full object-cover`} style={{width: size, height: size}} />
  }

  return (
    <div className={`flex items-center justify-center rounded-full text-white font-medium ${color}`} style={{ width: size, height: size }}>
      {initials(name)}
    </div>
  );
}
