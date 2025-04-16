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
    <ul className="border border-gray-700 p-2 rounded w-full bg-input-bg mt-4 shadow">
      {transactions.length === 0 ? (
        <li className="p-2 text-gray-400 text-center">Nenhuma transação cadastrada.</li>
      ) : (
        transactions.map((t, index) => (
          <li key={index} className="p-2 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <strong className="text-foreground">{t.description}</strong>
                <div className="text-sm text-gray-400">{formatDate(t.createdAt)}</div>
              </div>
              <div
                className={`font-bold ${
                  t.type === "income" ? "text-gain" : "text-loss"
                }`}
              >
                R$ {parseFloat(t.amount).toFixed(2)}
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
