
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Truck, 
  Package, 
  CheckCircle, 
  Clock,
  RefreshCw,
  AlertTriangle,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Fulfillment = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const pendingOrders = [
    {
      id: '#1001',
      customer: 'Alice Johnson',
      address: '123 Main St, New York, NY 10001',
      product: 'Wireless Bluetooth Earbuds',
      quantity: 2,
      supplierPrice: '$24.99',
      salePrice: '$59.98',
      supplier: 'AliExpress',
      shippingMethod: 'AliExpress Standard',
      estimatedDays: '15-25'
    },
    {
      id: '#1004',
      customer: 'David Wilson',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      product: 'Bluetooth Speaker Portable',
      quantity: 1,
      supplierPrice: '$28.50',
      salePrice: '$45.99',
      supplier: 'AliExpress',
      shippingMethod: 'ePacket',
      estimatedDays: '10-20'
    },
    {
      id: '#1005',
      customer: 'Emma Brown',
      address: '789 Pine St, Chicago, IL 60601',
      product: 'Phone Stand Adjustable',
      quantity: 3,
      supplierPrice: '$7.99',
      salePrice: '$19.99',
      supplier: 'CJDropshipping',
      shippingMethod: 'CJ Packet',
      estimatedDays: '12-18'
    },
  ];

  const recentFulfillments = [
    {
      id: '#1002',
      customer: 'Bob Smith',
      product: 'Phone Case Clear TPU',
      status: 'shipped',
      tracking: 'LP123456789CN',
      supplier: 'CJDropshipping',
      date: '2024-01-14'
    },
    {
      id: '#1003',
      customer: 'Carol Davis',
      product: 'LED Strip Lights RGB 5M',
      status: 'delivered',
      tracking: 'YT123456789BR',
      supplier: 'Banggood',
      date: '2024-01-13'
    },
  ];

  const handleBulkFulfill = async () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select orders to fulfill.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate fulfillment process
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedOrders([]);
      toast({
        title: "Fulfillment Successful",
        description: `Successfully fulfilled ${selectedOrders.length} orders. Tracking numbers will be updated shortly.`,
      });
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Order Fulfillment</h1>
          <p className="text-gray-600">Automate order placement and tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Status
          </Button>
        </div>
      </div>

      {/* Fulfillment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Pending Orders', value: '12', icon: Clock, color: 'text-yellow-600' },
          { title: 'Processing', value: '8', icon: Package, color: 'text-blue-600' },
          { title: 'Shipped Today', value: '15', icon: Truck, color: 'text-purple-600' },
          { title: 'Delivered', value: '47', icon: CheckCircle, color: 'text-green-600' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Fulfillment Actions */}
      {selectedOrders.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-900">
                  {selectedOrders.length} orders selected
                </span>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="standard">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Shipping</SelectItem>
                      <SelectItem value="express">Express Shipping</SelectItem>
                      <SelectItem value="epacket">ePacket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleBulkFulfill} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Fulfill Selected
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Pending Fulfillment ({pendingOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingOrders.map((order, index) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedOrders([...selectedOrders, order.id]);
                        } else {
                          setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                        }
                      }}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{order.salePrice}</div>
                          <div className="text-sm text-gray-600">Cost: {order.supplierPrice}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Product</div>
                          <div className="text-sm text-gray-600">{order.product} (Qty: {order.quantity})</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Supplier</div>
                          <div className="text-sm text-gray-600">{order.supplier}</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-gray-700">Shipping Address</div>
                            <div className="text-sm text-gray-600">{order.address}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {order.shippingMethod} • {order.estimatedDays} days
                        </div>
                        <Button size="sm">
                          <Package className="w-4 h-4 mr-2" />
                          Fulfill Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Fulfillment Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Default Shipping Method</label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">AliExpress Standard</SelectItem>
                    <SelectItem value="epacket">ePacket</SelectItem>
                    <SelectItem value="express">Express Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Purchase Notes</label>
                <Input placeholder="Special instructions..." />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-fulfill" />
                  <label htmlFor="auto-fulfill" className="text-sm text-gray-700">Auto-fulfill new orders</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="protect-info" defaultChecked />
                  <label htmlFor="protect-info" className="text-sm text-gray-700">Protect customer info</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-paypal" defaultChecked />
                  <label htmlFor="update-paypal" className="text-sm text-gray-700">Auto-update PayPal tracking</label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Fulfillments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentFulfillments.map((order, index) => (
                <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{order.id}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{order.customer}</div>
                  <div className="text-xs text-gray-500">
                    Tracking: {order.tracking}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Fulfillment;
