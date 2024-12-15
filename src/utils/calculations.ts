import { Transaction, CategoryTotal, TimePeriodTotal } from '../types/finance';

export const calculateTotalsByCategory = (transactions: Transaction[]): CategoryTotal[] => {
  const totals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(totals).map(([category, total]) => ({
    category: category as Transaction['category'],
    total
  }));
};

export const calculateTimePeriodTotals = (transactions: Transaction[]): TimePeriodTotal => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const weekAgo = today - 7 * 24 * 60 * 60 * 1000;
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).getTime();

  return {
    daily: transactions
      .filter(t => new Date(t.date).getTime() >= today)
      .reduce((sum, t) => sum + t.amount, 0),
    weekly: transactions
      .filter(t => new Date(t.date).getTime() >= weekAgo)
      .reduce((sum, t) => sum + t.amount, 0),
    monthly: transactions
      .filter(t => new Date(t.date).getTime() >= monthAgo)
      .reduce((sum, t) => sum + t.amount, 0)
  };
};