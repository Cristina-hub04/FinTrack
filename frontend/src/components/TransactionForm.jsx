import { useState } from 'react';

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false); 

  const submit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) return;
    onAdd({
      description,
      amount: parseFloat(amount),
      category,
      type,
      date,
      recurring,
    });
    
    setDescription('');
    setAmount('');
    setCategory('');
    setType('EXPENSE');
    setDate('');
    setRecurring(false);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className="w-full p-3 border border-gray-400 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-400 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Amount"
        type="number"
        step="0.01"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-400 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-400 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <select
        className="w-full p-3 border border-gray-400 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="INCOME">INCOME</option>
        <option value="EXPENSE">EXPENSE</option>
      </select>

      {/* Recurring checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={recurring}
          onChange={e => setRecurring(e.target.checked)}
        />
        <label className="text-white">Recurring Monthly</label>
      </div>

      <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
        Add Transaction
      </button>
    </form>
  );
}
