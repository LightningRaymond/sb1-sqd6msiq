import React from 'react';
import { Transaction } from '../../types/finance';

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(transaction.date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          transaction.type === 'income'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {transaction.type === 'income' ? 'Income' : 'Expense'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
        {transaction.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {transaction.notes || '-'}
      </td>
    </tr>
  );
}