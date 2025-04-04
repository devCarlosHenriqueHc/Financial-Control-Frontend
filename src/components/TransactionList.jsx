import React from "react";

export const TransactionList = ({ transactions }) => {
  return (
    <ul className="border p-2 rounded w-full bg-white mt-4 shadow">
      {transactions.length === 0 ? (
        <li className="p-2 text-gray-500 text-center">Nenhuma transação cadastrada.</li>
      ) : (
        transactions.map((t, index) => (
          <li key={index} className="p-2 border-b flex justify-between">
            <div>
              <strong>{t.name}</strong> - {t.description}
            </div>
            <div className={`font-bold ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
              R$ {parseFloat(t.amount).toFixed(2)}
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
