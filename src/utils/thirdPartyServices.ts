interface SavingService {
  name: string;
  description: string;
  category: string;
  url: string;
  potentialSavings: string;
}

export const getRecommendedServices = (
  monthlySpending: number,
  topCategories: string[]
): SavingService[] => {
  const services: SavingService[] = [
    {
      name: "Acorns",
      description: "Automatically invest spare change from daily purchases",
      category: "investments",
      url: "https://www.acorns.com",
      potentialSavings: "Average $30/month in investments"
    },
    {
      name: "Rakuten",
      description: "Earn cashback on online shopping",
      category: "shopping",
      url: "https://www.rakuten.com",
      potentialSavings: "2-10% cashback on purchases"
    },
    {
      name: "GasBuddy",
      description: "Find the cheapest gas prices nearby",
      category: "transportation",
      url: "https://www.gasbuddy.com",
      potentialSavings: "Up to $0.25/gallon"
    },
    {
      name: "Ibotta",
      description: "Earn cashback on groceries",
      category: "groceries",
      url: "https://www.ibotta.com",
      potentialSavings: "Average $20/month on groceries"
    }
  ];

  return services.filter(service => 
    topCategories.includes(service.category) ||
    (service.category === 'investments' && monthlySpending > 3000)
  );
};