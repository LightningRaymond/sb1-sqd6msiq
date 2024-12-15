import { CategoryTotal } from '../types/finance';

export const generateSavingTips = (categoryTotals: CategoryTotal[]): string[] => {
  const tips: string[] = [];
  
  categoryTotals.forEach(({ category, total }) => {
    if (category === 'dining' && total > 300) {
      tips.push('Consider meal prepping to reduce dining expenses. You could save up to 70% on food costs!');
    }
    if (category === 'entertainment' && total > 200) {
      tips.push('Look for free local events or try some budget-friendly entertainment options.');
    }
    if (category === 'shopping' && total > 500) {
      tips.push('Try implementing a 24-hour rule before making non-essential purchases.');
    }
  });

  return tips.length > 0 ? tips : ['Keep tracking your expenses to receive personalized saving tips!'];
};