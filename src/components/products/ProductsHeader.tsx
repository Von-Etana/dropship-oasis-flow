
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';

export const ProductsHeader = () => {
  return (
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
  );
};
