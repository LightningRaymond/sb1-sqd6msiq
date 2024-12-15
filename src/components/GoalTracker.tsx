import React, { useState } from 'react';
import { Target, PlusCircle } from 'lucide-react';
import { FinancialGoal, Transaction, Category } from '../types/finance';
import { calculateGoalProgress, getGoalStatus } from '../utils/goalTracking';

interface GoalTrackerProps {
  goals: FinancialGoal[];
  transactions: Transaction[];
  onAddGoal: (goal: Omit<FinancialGoal, 'id'>) => void;
}

export default function GoalTracker({ goals, transactions, onAddGoal }: GoalTrackerProps) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState<Category | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGoal({
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline,
      category: category || undefined
    });
    setName('');
    setTargetAmount('');
    setDeadline('');
    setCategory('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Financial Goals
        </h2>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = calculateGoalProgress(goal, transactions);
            const status = getGoalStatus(goal, transactions);
            
            return (
              <div key={goal.id} className="border-t pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{goal.name}</h3>
                    <p className="text-sm text-gray-500">
                      Target: ${goal.targetAmount.toFixed(2)} by{' '}
                      {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    status.isOnTrack ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {status.isOnTrack ? 'On Track' : 'Behind'}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${Math.min(progress, 100)}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Suggested monthly: ${status.suggestedMonthlyAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Add New Goal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Goal Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Amount</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category (Optional)</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">No specific category</option>
              <option value="savings">Savings</option>
              <option value="investments">Investments</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Goal
          </button>
        </div>
      </form>
    </div>
  );
}