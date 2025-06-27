
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Settings,
  BarChart3,
  CreditCard,
  Globe
} from 'lucide-react';

const AdminPanel = () => {
  const stats = [
    { title: 'Total Users', value: '12,543', change: '+12%', icon: Users },
    { title: 'Active Vendors', value: '1,234', change: '+8%', icon: Building2 },
    { title: 'Total Revenue', value: '$543,210', change: '+23%', icon: DollarSign },
    { title: 'Conversion Rate', value: '3.2%', change: '+0.8%', icon: TrendingUp },
  ];

  const recentUsers = [
    { name: 'John Smith', email: 'john@example.com', status: 'Active', plan: 'Pro' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Pending', plan: 'Basic' },
    { name: 'Mike Chen', email: 'mike@example.com', status: 'Active', plan: 'Enterprise' },
    { name: 'Emma Wilson', email: 'emma@example.com', status: 'Suspended', plan: 'Pro' },
  ];

  const disputes = [
    { id: '#D001', user: 'John Doe', vendor: 'TechSupplier Co', amount: '$125.50', status: 'Open' },
    { id: '#D002', user: 'Jane Smith', vendor: 'Fashion Hub', amount: '$89.99', status: 'Escalated' },
    { id: '#D003', user: 'Bob Johnson', vendor: 'Electronics Plus', amount: '$299.99', status: 'Resolved' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage users, vendors, and platform operations</p>
        </div>
        <Button>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <stat.icon className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.status === 'Active' ? 'default' : user.status === 'Pending' ? 'secondary' : 'destructive'}>
                      {user.status}
                    </Badge>
                    <Badge variant="outline">{user.plan}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline">View All Users</Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Platform Fee (%)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Commission on transactions</p>
                </div>
                <Input className="w-20" defaultValue="2.5" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-approve vendors</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Skip manual approval</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Disable public access</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FX Rate & Fees */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            FX Rates & Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-medium mb-3">Current Exchange Rates</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>USD/NGN:</span>
                  <span className="font-mono">₦1,650.00</span>
                </div>
                <div className="flex justify-between">
                  <span>USD/GHS:</span>
                  <span className="font-mono">₵15.20</span>
                </div>
                <div className="flex justify-between">
                  <span>USD/KES:</span>
                  <span className="font-mono">KSh165.50</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="mt-3">Update Rates</Button>
            </div>
            
            <div>
              <p className="font-medium mb-3">Payment Gateway Fees</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Flutterwave:</span>
                  <span>1.4% + ₦100</span>
                </div>
                <div className="flex justify-between">
                  <span>Paystack:</span>
                  <span>1.5% + ₦100</span>
                </div>
                <div className="flex justify-between">
                  <span>Stripe:</span>
                  <span>2.9% + $0.30</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-3">Logistics Rates</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>DHL Express:</span>
                  <span>$45.00/kg</span>
                </div>
                <div className="flex justify-between">
                  <span>4PX Standard:</span>
                  <span>$12.50/kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Cainiao:</span>
                  <span>$8.90/kg</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disputes & Escalations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Order Disputes & Escalations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disputes.map((dispute, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-sm">{dispute.id}</span>
                    <span>{dispute.user}</span>
                    <span className="text-gray-600 dark:text-gray-400">vs</span>
                    <span>{dispute.vendor}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Amount: {dispute.amount}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={dispute.status === 'Open' ? 'secondary' : dispute.status === 'Escalated' ? 'destructive' : 'default'}>
                    {dispute.status}
                  </Badge>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline">View All Disputes</Button>
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">2,543</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Orders Today</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-2xl font-bold text-green-600">$45,210</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Revenue Today</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">156</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">New Users</p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">23</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support Tickets</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
