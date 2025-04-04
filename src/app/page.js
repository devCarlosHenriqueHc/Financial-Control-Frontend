"use client";

import { useState, useEffect } from "react";
import { Select } from "../components/Select";
import { TransactionList } from "../components/TransactionList";

const API_URL = "http://localhost:8080/api/v1/transactions"; // Caminho atualizado

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [transactions, setTransactions] = useState([]);

  // Buscar transações ao carregar a página
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar transações");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  const addTransaction = async () => {
    if (!name || !description || !amount) {
      alert("Preencha todos os campos!");
      return;
    }

    const newTransaction = {
      name,
      description,
      amount: parseFloat(amount),
      type,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) throw new Error("Erro ao adicionar transação");

      setName("");
      setDescription("");
      setAmount("");
      fetchTransactions(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md border border-blue-300">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Controle Financeiro
        </h1>

        {/* Input do Nome */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome..."
          className="w-full mb-3 p-3 border rounded-lg text-blue-800 placeholder-gray-500 focus:outline-blue-600"
        />

        {/* Input da Descrição */}
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição..."
          className="w-full mb-3 p-3 border rounded-lg text-blue-800 placeholder-gray-500 focus:outline-blue-600"
        />

        {/* Input do Valor */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Digite o valor..."
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
