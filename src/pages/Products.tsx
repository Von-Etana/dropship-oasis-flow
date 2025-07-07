import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ProductsHeader } from '@/components/products/ProductsHeader';
import { ProductsFilters } from '@/components/products/ProductsFilters';
import { ProductBulkActions } from '@/components/products/ProductBulkActions';
import { ProductsTable } from '@/components/products/ProductsTable';
import { ProductsEmptyState } from '@/components/products/ProductsEmptyState';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compare_at_price: number;
  images: string[];
  status: 'draft' | 'active' | 'archived';
  inventory_quantity: number;
  sku: string;
  category: string;
  supplier_name: string;
  created_at: string;
  updated_at: string;
}

const demoProducts = [
  {
    id: '1',
    title: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life',
    price: 79.99,
    compare_at_price: 129.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
    status: 'active' as const,
    inventory_quantity: 25,
    sku: 'WBH-001',
    category: 'Electronics',
    supplier_name: 'TechSupplier Co',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 199.99,
    compare_at_price: 299.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
    status: 'active' as const,
    inventory_quantity: 12,
    sku: 'SFW-002',
    category: 'Electronics',
    supplier_name: 'FitTech Ltd',
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-18T11:45:00Z'
  },
  {
    id: '3',
    title: 'Portable Phone Charger',
    description: '10,000mAh power bank with fast charging and multiple ports',
    price: 29.99,
    compare_at_price: 49.99,
    images: ['https://images.unsplash.com/photo-1609592424932-d86e8e0e3d6e?w=400&h=400&fit=crop'],
    status: 'draft' as const,
    inventory_quantity: 50,
    sku: 'PPC-003',
    category: 'Electronics',
    supplier_name: 'PowerTech Inc',
    created_at: '2024-01-12T16:20:00Z',
    updated_at: '2024-01-19T08:30:00Z'
  },
  {
    id: '4',
    title: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with touch control and USB charging port',
    price: 45.99,
    compare_at_price: 69.99,
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'],
    status: 'active' as const,
    inventory_quantity: 8,
    sku: 'LDL-004',
    category: 'Home & Office',
    supplier_name: 'LightCorp',
    created_at: '2024-01-08T12:00:00Z',
    updated_at: '2024-01-17T15:20:00Z'
  },
  {
    id: '5',
    title: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life',
    price: 24.99,
    compare_at_price: 39.99,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'],
    status: 'archived' as const,
    inventory_quantity: 0,
    sku: 'WM-005',
    category: 'Electronics',
    supplier_name: 'MouseTech',
    created_at: '2024-01-05T14:45:00Z',
    updated_at: '2024-01-15T10:15:00Z'
  }
];

const Products = () => {
  const [products] = useState(demoProducts);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleBulkStatusUpdate = (status: string) => {
    toast.success(`Updated ${selectedProducts.length} products to ${status}`);
    setSelectedProducts([]);
  };

  const handleBulkDelete = () => {
    toast.success(`Deleted ${selectedProducts.length} products`);
    setSelectedProducts([]);
  };

  const handleDeleteProduct = (productId: string) => {
    toast.success('Product deleted successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <ProductsHeader />
      
      <ProductsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      {selectedProducts.length > 0 && (
        <ProductBulkActions
          selectedCount={selectedProducts.length}
          onUpdateStatus={handleBulkStatusUpdate}
          onDelete={handleBulkDelete}
        />
      )}

      {filteredProducts.length === 0 ? (
        <ProductsEmptyState searchTerm={searchTerm} />
      ) : (
        <ProductsTable
          products={filteredProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default Products;
