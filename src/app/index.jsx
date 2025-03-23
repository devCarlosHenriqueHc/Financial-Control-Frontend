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
    setTransactions([...transactions, { description, type }]);
    setDescription(""); // Limpar input após adicionar
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      <Select value={type} onChange={(e) => setType(e.target.value)} />
      <SubmitButton onClick={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

