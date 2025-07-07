
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

const AutomatedOrders = () => {
  const [automatedOrders, setAutomatedOrders] = useState([
    {
      id: 1,
      orderId: 'ORD-001',
      supplierName: 'AliExpress',
      supplierOrderId: 'AE-789123',
      status: 'processing',
      trackingNumber: '',
      supplierCost: 15.99,
      profitMargin: 35.5,
      customerEmail: 'customer1@example.com',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      orderId: 'ORD-002',
      supplierName: 'Spocket',
      supplierOrderId: 'SP-456789',
      status: 'shipped',
      trackingNumber: 'SP123456789',
      supplierCost: 24.50,
      profitMargin: 42.3,
      customerEmail: 'customer2@example.com',
      createdAt: '2024-01-14T15:45:00Z'
    },
    {
      id: 3,
      orderId: 'ORD-003',
      supplierName: 'Oberlo',
      supplierOrderId: 'OB-321654',
      status: 'delivered',
      trackingNumber: 'OB987654321',
      supplierCost: 8.75,
      profitMargin: 28.9,
      customerEmail: 'customer3@example.com',
      createdAt: '2024-01-13T09:20:00Z'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      case 'failed': return AlertTriangle;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Automated Orders</h2>
          <p className="text-sm text-gray-600">Track orders automatically sent to suppliers</p>
        </div>
        <Button variant="outline">
          <Package className="w-4 h-4 mr-2" />
          View All Orders
        </Button>
      </div>

      <div className="grid gap-4">
        {automatedOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          return (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <StatusIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{order.orderId}</h3>
                      <p className="text-sm text-gray-600">{order.customerEmail}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Supplier</p>
                    <p className="font-medium">{order.supplierName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Supplier Order ID</p>
                    <p className="font-medium">{order.supplierOrderId || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cost</p>
                    <p className="font-medium">${order.supplierCost}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Profit Margin</p>
                    <p className="font-medium">{order.profitMargin}%</p>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Tracking Number</p>
                        <p className="font-medium">{order.trackingNumber}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Track Package
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <p className="text-xs text-gray-500">
                    Created: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === 'failed' && (
                      <Button variant="outline" size="sm">
                        Retry Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="default-supplier">Default Supplier</Label>
              <select className="w-full p-2 border rounded">
                <option>AliExpress</option>
                <option>Spocket</option>
                <option>Oberlo</option>
                <option>Dropified</option>
              </select>
            </div>
            <div>
              <Label htmlFor="profit-margin">Default Profit Margin (%)</Label>
              <Input id="profit-margin" type="number" placeholder="35" />
            </div>
          </div>
          <div>
            <Label htmlFor="order-notes">Default Order Notes</Label>
            <Input id="order-notes" placeholder="Please ship fast and include tracking" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedOrders;
