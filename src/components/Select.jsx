import React from "react";

export const Select = ({ value, onChange }) => {
  return (
    <select
      className="border rounded p-2 dark:border-gray-600"
      value={value}
      onChange={onChange}
    >
      <option value="income">Entrada</option>
      <option value="expense">Saída</option>
    </select>
  );
};
