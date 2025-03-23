"use client";

import { useState } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { SubmitButton } from "../components/SubmitButton";
import { TransactionList } from "../components/TransactionList";

export default function Home() {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income");
  const [transactions, setTransactions] = useState([]);

  const addTransaction = () => {
    if (!description) return; // Impede adicionar sem descrição
    setTransactions([...transactions, { description, type }]);
    setDescription("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md border border-blue-300">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Controle Financeiro
        </h1>

        {/* Input da Descrição */}
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição..."
          className="w-full mb-3 p-3 border rounded-lg text-blue-800 placeholder-gray-500 focus:outline-blue-600"
        />

        {/* Seleção de Tipo */}
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={[
            { value: "income", label: "Entrada" },
            { value: "expense", label: "Saída" },
          ]}
          className="w-full mb-3 p-3 border rounded-lg text-blue-800 focus:outline-blue-600"
        />

        {/* Botão de Adicionar */}
        <button
          onClick={addTransaction}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          Adicionar Transação
        </button>

        {/* Lista de Transações */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
