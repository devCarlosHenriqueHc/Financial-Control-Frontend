import React from "react";

export const SubmitButton = ({ onClick }) => {
  return (
    <button
      className="bg-button-bg text-white p-2 rounded w-full hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      Adicionar
    </button>
  );
};
