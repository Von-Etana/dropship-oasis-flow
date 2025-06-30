
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';

interface ProductsEmptyStateProps {
  searchTerm: string;
}

export const ProductsEmptyState = ({ searchTerm }: ProductsEmptyStateProps) => {
  return (
    <div className="p-12 text-center">
      <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-gray-600 mb-4">
        {searchTerm ? 'Try adjusting your search terms.' : 'Start by importing or adding your first product.'}
      </p>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Add Product
      </Button>
    </div>
  );
};
