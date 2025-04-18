import React from "react";

export const TransactionList = ({ transactions }) => {
  function formatDate(date) {
    const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' });
    const day = date.getDate();
    let month = monthFormatter.format(date);
    return `${month}, ${day}`;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <ul className="flex flex-col gap-2 overflow-y-auto my-2">
      {transactions.length === 0 ? (
        <li className="">Nenhuma transação cadastrada.</li>
      ) : (
        transactions.map((transaction, index) => (
          <li key={index} className="flex justify-between border-b border-gray-400 py-2 dark:border-gray-700">
            <div>
              <p>{transaction.description}</p>
              <p className="italic text-xs">{formatDate(new Date(transaction.createdAt))}</p>
            </div>
            {transaction.type === "income" && (
              <p className="font-bold text-green-500">{formatCurrency(transaction.amount)}</p>
            )}
            {transaction.type === "expense" && (
              <p className="font-bold text-red-500">{formatCurrency(transaction.amount)}</p>
            )}
          </li>
        ))
      )}
    </ul>
  );
};
