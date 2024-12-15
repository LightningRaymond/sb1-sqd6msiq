import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';
import IncomeTracker from './components/IncomeTracker';
import TaxEstimator from './components/TaxEstimator';
import GoalTracker from './components/GoalTracker';
import ServiceRecommendations from './components/ServiceRecommendations';
import TransactionList from './components/TransactionList';
import { Transaction, FinancialGoal } from './types/finance';
import { calculateTotalsByCategory, calculateTimePeriodTotals } from './utils/calculations';
import { generateSavingTips } from './utils/tips';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [transactions, goals]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID()
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleAddGoal = (newGoal: Omit<FinancialGoal, 'id'>) => {
    const goal: FinancialGoal = {
      ...newGoal,
      id: crypto.randomUUID()
    };
    setGoals(prev => [...prev, goal]);
  };

  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryTotals = calculateTotalsByCategory(expenses);
  const timePeriodTotals = calculateTimePeriodTotals(expenses);
  const savingTips = generateSavingTips(categoryTotals);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Wallet className="w-8 h-8 mr-3 text-indigo-600" />
            Personal Finance Tracker
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Dashboard
                categoryTotals={categoryTotals}
                timePeriodTotals={timePeriodTotals}
                savingTips={savingTips}
              />
              <TransactionList transactions={transactions} />
              <GoalTracker
                goals={goals}
                transactions={transactions}
                onAddGoal={handleAddGoal}
              />
              <ServiceRecommendations transactions={transactions} />
            </div>
            <div className="space-y-6">
              <IncomeTracker onAddIncome={handleAddTransaction} />
              <ExpenseForm onSubmit={handleAddTransaction} />
              <TaxEstimator transactions={transactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;