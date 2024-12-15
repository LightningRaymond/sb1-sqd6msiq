import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Transaction } from '../../types/finance';
import TransactionRow from './TransactionRow';

interface TransactionTableProps {
  transactions: Transaction[];
  sortField: string;
  onSort: (field: string) => void;
}

export default function TransactionTable({ transactions, sortField, onSort }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('date')}
            >
              <div className="flex items-center">
                Date
                <ArrowUpDown className="w-4 h-4 ml-1" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('category')}
            >
              <div className="flex items-center">
                Category
                <ArrowUpDown className="w-4 h-4 ml-1" />
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('amount')}
            >
              <div className="flex items-center">
                Amount
                <ArrowUpDown className="w-4 h-4 ml-1" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}