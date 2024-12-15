import React, { useState, useMemo } from 'react';
import { Transaction, TransactionType } from '../../types/finance';
import TransactionHeader from './TransactionHeader';
import TransactionTable from './TransactionTable';

interface TransactionListProps {
  transactions: Transaction[];
}

type SortField = 'date' | 'amount' | 'category';
type SortDirection = 'asc' | 'desc';

export default function TransactionList({ transactions }: TransactionListProps) {
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => typeFilter === 'all' || transaction.type === typeFilter)
      .sort((a, b) => {
        const modifier = sortDirection === 'asc' ? 1 : -1;
        if (sortField === 'date') {
          return (new Date(b.date).getTime() - new Date(a.date).getTime()) * modifier;
        }
        if (sortField === 'amount') {
          return (b.amount - a.amount) * modifier;
        }
        return a.category.localeCompare(b.category) * modifier;
      });
  }, [transactions, typeFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <TransactionHeader
        typeFilter={typeFilter}
        onFilterChange={setTypeFilter}
      />
      <TransactionTable
        transactions={filteredTransactions}
        sortField={sortField}
        onSort={handleSort}
      />
    </div>
  );
}