
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Upload, Info } from 'lucide-react';

export const ProductsHeader = () => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
        <Info className="w-5 h-5 text-blue-600" />
        <div className="flex-1">
          <p className="text-blue-800 font-medium">Demo Mode</p>
          <p className="text-blue-600 text-sm">You're viewing sample products. Connect your store to see your actual inventory.</p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">Demo Data</Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};
