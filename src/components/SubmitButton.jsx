import React from "react";

export const SubmitButton = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 text-white rounded p-2 cursor-pointer"
      onClick={onClick}
    >
      Adicionar
    </button>
  );
};
