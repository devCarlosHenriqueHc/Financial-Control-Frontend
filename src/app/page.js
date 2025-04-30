"use client";

import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { SubmitButton } from "../components/SubmitButton";
import { TransactionList } from "../components/TransactionList";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_PATH = `${API_BASE_URL}/api/v1/transactions`;

export default function Home() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_PATH);
      if (!response.ok) throw new Error("Erro ao buscar transações");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    } finally {
      setLoading(false);
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

    setLoading(true);
    try {
      const response = await fetch(API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) throw new Error("Erro ao adicionar transação");

      setDescription("");
      setAmount("");
      await fetchTransactions();
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_PATH}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar transação");
      await fetchTransactions();
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const total = totalIncome - totalExpense;

  return (
    <div className="w-full flex justify-center dark:bg-[#222] dark:text-white h-screen">
      <div className="w-[450px] max-w-[450px] flex flex-col gap-2">
        <div className="w-full flex justify-center py-10">
          <p className="text-5xl font-bold">Controle Financeiro</p>
        </div>

        <Input
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva a transação"
        />

        <Input
          label="Montante"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Valor da transação"
        />

        <label className="mt-2 mb-[-5px]">Selecione tipo da transação</label>
        <Select value={type} onChange={(e) => setType(e.target.value)} />

        <button
          onClick={addTransaction}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adicionando..." : "Adicionar Transação"}
        </button>

        <div className="w-full flex justify-between mt-4 px-2 py-3 rounded bg-gray-100 dark:bg-gray-800">
          <div>
            <p className="text-sm text-gray-500">Entradas</p>
            <p className="text-green-500 font-bold">R$ {totalIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Saídas</p>
            <p className="text-red-500 font-bold">R$ {totalExpense.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-bold">R$ {total.toFixed(2)}</p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center gap-2 text-blue-500 font-medium my-2">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Processando...
          </div>
        )}

        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </div>
    </div>
  );
}
