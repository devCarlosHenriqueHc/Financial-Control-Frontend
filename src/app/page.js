"use client";

import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { SubmitButton } from "../components/SubmitButton";
import { TransactionList } from "../components/TransactionList";

// URL da API configurada via variável de ambiente (a variável será setada na Vercel)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const API_PATH = `${API_BASE_URL}/transacoes`;

export default function Home() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [transactions, setTransactions] = useState([]);

  // Carregar transações ao montar o componente
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Função para buscar transações
  const fetchTransactions = async () => {
    try {
      const response = await fetch(API_PATH);
      if (!response.ok) throw new Error("Erro ao buscar transações");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  // Função para adicionar uma nova transação
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
      const response = await fetch(API_PATH, {
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

        <Input
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição..."
        />

        <Input
          label="Valor"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Digite o valor..."
        />

        <Select value={type} onChange={(e) => setType(e.target.value)} />

        <SubmitButton onClick={addTransaction} />

        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
