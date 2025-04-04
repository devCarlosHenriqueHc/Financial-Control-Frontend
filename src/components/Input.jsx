import React from "react";

// Input.jsx atualizado
export const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-3">
      {label && <label className="block text-blue-700 font-semibold mb-1">{label}</label>}
      <input
        className="border p-2 rounded w-full text-blue-800"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
