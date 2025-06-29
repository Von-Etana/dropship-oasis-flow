
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stores = [
  { name: 'Main Shopify Store', status: 'Active', orders: 847, revenue: '$12,450' },
  { name: 'eBay Store', status: 'Active', orders: 234, revenue: '$4,230' },
  { name: 'WooCommerce Store', status: 'Syncing', orders: 156, revenue: '$2,890' },
];

export const StoreStatus = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Connected Stores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stores.map((store, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">{store.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  store.status === 'Active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {store.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Orders</div>
                  <div className="font-medium text-gray-900 dark:text-white">{store.orders}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Revenue</div>
                  <div className="font-medium text-gray-900 dark:text-white">{store.revenue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
