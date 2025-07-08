import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowDownToLine, 
  History,
  CreditCard,
  Wallet,
  Eye,
  Download,
  Settings as SettingsIcon
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import stripeLogo from '@/assets/stripe-logo.svg';
import paystackLogo from '@/assets/paystack-logo.png';
import flutterwaveLogo from '@/assets/flutterwave-logo.svg';

const PaymentDashboard = () => {
  const { toast } = useToast();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedProviderDetails, setSelectedProviderDetails] = useState<any>(null);

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
      logo: stripeLogo,
      available: true,
      minWithdrawal: 10,
      processingTime: '1-2 business days',
      fees: '2.9% + $0.30 per transaction',
      countries: ['US', 'CA', 'UK', 'EU', 'AU']
    },
    {
      id: 'paystack',
      name: 'Paystack',
      logo: paystackLogo,
      available: true,
      minWithdrawal: 100,
      processingTime: 'Instant to 24 hours',
      fees: '1.5% + ₦100 per transaction',
      countries: ['NG', 'GH', 'ZA', 'KE']
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      logo: flutterwaveLogo,
      available: true,
      minWithdrawal: 50,
      processingTime: '1-3 business days',
      fees: '1.4% per transaction',
      countries: ['NG', 'GH', 'KE', 'UG', 'TZ', 'RW']
    }
  ];

  const handleWithdrawal = () => {
    if (!withdrawalAmount || !selectedProvider) {
      toast({
        title: "Error",
        description: "Please enter an amount and select a payment provider",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(withdrawalAmount);
    const provider = paymentProviders.find(p => p.id === selectedProvider);
    
    if (amount < (provider?.minWithdrawal || 0)) {
      toast({
        title: "Error", 
        description: `Minimum withdrawal amount for ${provider?.name} is $${provider?.minWithdrawal}`,
        variant: "destructive"
      });
      return;
    }

    if (amount > balanceData.availableBalance) {
      toast({
        title: "Error",
        description: "Insufficient available balance",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement actual withdrawal API call
    toast({
      title: "Withdrawal Requested",
      description: `$${amount} withdrawal request submitted to ${provider?.name}`,
    });
    
    setWithdrawalAmount('');
    setSelectedProvider('');
  };

  const handleExportReport = () => {
    const csvContent = [
      ['Transaction ID', 'Type', 'Amount', 'Provider', 'Status', 'Date', 'Order ID'],
      ...recentTransactions.map(tx => [
        tx.id,
        tx.type,
        tx.amount,
        tx.provider,
        tx.status,
        tx.date,
        tx.orderId || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "Payment report has been downloaded as CSV",
    });
  };

  const handleViewDetails = (provider: any) => {
    setSelectedProviderDetails(provider);
  };

  const handleConfigure = (providerId: string) => {
    toast({
      title: "Configuration",
      description: `Opening ${providerId} configuration settings...`,
    });
    // TODO: Implement provider configuration
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
        <Button onClick={handleExportReport}>
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
                            <img src={provider.logo} alt={provider.name} className="w-5 h-5 mr-2" />
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
                        <img src={provider.logo} alt={provider.name} className="w-8 h-8 mr-2" />
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
                      <img src={provider.logo} alt={provider.name} className="w-12 h-12" />
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(provider)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <img src={provider.logo} alt={provider.name} className="w-6 h-6 mr-2" />
                              {provider.name} Details
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium">Processing Time</p>
                              <p className="text-sm text-gray-600">{provider.processingTime}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Transaction Fees</p>
                              <p className="text-sm text-gray-600">{provider.fees}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Supported Countries</p>
                              <p className="text-sm text-gray-600">{provider.countries.join(', ')}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Minimum Withdrawal</p>
                              <p className="text-sm text-gray-600">${provider.minWithdrawal}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => handleConfigure(provider.id)}>
                        <SettingsIcon className="w-4 h-4 mr-2" />
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