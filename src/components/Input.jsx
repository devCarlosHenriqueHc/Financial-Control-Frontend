import React from "react";

export const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-foreground font-semibold mb-1">
          {label}
        </label>
      )}
      <input
        className="bg-input-bg border border-gray-700 p-2 rounded w-full text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-bg"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
