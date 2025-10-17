import { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { getTransactions, createTransaction, deleteTransaction } from './api';
import {
  PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';



export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [initialBalance, setInitialBalance] = useState(0);
  const [balanceInput, setBalanceInput] = useState('0');

  useEffect(() => { loadTransactions(); }, []);

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  const handleAdd = async (tx) => {
    const newTx = await createTransaction(tx);
    setTransactions([newTx, ...transactions]);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  const handleInitialBalance = (e) => {
    e.preventDefault();
    setInitialBalance(parseFloat(balanceInput) || 0);
  };

  const balance = initialBalance + transactions.reduce((acc, tx) => tx.type === 'INCOME' ? acc + tx.amount : acc - tx.amount, 0);

 
  const income = transactions.filter(tx => tx.type === 'INCOME').reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(tx => tx.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0);
  const pieData = [{ name: 'Income', value: income }, { name: 'Expense', value: expense }];
  const COLORS = ['#4ade80', '#f87171'];

  
  const monthlyData = {};
  transactions.forEach(tx => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!monthlyData[month]) monthlyData[month] = { month, Income: 0, Expense: 0 };
    monthlyData[month][tx.type] += tx.amount;
  });
  const barData = Object.values(monthlyData);

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-400 via-green-100 to-green-700 flex flex-col items-center justify-start py-10">
  <div className="bg-gray-150 shadow-xl rounded-xl w-full max-w-3xl p-6 relative z-10">

        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">FinTrack</h1>

        {/* Initial Balance */}
        <form onSubmit={handleInitialBalance} className="mb-4 flex gap-2 items-center justify-center">
          <input
            type="number"
            step="0.01"
            className="w-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Initial Balance"
            value={balanceInput}
            onChange={(e) => setBalanceInput(e.target.value)}
          />
          <button className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
            Set
          </button>
        </form>

        {/* Balance */}
        <div className="text-center text-xl font-semibold mb-4">
          Balance:{' '}
          <span className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>${balance.toFixed(2)}</span>
        </div>

        {/* Charts */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-1/3 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-2/3 h-64">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#4ade80" />
                <Bar dataKey="Expense" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Form & List */}
        <TransactionForm onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}
