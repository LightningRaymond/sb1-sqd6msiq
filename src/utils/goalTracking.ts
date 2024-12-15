import { FinancialGoal, Transaction } from '../types/finance';

export const calculateGoalProgress = (
  goal: FinancialGoal,
  transactions: Transaction[]
): number => {
  if (!goal.category) {
    return (goal.currentAmount / goal.targetAmount) * 100;
  }

  const relevantTransactions = transactions.filter(
    t => t.category === goal.category && 
    new Date(t.date) <= new Date(goal.deadline)
  );

  const total = relevantTransactions.reduce((sum, t) => {
    return sum + (t.type === 'expense' ? -t.amount : t.amount);
  }, 0);

  return (total / goal.targetAmount) * 100;
};

export const getGoalStatus = (
  goal: FinancialGoal,
  transactions: Transaction[]
): {
  isOnTrack: boolean;
  projectedCompletion: Date;
  suggestedMonthlyAmount: number;
} => {
  const progress = calculateGoalProgress(goal, transactions);
  const now = new Date();
  const deadline = new Date(goal.deadline);
  const monthsLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
  
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const suggestedMonthlyAmount = remainingAmount / monthsLeft;
  
  const isOnTrack = progress >= (
    (now.getTime() - new Date(goal.deadline).getTime()) / 
    (deadline.getTime() - new Date(goal.deadline).getTime())
  ) * 100;

  const projectedCompletion = new Date(
    now.getTime() + (remainingAmount / suggestedMonthlyAmount) * 30 * 24 * 60 * 60 * 1000
  );

  return {
    isOnTrack,
    projectedCompletion,
    suggestedMonthlyAmount
  };
};