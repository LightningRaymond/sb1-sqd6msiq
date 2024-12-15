import { Transaction, Category } from '../types/finance';

interface SavingOpportunity {
  category: Category;
  potentialSavings: number;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

const CATEGORY_BENCHMARKS = {
  dining: { threshold: 300, percentage: 0.15 },
  entertainment: { threshold: 200, percentage: 0.10 },
  shopping: { threshold: 500, percentage: 0.20 },
  utilities: { threshold: 250, percentage: 0.08 },
  transportation: { threshold: 400, percentage: 0.12 }
};

export const analyzeSavingOpportunities = (
  transactions: Transaction[]
): SavingOpportunity[] => {
  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' && 
      new Date(t.date).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
    )
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<Category, number>);

  const opportunities: SavingOpportunity[] = [];

  Object.entries(CATEGORY_BENCHMARKS).forEach(([category, benchmark]) => {
    const amount = monthlyExpenses[category as Category] || 0;
    if (amount > benchmark.threshold) {
      const potentialSavings = amount * benchmark.percentage;
      opportunities.push({
        category: category as Category,
        potentialSavings,
        suggestion: generateSuggestion(category as Category, amount),
        priority: getPriority(amount, benchmark.threshold)
      });
    }
  });

  return opportunities.sort((a, b) => b.potentialSavings - a.potentialSavings);
};

const generateSuggestion = (category: Category, amount: number): string => {
  const suggestions = {
    dining: 'Consider meal prepping and cooking at home more often. You could save significantly by reducing restaurant visits.',
    entertainment: 'Look for free local events and activities. Many museums have free admission days.',
    shopping: 'Try the 24-hour rule before making non-essential purchases to reduce impulse buying.',
    utilities: 'Install smart thermostats and LED bulbs to reduce energy consumption.',
    transportation: 'Consider carpooling, public transit, or combining trips to save on fuel costs.'
  };

  return suggestions[category] || 'Review your spending in this category for potential savings.';
};

const getPriority = (amount: number, threshold: number): 'high' | 'medium' | 'low' => {
  const ratio = amount / threshold;
  if (ratio > 2) return 'high';
  if (ratio > 1.5) return 'medium';
  return 'low';
};