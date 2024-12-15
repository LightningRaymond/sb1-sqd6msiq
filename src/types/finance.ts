export type TransactionType = 'expense' | 'income';

export type Category = 
  | 'salary'
  | 'freelance'
  | 'investments'
  | 'other_income'
  | 'groceries'
  | 'rent'
  | 'utilities'
  | 'entertainment'
  | 'dining'
  | 'transportation'
  | 'shopping'
  | 'healthcare'
  | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  date: string;
  notes?: string;
  taxDeductible?: boolean;
}

export interface CategoryTotal {
  category: Category;
  total: number;
}

export interface TimePeriodTotal {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category?: Category;
}

export interface TaxEstimate {
  annualIncome: number;
  estimatedTax: number;
  deductions: number;
  effectiveRate: number;
}