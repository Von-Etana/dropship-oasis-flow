
import React from 'react';
import { Search, ShoppingCart, TrendingUp } from 'lucide-react';

const howItWorks = [
  {
    step: 1,
    title: 'Search & Import',
    description: 'Search Alibaba products and import them with one click',
    icon: <Search className="w-8 h-8 text-blue-500" />
  },
  {
    step: 2,
    title: 'Auto-Fulfill Orders',
    description: 'Orders are automatically processed and fulfilled',
    icon: <ShoppingCart className="w-8 h-8 text-green-500" />
  },
  {
    step: 3,
    title: 'Track & Grow',
    description: 'Monitor performance and scale your business',
    icon: <TrendingUp className="w-8 h-8 text-purple-500" />
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {howItWorks.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                {item.icon}
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
