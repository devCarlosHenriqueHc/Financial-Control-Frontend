import React from "react";

// Função utilitária para formatar data e hora
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const TransactionList = ({ transactions }) => {
  return (
    <ul className="border p-2 rounded w-full bg-white mt-4 shadow">
      {transactions.length === 0 ? (
        <li className="p-2 text-gray-500 text-center">Nenhuma transação cadastrada.</li>
      ) : (
        transactions.map((t, index) => (
          <li key={index} className="p-2 border-b">
            <div className="flex justify-between items-center">
              <div>
                <strong>{t.description}</strong>
                <div className="text-sm text-gray-500">{formatDate(t.createdAt)}</div>
              </div>
              <div className={`font-bold ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                R$ {parseFloat(t.amount).toFixed(2)}
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
