
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Store, 
  Plus, 
  Settings, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Download,
  Upload
} from 'lucide-react';

const Stores = () => {
  const [stores, setStores] = useState([
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
  ]);

  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [newStoreData, setNewStoreData] = useState({
    name: '',
    platform: '',
    url: '',
    apiKey: ''
  });

  const connectedStores = stores;

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

  // Button handlers
  const handleAddStore = () => {
    setIsAddStoreOpen(true);
  };

  const handleStoreSync = (storeId: number) => {
    setStores(prev => prev.map(store => 
      store.id === storeId 
        ? { ...store, status: 'syncing', lastSync: 'Syncing...' }
        : store
    ));
    
    // Simulate sync completion
    setTimeout(() => {
      setStores(prev => prev.map(store => 
        store.id === storeId 
          ? { ...store, status: 'active', lastSync: 'Just now' }
          : store
      ));
      toast.success('Store synced successfully');
    }, 3000);
    
    toast.info('Sync started...');
  };

  const handleStoreSettings = (store: any) => {
    setSelectedStore(store);
    setIsSettingsOpen(true);
  };

  const handlePlatformConnect = (platformName: string) => {
    setNewStoreData(prev => ({ ...prev, platform: platformName }));
    setIsAddStoreOpen(true);
    toast.info(`Connecting to ${platformName}...`);
  };

  const handleCreateStore = () => {
    if (!newStoreData.name || !newStoreData.platform || !newStoreData.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newStore = {
      id: stores.length + 1,
      name: newStoreData.name,
      platform: newStoreData.platform,
      url: newStoreData.url,
      status: 'active',
      orders: 0,
      revenue: '$0',
      products: 0,
      lastSync: 'Never',
      logo: availablePlatforms.find(p => p.name === newStoreData.platform)?.logo || '🏪'
    };

    setStores(prev => [...prev, newStore]);
    setNewStoreData({ name: '', platform: '', url: '', apiKey: '' });
    setIsAddStoreOpen(false);
    toast.success('Store connected successfully!');
  };

  const handleMigration = (type: string) => {
    toast.info(`Starting ${type} migration...`);
    // TODO: Implement migration logic
  };

  const handleExportData = () => {
    toast.info('Preparing data export...');
    // TODO: Implement data export
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Store Management</h1>
          <p className="text-gray-600">Connect and manage your online stores</p>
        </div>
        <Button onClick={handleAddStore}>
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
                      <Button size="sm" variant="outline" onClick={() => handleStoreSync(store.id)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleStoreSettings(store)}>
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
                <Button size="sm" variant="outline" className="w-full" onClick={() => handlePlatformConnect(platform.name)}>
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
              <Button size="sm" variant="outline" onClick={() => handleMigration('Shopify ↔ WooCommerce')}>
                Start Migration
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Bulk Data Export</h3>
              <p className="text-sm text-green-700 mb-3">Export all your store data including products, orders, and analytics.</p>
              <Button size="sm" variant="outline" onClick={handleExportData}>
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Store Dialog */}
      <Dialog open={isAddStoreOpen} onOpenChange={setIsAddStoreOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Store</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="store-name">Store Name</Label>
              <Input
                id="store-name"
                value={newStoreData.name}
                onChange={(e) => setNewStoreData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter store name"
              />
            </div>
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Input
                id="platform"
                value={newStoreData.platform}
                onChange={(e) => setNewStoreData(prev => ({ ...prev, platform: e.target.value }))}
                placeholder="Platform (e.g., Shopify, WooCommerce)"
              />
            </div>
            <div>
              <Label htmlFor="store-url">Store URL</Label>
              <Input
                id="store-url"
                value={newStoreData.url}
                onChange={(e) => setNewStoreData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="Enter store URL"
              />
            </div>
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={newStoreData.apiKey}
                onChange={(e) => setNewStoreData(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Enter API key"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddStoreOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateStore}>
                Connect Store
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Store Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Store Settings - {selectedStore?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="settings-name">Store Name</Label>
              <Input
                id="settings-name"
                value={selectedStore?.name || ''}
                placeholder="Store name"
              />
            </div>
            <div>
              <Label htmlFor="settings-url">Store URL</Label>
              <Input
                id="settings-url"
                value={selectedStore?.url || ''}
                placeholder="Store URL"
              />
            </div>
            <div>
              <Label htmlFor="settings-api">API Key</Label>
              <Input
                id="settings-api"
                type="password"
                placeholder="API key"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast.success('Settings updated successfully');
                setIsSettingsOpen(false);
              }}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Stores;
