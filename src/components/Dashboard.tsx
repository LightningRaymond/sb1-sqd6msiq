import React from 'react';
import { BarChart, PieChart, DollarSign } from 'lucide-react';
import { CategoryTotal, TimePeriodTotal } from '../types/finance';

interface DashboardProps {
  categoryTotals: CategoryTotal[];
  timePeriodTotals: TimePeriodTotal;
  savingTips: string[];
}

export default function Dashboard({ categoryTotals, timePeriodTotals, savingTips }: DashboardProps) {
  const totalSpent = categoryTotals.reduce((sum, cat) => sum + cat.total, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Spending Overview
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-2xl font-bold">${timePeriodTotals.daily.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">This Week</p>
            <p className="text-2xl font-bold">${timePeriodTotals.weekly.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-bold">${timePeriodTotals.monthly.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <PieChart className="w-5 h-5 mr-2" />
          Category Breakdown
        </h3>
        <div className="space-y-4">
          {categoryTotals.map(({ category, total }) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-sm capitalize">{category}</span>
              </div>
              <span className="text-sm font-medium">
                ${total.toFixed(2)} ({((total / totalSpent) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart className="w-5 h-5 mr-2" />
          Saving Tips
        </h3>
        <ul className="list-disc list-inside space-y-2">
          {savingTips.map((tip, index) => (
            <li key={index} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}