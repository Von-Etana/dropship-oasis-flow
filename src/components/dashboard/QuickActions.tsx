
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  RefreshCw,
  Store
} from 'lucide-react';

const quickActions = [
  {
    title: 'Import Products',
    description: 'Add new products from suppliers',
    icon: Download,
    color: 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
  },
  {
    title: 'Sync Orders',
    description: 'Update order status across stores',
    icon: RefreshCw,
    color: 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
  },
  {
    title: 'Add Store',
    description: 'Connect a new store',
    icon: Store,
    color: 'bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700'
  },
];

export const QuickActions = () => {
  return (
    <Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start h-auto p-4 hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            <div className={`p-2 rounded-lg ${action.color} mr-4`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">{action.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
