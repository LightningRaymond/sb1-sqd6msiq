import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { getRecommendedServices } from '../utils/thirdPartyServices';
import { Transaction } from '../types/finance';

interface ServiceRecommendationsProps {
  transactions: Transaction[];
}

export default function ServiceRecommendations({ transactions }: ServiceRecommendationsProps) {
  const monthlySpending = transactions
    .filter(t => t.type === 'expense' &&
      new Date(t.date).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const topCategories = Array.from(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc.set(t.category, (acc.get(t.category) || 0) + t.amount);
        return acc;
      }, new Map<string, number>())
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category);

  const recommendations = getRecommendedServices(monthlySpending, topCategories);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Sparkles className="w-5 h-5 mr-2" />
        Recommended Services
      </h2>
      <div className="space-y-4">
        {recommendations.map((service) => (
          <div key={service.name} className="border-t pt-4 first:border-t-0 first:pt-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
                <p className="text-sm text-green-600 mt-1">{service.potentialSavings}</p>
              </div>
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                Learn More
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}