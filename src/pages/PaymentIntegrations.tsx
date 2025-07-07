
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

const PaymentIntegrations = () => {
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({});
  const [paymentProviders, setPaymentProviders] = useState([
    {
      id: 1,
      provider: 'stripe',
      name: 'Stripe',
      description: 'Accept payments online with Stripe',
      logo: '💳',
      isActive: true,
      testMode: false,
      apiKey: 'sk_live_...',
      webhookSecret: 'whsec_...',
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD'],
      fees: '2.9% + 30¢'
    },
    {
      id: 2,
      provider: 'flutterwave',
      name: 'Flutterwave',
      description: 'Accept payments across Africa',
      logo: '🌍',
      isActive: false,
      testMode: true,
      apiKey: '',
      webhookSecret: '',
      supportedCurrencies: ['NGN', 'USD', 'EUR', 'GBP', 'KES'],
      fees: '3.8% + ₦100'
    },
    {
      id: 3,
      provider: 'paystack',
      name: 'Paystack',
      description: 'Accept payments in Nigeria and Ghana',
      logo: '🏦',
      isActive: false,
      testMode: true,
      apiKey: '',
      webhookSecret: '',
      supportedCurrencies: ['NGN', 'USD', 'GHS'],
      fees: '1.5% + ₦100'
    }
  ]);

  const toggleApiKeyVisibility = (providerId: number) => {
    setShowApiKeys(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  const toggleProvider = (providerId: number) => {
    setPaymentProviders(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, isActive: !provider.isActive }
          : provider
      )
    );
  };

  const toggleTestMode = (providerId: number) => {
    setPaymentProviders(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, testMode: !provider.testMode }
          : provider
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Payment Integrations</h1>
          <p className="text-gray-600">Manage your payment providers and process transactions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">Payment Providers</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="providers">
          <div className="grid gap-6">
            {paymentProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{provider.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <p className="text-sm text-gray-600">{provider.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={provider.isActive ? "default" : "secondary"}>
                        {provider.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </Badge>
                      {provider.testMode && (
                        <Badge variant="outline">Test Mode</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${provider.provider}-api-key`}>API Key</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`${provider.provider}-api-key`}
                          type={showApiKeys[provider.id] ? "text" : "password"}
                          value={provider.apiKey}
                          placeholder="Enter API key"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleApiKeyVisibility(provider.id)}
                        >
                          {showApiKeys[provider.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`${provider.provider}-webhook`}>Webhook Secret</Label>
                      <Input
                        id={`${provider.provider}-webhook`}
                        type="password"
                        value={provider.webhookSecret}
                        placeholder="Enter webhook secret"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={provider.isActive}
                          onCheckedChange={() => toggleProvider(provider.id)}
                        />
                        <Label>Enable {provider.name}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={provider.testMode}
                          onCheckedChange={() => toggleTestMode(provider.id)}
                        />
                        <Label>Test Mode</Label>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Transaction Fee</p>
                      <p className="font-medium">{provider.fees}</p>
                      <p className="text-xs text-gray-500">
                        Supports: {provider.supportedCurrencies.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      Test Connection
                    </Button>
                    <Button variant="outline" size="sm">
                      View Docs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <p className="text-sm text-gray-600">Monitor payment transactions across all providers</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">💳</div>
                      <div>
                        <p className="font-medium">Order #00{i}</p>
                        <p className="text-sm text-gray-600">customer{i}@example.com</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(Math.random() * 500 + 50).toFixed(2)}</p>
                      <Badge variant="default">Completed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Input id="default-currency" value="USD" />
                </div>
                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://yourdomain.com/webhooks/payments" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Auto-capture payments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Send payment confirmation emails</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automated Order Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Enable automated supplier orders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Auto-track shipments</Label>
                </div>
                <div>
                  <Label htmlFor="profit-margin">Default Profit Margin (%)</Label>
                  <Input id="profit-margin" type="number" placeholder="30" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentIntegrations;
