import React from "react";

export const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="">
          {label}
        </label>
      )}
      <input
        className="border rounded p-2 dark:border-gray-600"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
