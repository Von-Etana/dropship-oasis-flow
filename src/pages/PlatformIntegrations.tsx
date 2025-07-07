
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  RefreshCw,
  ExternalLink,
  Sync
} from 'lucide-react';

const PlatformIntegrations = () => {
  const [platforms, setPlatforms] = useState([
    {
      id: 1,
      platform: 'shopify',
      name: 'Shopify',
      description: 'Sync with your Shopify store',
      logo: '🛍️',
      isActive: true,
      storeUrl: 'mystore.myshopify.com',
      apiKey: 'shpat_...',
      apiSecret: 'shpss_...',
      syncProducts: true,
      syncOrders: true,
      lastSync: '2 minutes ago',
      status: 'connected'
    },
    {
      id: 2,
      platform: 'woocommerce',
      name: 'WooCommerce',
      description: 'Connect your WordPress WooCommerce store',
      logo: '🏬',
      isActive: false,
      storeUrl: '',
      apiKey: '',
      apiSecret: '',
      syncProducts: true,
      syncOrders: true,
      lastSync: 'Never',
      status: 'disconnected'
    },
    {
      id: 3,
      platform: 'ebay',
      name: 'eBay',
      description: 'Manage your eBay listings',
      logo: '🏪',
      isActive: false,
      storeUrl: '',
      apiKey: '',
      apiSecret: '',
      syncProducts: true,
      syncOrders: true,
      lastSync: 'Never',
      status: 'disconnected'
    },
    {
      id: 4,
      platform: 'wordpress',
      name: 'WordPress',
      description: 'Connect your WordPress site',
      logo: '📝',
      isActive: false,
      storeUrl: '',
      apiKey: '',
      apiSecret: '',
      syncProducts: false,
      syncOrders: false,
      lastSync: 'Never',
      status: 'disconnected'
    }
  ]);

  const togglePlatform = (platformId: number) => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, isActive: !platform.isActive }
          : platform
      )
    );
  };

  const toggleSync = (platformId: number, type: 'products' | 'orders') => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { 
              ...platform, 
              [type === 'products' ? 'syncProducts' : 'syncOrders']: 
                !platform[type === 'products' ? 'syncProducts' : 'syncOrders']
            }
          : platform
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'syncing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'syncing': return RefreshCw;
      case 'error': return AlertCircle;
      default: return Store;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Platform Integrations</h1>
          <p className="text-gray-600">Connect your stores and manage product syncing</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Platform
        </Button>
      </div>

      <Tabs defaultValue="platforms" className="space-y-6">
        <TabsList>
          <TabsTrigger value="platforms">Connected Platforms</TabsTrigger>
          <TabsTrigger value="sync">Sync History</TabsTrigger>
          <TabsTrigger value="settings">Sync Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms">
          <div className="grid gap-6">
            {platforms.map((platform) => {
              const StatusIcon = getStatusIcon(platform.status);
              return (
                <Card key={platform.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{platform.logo}</div>
                        <div>
                          <CardTitle className="text-lg">{platform.name}</CardTitle>
                          <p className="text-sm text-gray-600">{platform.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(platform.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {platform.status.charAt(0).toUpperCase() + platform.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${platform.platform}-url`}>Store URL</Label>
                        <Input
                          id={`${platform.platform}-url`}
                          value={platform.storeUrl}
                          placeholder="Enter store URL"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`${platform.platform}-api-key`}>API Key</Label>
                        <Input
                          id={`${platform.platform}-api-key`}
                          type="password"
                          value={platform.apiKey}
                          placeholder="Enter API key"
                        />
                      </div>
                    </div>

                    {platform.platform !== 'wordpress' && (
                      <div>
                        <Label htmlFor={`${platform.platform}-api-secret`}>API Secret</Label>
                        <Input
                          id={`${platform.platform}-api-secret`}
                          type="password"
                          value={platform.apiSecret}
                          placeholder="Enter API secret"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={platform.isActive}
                            onCheckedChange={() => togglePlatform(platform.id)}
                          />
                          <Label>Enable Integration</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={platform.syncProducts}
                            onCheckedChange={() => toggleSync(platform.id, 'products')}
                          />
                          <Label>Sync Products</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={platform.syncOrders}
                            onCheckedChange={() => toggleSync(platform.id, 'orders')}
                          />
                          <Label>Sync Orders</Label>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Last Sync</p>
                        <p className="font-medium">{platform.lastSync}</p>
                        {platform.storeUrl && (
                          <a 
                            href={`https://${platform.storeUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                          >
                            Visit Store <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <Sync className="w-4 h-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
              <p className="text-sm text-gray-600">Track synchronization activity across platforms</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { platform: 'Shopify', type: 'Products', status: 'Success', count: 25, time: '2 minutes ago' },
                  { platform: 'Shopify', type: 'Orders', status: 'Success', count: 12, time: '5 minutes ago' },
                  { platform: 'WooCommerce', type: 'Products', status: 'Failed', count: 0, time: '1 hour ago' },
                ].map((sync, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">
                        {sync.platform === 'Shopify' ? '🛍️' : '🏬'}
                      </div>
                      <div>
                        <p className="font-medium">{sync.platform} - {sync.type}</p>
                        <p className="text-sm text-gray-600">{sync.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{sync.count} items</p>
                      <Badge variant={sync.status === 'Success' ? 'default' : 'destructive'}>
                        {sync.status}
                      </Badge>
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
                <CardTitle>Sync Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
                  <Input id="sync-interval" type="number" placeholder="15" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Auto-sync on product changes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Sync inventory levels</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Sync pricing changes</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conflict Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="conflict-strategy">When conflicts occur</Label>
                  <select className="w-full p-2 border rounded">
                    <option>Use platform data</option>
                    <option>Use local data</option>
                    <option>Manual review</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Send conflict notifications</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformIntegrations;
