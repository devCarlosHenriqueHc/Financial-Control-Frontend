"use client";

import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { SubmitButton } from "../components/SubmitButton";
import { TransactionList } from "../components/TransactionList";

const API_URL = "http://localhost:8080/api/v1/transactions";

export default function Home() {
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
    if (!description || !amount) {
      alert("Preencha todos os campos!");
      return;
    }

    const newTransaction = {
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

        {/* Input da Descrição */}
        <Input
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição..."
        />

        {/* Input do Valor */}
        <Input
          label="Valor"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Digite o valor..."
        />

        {/* Seleção de Tipo */}
        <Select value={type} onChange={(e) => setType(e.target.value)} />

        {/* Botão de Adicionar */}
        <SubmitButton onClick={addTransaction} />

        {/* Lista de Transações */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
