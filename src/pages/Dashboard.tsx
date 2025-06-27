
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
      color: 'text-green-600'
    },
    {
      title: 'Orders Today',
      value: '47',
      change: '+8.3%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Products Listed',
      value: '1,284',
      change: '+23',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Orders',
      value: '12',
      change: '-3',
      icon: AlertCircle,
      color: 'text-orange-600'
    },
  ];

  const quickActions = [
    {
      title: 'Import Products',
      description: 'Add new products from suppliers',
      icon: Download,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Sync Orders',
      description: 'Update order status across stores',
      icon: RefreshCw,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Add Store',
      description: 'Connect a new store',
      icon: Store,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
  ];

  const recentOrders = [
    { id: '#1001', customer: 'Alice Johnson', product: 'Wireless Earbuds', amount: '$29.99', status: 'Processing' },
    { id: '#1002', customer: 'Bob Smith', product: 'Phone Case', amount: '$15.99', status: 'Shipped' },
    { id: '#1003', customer: 'Carol Davis', product: 'LED Strip Lights', amount: '$34.99', status: 'Delivered' },
    { id: '#1004', customer: 'David Wilson', product: 'Bluetooth Speaker', amount: '$45.99', status: 'Processing' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your stores.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:shadow-md transition-shadow"
              >
                <div className={`p-2 rounded-lg ${action.color} mr-4`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{order.amount}</div>
                    <div className={`text-sm px-2 py-1 rounded-full inline-block ${
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
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
      <Card>
        <CardHeader>
          <CardTitle>Connected Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Main Shopify Store', status: 'Active', orders: 847, revenue: '$12,450' },
              { name: 'eBay Store', status: 'Active', orders: 234, revenue: '$4,230' },
              { name: 'WooCommerce Store', status: 'Syncing', orders: 156, revenue: '$2,890' },
            ].map((store, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{store.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    store.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {store.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Orders</div>
                    <div className="font-medium">{store.orders}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Revenue</div>
                    <div className="font-medium">{store.revenue}</div>
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
