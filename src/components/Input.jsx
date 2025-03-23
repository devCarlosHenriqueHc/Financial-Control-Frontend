import React from "react";

// Input.jsx
export const Input = ({ value, onChange }) => {
  return <input className="border p-2 rounded w-full" type="text" placeholder="Descrição" value={value} onChange={onChange} />;
};