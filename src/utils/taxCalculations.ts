import { Transaction } from '../types/finance';

const TAX_BRACKETS = [
  { min: 0, max: 11000, rate: 0.10 },
  { min: 11001, max: 44725, rate: 0.12 },
  { min: 44726, max: 95375, rate: 0.22 },
  { min: 95376, max: 182100, rate: 0.24 },
  { min: 182101, max: 231250, rate: 0.32 },
  { min: 231251, max: 578125, rate: 0.35 },
  { min: 578126, max: Infinity, rate: 0.37 }
];

const STANDARD_DEDUCTION = 13850; // 2024 single filer

export const calculateTaxableIncome = (transactions: Transaction[]): number => {
  const annualIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const deductibleExpenses = transactions
    .filter(t => t.type === 'expense' && t.taxDeductible)
    .reduce((sum, t) => sum + t.amount, 0);

  return Math.max(annualIncome - deductibleExpenses - STANDARD_DEDUCTION, 0);
};

export const estimateAnnualTax = (taxableIncome: number): number => {
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of TAX_BRACKETS) {
    const taxableInBracket = Math.min(
      Math.max(0, remainingIncome),
      bracket.max - bracket.min
    );
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
    if (remainingIncome <= 0) break;
  }

  return tax;
};