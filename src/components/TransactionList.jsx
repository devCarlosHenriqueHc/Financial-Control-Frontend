import React from "react";

export const TransactionList = ({ transactions }) => {
  return (
    <ul className="border p-2 rounded w-full">
      {transactions.map((t, index) => (
        <li key={index} className="p-2 border-b">{t.description} - {t.type}</li>
      ))}
    </ul>
  );
};
