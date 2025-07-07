import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Store, Crown, AlertTriangle, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

interface StoreData {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'inactive' | 'suspended';
  products: number;
  orders: number;
  revenue: string;
}

interface UserPlan {
  tier: 'free' | 'pro' | 'enterprise';
  maxStores: number;
  currentStores: number;
  maxProducts: number;
  maxOrders: number;
}

export const MultiStoreManager: React.FC = () => {
  const [userPlan] = useState<UserPlan>({
    tier: 'free',
    maxStores: 1,
    currentStores: 1,
    maxProducts: 100,
    maxOrders: 50
  });

  const [stores] = useState<StoreData[]>([
    {
      id: '1',
      name: 'Main Store',
      platform: 'Shopify',
      status: 'active',
      products: 45,
      orders: 28,
      revenue: '$1,250'
    }
  ]);

  const planNames = {
    free: 'Free Plan',
    pro: 'Professional Plan',
    enterprise: 'Enterprise Plan'
  };

  const planLimits = {
    free: { stores: 1, products: 100, orders: 50 },
    pro: { stores: 5, products: 1000, orders: 500 },
    enterprise: { stores: 25, products: 10000, orders: 5000 }
  };

  const currentLimits = planLimits[userPlan.tier];
  const storeUsagePercent = (userPlan.currentStores / currentLimits.stores) * 100;
  const canAddStore = userPlan.currentStores < currentLimits.stores;

  const handleAddStore = () => {
    if (!canAddStore) {
      toast.error(`You've reached your store limit (${currentLimits.stores}). Please upgrade your plan.`);
      return;
    }
    toast.info('Opening store creation wizard...');
  };

  const handleUpgrade = () => {
    toast.info('Redirecting to pricing page...');
  };

  const getTotalProducts = () => stores.reduce((sum, store) => sum + store.products, 0);
  const getTotalOrders = () => stores.reduce((sum, store) => sum + store.orders, 0);

  const isNearLimit = (current: number, max: number, threshold = 0.8) => {
    return (current / max) >= threshold;
  };

  return (
    <div className="space-y-6">
      {/* Plan Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-500" />
              <CardTitle>Current Plan: {planNames[userPlan.tier]}</CardTitle>
            </div>
            {userPlan.tier === 'free' && (
              <Button size="sm" onClick={handleUpgrade}>
                <Upgrade className="w-4 h-4 mr-2" />
                Upgrade
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Store Usage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Stores</span>
                <span className="text-sm text-gray-600">
                  {userPlan.currentStores}/{currentLimits.stores}
                </span>
              </div>
              <Progress value={storeUsagePercent} className="h-2" />
              {storeUsagePercent >= 100 && (
                <div className="flex items-center text-red-600 text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Store limit reached
                </div>
              )}
            </div>

            {/* Product Usage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Products</span>
                <span className="text-sm text-gray-600">
                  {getTotalProducts()}/{currentLimits.products}
                </span>
              </div>
              <Progress 
                value={(getTotalProducts() / currentLimits.products) * 100} 
                className="h-2" 
              />
              {isNearLimit(getTotalProducts(), currentLimits.products) && (
                <div className="flex items-center text-yellow-600 text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Approaching product limit
                </div>
              )}
            </div>

            {/* Order Usage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Orders (This Month)</span>
                <span className="text-sm text-gray-600">
                  {getTotalOrders()}/{currentLimits.orders}
                </span>
              </div>
              <Progress 
                value={(getTotalOrders() / currentLimits.orders) * 100} 
                className="h-2" 
              />
              {isNearLimit(getTotalOrders(), currentLimits.orders) && (
                <div className="flex items-center text-yellow-600 text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Approaching order limit
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stores Management */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Stores</h2>
        <Button onClick={handleAddStore} disabled={!canAddStore}>
          <Plus className="w-4 h-4 mr-2" />
          Add Store
        </Button>
      </div>

      {/* Store Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Store className="w-5 h-5 mr-2 text-blue-600" />
                  <CardTitle className="text-lg">{store.name}</CardTitle>
                </div>
                <Badge variant={store.status === 'active' ? 'default' : 'secondary'}>
                  {store.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{store.platform}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{store.products}</div>
                  <div className="text-xs text-gray-600">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{store.orders}</div>
                  <div className="text-xs text-gray-600">Orders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{store.revenue}</div>
                  <div className="text-xs text-gray-600">Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Store Placeholder */}
        {canAddStore && (
          <Card 
            className="border-dashed border-2 hover:border-blue-500 cursor-pointer transition-colors"
            onClick={handleAddStore}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500">
              <Plus className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">Add New Store</p>
              <p className="text-sm text-center">
                Connect another platform to expand your business
              </p>
            </CardContent>
          </Card>
        )}

        {/* Upgrade Prompt */}
        {!canAddStore && (
          <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500">
              <Crown className="w-12 h-12 mb-4 text-yellow-500" />
              <p className="text-lg font-medium text-gray-700">Need More Stores?</p>
              <p className="text-sm text-center mb-4">
                Upgrade your plan to connect more stores
              </p>
              <Button size="sm" onClick={handleUpgrade}>
                <Upgrade className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Plan Benefits */}
      {userPlan.tier === 'free' && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Unlock More with Professional Plan
                </h3>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Connect up to 5 stores</li>
                  <li>• 1,000 products per store</li>
                  <li>• Advanced automation features</li>
                  <li>• Priority support</li>
                </ul>
              </div>
              <Button onClick={handleUpgrade}>
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};