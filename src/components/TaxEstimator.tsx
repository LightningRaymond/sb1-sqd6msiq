import React from 'react';
import { Calculator } from 'lucide-react';
import { Transaction } from '../types/finance';
import { calculateTaxableIncome, estimateAnnualTax } from '../utils/taxCalculations';

interface TaxEstimatorProps {
  transactions: Transaction[];
}

export default function TaxEstimator({ transactions }: TaxEstimatorProps) {
  const taxableIncome = calculateTaxableIncome(transactions);
  const estimatedTax = estimateAnnualTax(taxableIncome);
  const effectiveRate = (estimatedTax / taxableIncome) * 100 || 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2" />
        Tax Estimation
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Taxable Income</p>
          <p className="text-2xl font-bold">${taxableIncome.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Estimated Tax</p>
          <p className="text-2xl font-bold">${estimatedTax.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Effective Tax Rate</p>
          <p className="text-2xl font-bold">{effectiveRate.toFixed(1)}%</p>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            This is an estimate based on current income and deductions. Actual tax liability may vary.
            Consult a tax professional for accurate advice.
          </p>
        </div>
      </div>
    </div>
  );
}