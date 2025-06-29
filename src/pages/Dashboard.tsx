
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { StoreStatus } from '@/components/dashboard/StoreStatus';

const Dashboard = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your stores.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions />
        <RecentOrders />
      </div>

      <StoreStatus />
    </div>
  );
};

export default Dashboard;
