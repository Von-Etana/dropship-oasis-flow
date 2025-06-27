
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Download, 
  RefreshCw,
  Store,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
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

  const recentOrders = [
    { id: '#1001', customer: 'Alice Johnson', product: 'Wireless Earbuds', amount: '$29.99', status: 'Processing' },
    { id: '#1002', customer: 'Bob Smith', product: 'Phone Case', amount: '$15.99', status: 'Shipped' },
    { id: '#1003', customer: 'Carol Davis', product: 'LED Strip Lights', amount: '$34.99', status: 'Delivered' },
    { id: '#1004', customer: 'David Wilson', product: 'Bluetooth Speaker', amount: '$45.99', status: 'Processing' },
  ];

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

      {/* Stats Grid */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
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

        {/* Recent Orders */}
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
      </div>

      {/* Store Status */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Connected Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Main Shopify Store', status: 'Active', orders: 847, revenue: '$12,450' },
              { name: 'eBay Store', status: 'Active', orders: 234, revenue: '$4,230' },
              { name: 'WooCommerce Store', status: 'Syncing', orders: 156, revenue: '$2,890' },
            ].map((store, index) => (
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
    </div>
  );
};

export default Dashboard;
