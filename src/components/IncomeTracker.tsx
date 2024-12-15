import React, { useState } from 'react';
import { DollarSign, PlusCircle } from 'lucide-react';
import { Transaction, Category } from '../types/finance';

interface IncomeTrackerProps {
  onAddIncome: (income: Omit<Transaction, 'id'>) => void;
}

export default function IncomeTracker({ onAddIncome }: IncomeTrackerProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('salary');
  const [notes, setNotes] = useState('');
  const [taxDeductible, setTaxDeductible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddIncome({
      type: 'income',
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
      notes: notes.trim() || undefined,
      taxDeductible
    });
    setAmount('');
    setCategory('salary');
    setNotes('');
    setTaxDeductible(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2" />
        Record Income
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="investments">Investments</option>
            <option value="other_income">Other Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows={2}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={taxDeductible}
            onChange={(e) => setTaxDeductible(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Tax Deductible
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Income
        </button>
      </div>
    </form>
  );
}