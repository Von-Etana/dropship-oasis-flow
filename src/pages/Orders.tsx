
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Package, 
  Truck,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const orders = [
    {
      id: '#1001',
      customer: 'Alice Johnson',
      email: 'alice@example.com',
      product: 'Wireless Bluetooth Earbuds',
      quantity: 2,
      total: '$59.98',
      status: 'processing',
      store: 'Shopify',
      supplier: 'AliExpress',
      date: '2024-01-15',
      tracking: null
    },
    {
      id: '#1002',
      customer: 'Bob Smith',
      email: 'bob@example.com',
      product: 'Phone Case Clear TPU',
      quantity: 1,
      total: '$15.99',
      status: 'shipped',
      store: 'eBay',
      supplier: 'CJDropshipping',
      date: '2024-01-14',
      tracking: 'LP123456789CN'
    },
    {
      id: '#1003',
      customer: 'Carol Davis',
      email: 'carol@example.com',
      product: 'LED Strip Lights RGB 5M',
      quantity: 1,
      total: '$34.99',
      status: 'delivered',
      store: 'WooCommerce',
      supplier: 'Banggood',
      date: '2024-01-13',
      tracking: 'YT123456789BR'
    },
    {
      id: '#1004',
      customer: 'David Wilson',
      email: 'david@example.com',
      product: 'Bluetooth Speaker Portable',
      quantity: 1,
      total: '$45.99',
      status: 'pending',
      store: 'Shopify',
      supplier: 'AliExpress',
      date: '2024-01-15',
      tracking: null
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      default: return AlertCircle;
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select orders to perform bulk actions.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bulk Action Initiated",
      description: `${action} action started for ${selectedOrders.length} orders.`,
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and fulfill customer orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Orders
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search orders, customers, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedOrders.length} orders selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" onClick={() => handleBulkAction('Fulfill')}>
                  <Package className="w-4 h-4 mr-2" />
                  Bulk Fulfill
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('Mark Shipped')}>
                  <Truck className="w-4 h-4 mr-2" />
                  Mark Shipped
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('Update Tracking')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update Tracking
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <div key={order.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedOrders([...selectedOrders, order.id]);
                      } else {
                        setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                      }
                    }}
                  />
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div>
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.date}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-600">{order.email}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-gray-900">{order.product}</div>
                      <div className="text-sm text-gray-600">Qty: {order.quantity}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-gray-900">{order.total}</div>
                      <div className="text-sm text-gray-600">{order.store}</div>
                    </div>
                    
                    <div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                      {order.tracking && (
                        <div className="text-xs text-gray-600 mt-1">
                          Tracking: {order.tracking}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      {order.status === 'pending' && (
                        <Button size="sm">
                          Fulfill
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
