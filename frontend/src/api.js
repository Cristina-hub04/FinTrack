// Local storage functions
const STORAGE_KEY = 'fintrack_transactions';

export const getTransactions = async () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return data;
};

export const createTransaction = async (tx) => {
  const transactions = await getTransactions();
  const newTx = { ...tx, id: Date.now(), date: tx.date || new Date().toISOString() };
  transactions.push(newTx);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  return newTx;
};

export const deleteTransaction = async (id) => {
  let transactions = await getTransactions();
  transactions = transactions.filter(tx => tx.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  return true;
};
