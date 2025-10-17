# FinTrack
# FinTrack

FinTrack is a **lightweight personal finance tracker** built with **React, TailwindCSS, Vite, Node.js, Express, Prisma, and SQLite**. It helps users manage income, expenses, and balances, visualize their spending with charts, and even get **AI-powered financial advice**.

---

## **Features**

- **Add transactions**: Income or Expense with description, category, date, and recurring option.
- **Initial balance**: Set a starting balance to track net money accurately.
- **Transaction list**: Search, filter, and delete transactions.
- **Category Pie Chart**: Visualize spending per category.
- **Live balance calculation**: Updates in real-time with each transaction.
- **AI GPT Adviser**: Ask questions about your transactions and get personalized financial advice.
- **Light theme UI**: Modern pastel design with readable, user-friendly interface.
- **Recurring transactions**: Automatic monthly updates for recurring income/expenses.

---

## **Tech Stack**

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Database**: SQLite with Prisma ORM
- **Charts**: Recharts
- **AI**: OpenAI GPT integration for financial advice

---

## **Installation**

### **Backend**

1. Navigate to the backend folder:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in backend/:
```bash OPENAI_API_KEY=your_openai_api_key_here
PORT=4000
```
4. Run migrations (Prisma + SQLite):
```bash
npx prisma migrate dev --name init
```
5. Start the backend:
```bash
npm run dev
```
### **Frontend**

1. Navigate to the backend folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend:
```bash
npm run dev
```

**The frontend will run on http://localhost:5173.**


**Usage**

Open http://localhost:5173/ in your browser.

Set your initial balance.

Add income and expense transactions with date and category.

View live balance and category pie chart.

Ask the AI GPT Adviser questions about your finances.

Explore transactions with search and filter options.



