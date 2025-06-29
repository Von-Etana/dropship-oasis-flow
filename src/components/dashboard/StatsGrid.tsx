
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  AlertCircle
} from 'lucide-react';

const stats = [
  {
    title: 'Today\'s Revenue',
    value: '$2,847.50',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'Orders Today',
    value: '47',
    change: '+8.3%',
    icon: ShoppingCart,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    title: 'Products Listed',
    value: '1,284',
    change: '+23',
    icon: Package,
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    title: 'Pending Orders',
    value: '12',
    change: '-3',
    icon: AlertCircle,
    color: 'text-orange-600 dark:text-orange-400'
  },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
