import React from "react";

export const Select = ({ value, onChange }) => {
  return (
    <select className="border p-2 rounded w-full" value={value} onChange={onChange}>
      <option value="income">Entrada</option>
      <option value="expense">Saída</option>
    </select>
  );
};
