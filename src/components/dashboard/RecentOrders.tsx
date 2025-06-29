
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

const recentOrders = [
  { id: '#1001', customer: 'Alice Johnson', product: 'Wireless Earbuds', amount: '$29.99', status: 'Processing' },
  { id: '#1002', customer: 'Bob Smith', product: 'Phone Case', amount: '$15.99', status: 'Shipped' },
  { id: '#1003', customer: 'Carol Davis', product: 'LED Strip Lights', amount: '$34.99', status: 'Delivered' },
  { id: '#1004', customer: 'David Wilson', product: 'Bluetooth Speaker', amount: '$45.99', status: 'Processing' },
];

export const RecentOrders = () => {
  return (
    <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{order.id}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900 dark:text-white">{order.amount}</div>
                <div className={`text-sm px-2 py-1 rounded-full inline-block ${
                  order.status === 'Processing' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                  order.status === 'Shipped' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                  'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                }`}>
                  {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
