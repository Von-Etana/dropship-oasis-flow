
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Plus, 
  Settings, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const Stores = () => {
  const connectedStores = [
    {
      id: 1,
      name: 'Main Shopify Store',
      platform: 'Shopify',
      url: 'mystore.myshopify.com',
      status: 'active',
      orders: 847,
      revenue: '$24,567',
      products: 234,
      lastSync: '2 minutes ago',
      logo: '🛍️'
    },
    {
      id: 2,
      name: 'eBay Electronics',
      platform: 'eBay',
      url: 'ebay.com/usr/mystore',
      status: 'active',
      orders: 234,
      revenue: '$8,945',
      products: 156,
      lastSync: '5 minutes ago',
      logo: '🏪'
    },
    {
      id: 3,
      name: 'WooCommerce Store',
      platform: 'WooCommerce',
      url: 'mystore.com',
      status: 'syncing',
      orders: 156,
      revenue: '$5,432',
      products: 89,
      lastSync: 'Syncing...',
      logo: '🏬'
    },
  ];

  const availablePlatforms = [
    { name: 'Shopify', logo: '🛍️', description: 'Connect your Shopify store' },
    { name: 'WooCommerce', logo: '🏬', description: 'WordPress eCommerce plugin' },
    { name: 'eBay', logo: '🏪', description: 'Online marketplace platform' },
    { name: 'Amazon', logo: '📦', description: 'Amazon Seller Central' },
    { name: 'Etsy', logo: '🎨', description: 'Handmade and vintage marketplace' },
    { name: 'BigCommerce', logo: '🏢', description: 'Enterprise eCommerce platform' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'syncing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'syncing': return RefreshCw;
      case 'error': return AlertCircle;
      default: return Store;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Store Management</h1>
          <p className="text-gray-600">Connect and manage your online stores</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Store
        </Button>
      </div>

      {/* Connected Stores */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Connected Stores ({connectedStores.length})</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {connectedStores.map((store) => {
            const StatusIcon = getStatusIcon(store.status);
            return (
              <Card key={store.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{store.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{store.name}</CardTitle>
                        <p className="text-sm text-gray-600">{store.platform}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(store.status)}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {store.url}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Orders</div>
                      <div className="font-semibold text-gray-900">{store.orders}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Revenue</div>
                      <div className="font-semibold text-gray-900">{store.revenue}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Products</div>
                      <div className="font-semibold text-gray-900">{store.products}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Last sync: {store.lastSync}</span>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add New Store */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Store</CardTitle>
          <p className="text-sm text-gray-600">Connect additional stores to expand your dropshipping operation</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availablePlatforms.map((platform, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-2xl">{platform.logo}</div>
                  <div>
                    <div className="font-medium text-gray-900">{platform.name}</div>
                    <div className="text-sm text-gray-600">{platform.description}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Store Migration */}
      <Card>
        <CardHeader>
          <CardTitle>Store Migration Tools</CardTitle>
          <p className="text-sm text-gray-600">Migrate products and data between different platforms</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Shopify ↔ WooCommerce</h3>
              <p className="text-sm text-blue-700 mb-3">Migrate products, orders, and customer data between Shopify and WooCommerce stores.</p>
              <Button size="sm" variant="outline">
                Start Migration
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Bulk Data Export</h3>
              <p className="text-sm text-green-700 mb-3">Export all your store data including products, orders, and analytics.</p>
              <Button size="sm" variant="outline">
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stores;
