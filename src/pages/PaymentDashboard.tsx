import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowDownToLine, 
  History,
  CreditCard,
  Wallet,
  Eye,
  Download
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PaymentDashboard = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  const balanceData = {
    totalBalance: 25847.50,
    pendingBalance: 2450.00,
    availableBalance: 23397.50,
    totalWithdrawn: 18500.00
  };

  const recentTransactions = [
    {
      id: 'TXN001',
      type: 'sale',
      amount: 89.99,
      provider: 'stripe',
      status: 'completed',
      date: '2024-01-15',
      orderId: 'ORD001'
    },
    {
      id: 'TXN002',
      type: 'withdrawal',
      amount: -500.00,
      provider: 'paystack',
      status: 'processed',
      date: '2024-01-14',
      orderId: null
    },
    {
      id: 'TXN003',
      type: 'sale',
      amount: 124.50,
      provider: 'flutterwave',
      status: 'completed',
      date: '2024-01-14',
      orderId: 'ORD002'
    }
  ];

  const paymentProviders = [
    {
      id: 'stripe',
      name: 'Stripe',
      logo: '💳',
      available: true,
      minWithdrawal: 10,
      processingTime: '1-2 business days'
    },
    {
      id: 'paystack',
      name: 'Paystack',
      logo: '🏦',
      available: true,
      minWithdrawal: 100,
      processingTime: 'Instant to 24 hours'
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      logo: '🌍',
      available: true,
      minWithdrawal: 50,
      processingTime: '1-3 business days'
    }
  ];

  const handleWithdrawal = () => {
    if (!withdrawalAmount || !selectedProvider) return;
    
    // TODO: Implement withdrawal logic
    console.log('Processing withdrawal:', {
      amount: withdrawalAmount,
      provider: selectedProvider
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Payment Dashboard</h1>
          <p className="text-gray-600">Manage your earnings and withdrawals</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${balanceData.totalBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${balanceData.availableBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${balanceData.pendingBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ArrowDownToLine className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Withdrawn</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${balanceData.totalWithdrawn.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="withdraw" className="space-y-6">
        <TabsList>
          <TabsTrigger value="withdraw">Withdraw Funds</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="providers">Payment Providers</TabsTrigger>
        </TabsList>

        <TabsContent value="withdraw">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Withdrawal</CardTitle>
                <p className="text-sm text-gray-600">
                  Withdraw funds to your connected payment provider
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Withdrawal Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Available: ${balanceData.availableBalance.toLocaleString()}
                  </p>
                </div>

                <div>
                  <Label htmlFor="provider">Payment Provider</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentProviders.filter(p => p.available).map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          <div className="flex items-center">
                            <span className="mr-2">{provider.logo}</span>
                            {provider.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleWithdrawal} 
                  className="w-full"
                  disabled={!withdrawalAmount || !selectedProvider}
                >
                  <ArrowDownToLine className="w-4 h-4 mr-2" />
                  Request Withdrawal
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentProviders.map((provider) => (
                  <div key={provider.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{provider.logo}</span>
                        <span className="font-medium">{provider.name}</span>
                      </div>
                      <Badge variant={provider.available ? "default" : "secondary"}>
                        {provider.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Min withdrawal: ${provider.minWithdrawal}</p>
                      <p>Processing time: {provider.processingTime}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <p className="text-sm text-gray-600">Recent payment transactions and withdrawals</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        {transaction.type === 'sale' ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDownToLine className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.type === 'sale' ? 'Sale' : 'Withdrawal'} - {transaction.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.orderId ? `Order: ${transaction.orderId}` : 'Withdrawal request'}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers">
          <div className="grid gap-6">
            {paymentProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{provider.logo}</span>
                      <div>
                        <CardTitle>{provider.name}</CardTitle>
                        <p className="text-sm text-gray-600">Payment provider settings</p>
                      </div>
                    </div>
                    <Badge variant={provider.available ? "default" : "secondary"}>
                      {provider.available ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-600">Min withdrawal:</span> ${provider.minWithdrawal}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-600">Processing time:</span> {provider.processingTime}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentDashboard;