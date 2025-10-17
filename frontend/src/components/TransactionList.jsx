
const CATEGORY_STYLES = {
  Food: ' bg-yellow-100',
  Salary: ' bg-green-100',
  Entertainment: ' bg-pink-100',
  Travel: ' bg-blue-100',
  Default: ' bg-gray-100'
};

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="mt-6 space-y-2 max-h-80 overflow-y-auto">
      {transactions.map(tx => {
        const catStyle = CATEGORY_STYLES[tx.category] || CATEGORY_STYLES.Default;
        const [icon, bg] = catStyle.split(' ');
        return (
          <div
            key={tx.id}
            className={`flex justify-between items-center p-3 rounded-lg shadow ${bg}`}
          >
            <div>
              <span className="category-icon">{icon}</span>
              <strong>{tx.description}</strong> ({tx.category}) - ${tx.amount.toFixed(2)} [{tx.type}]
              <div className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</div>
            </div>
            <button
              className="text-red-600 hover:text-red-800 font-bold"
              onClick={() => onDelete(tx.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
