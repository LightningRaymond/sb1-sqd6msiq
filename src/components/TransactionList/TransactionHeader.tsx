import React from 'react';
import { List, Filter } from 'lucide-react';
import { TransactionType } from '../../types/finance';

interface TransactionHeaderProps {
  typeFilter: TransactionType | 'all';
  onFilterChange: (filter: TransactionType | 'all') => void;
}

export default function TransactionHeader({ typeFilter, onFilterChange }: TransactionHeaderProps) {
  return (
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <List className="w-5 h-5 mr-2" />
          Transaction History
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select
              value={typeFilter}
              onChange={(e) => onFilterChange(e.target.value as TransactionType | 'all')}
              className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}