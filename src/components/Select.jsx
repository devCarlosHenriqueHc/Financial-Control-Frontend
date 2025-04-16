import React from "react";

export const Select = ({ value, onChange }) => {
  return (
    <select
      className="bg-input-bg border border-gray-700 p-2 rounded w-full text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-button-bg"
      value={value}
      onChange={onChange}
    >
      <option value="income">Entrada</option>
      <option value="expense">Saída</option>
    </select>
  );
};
