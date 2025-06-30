
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

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    }
  });

  const updateProductStatus = useMutation({
    mutationFn: async ({ productIds, status }: { productIds: string[], status: string }) => {
      const { error } = await supabase
        .from('products')
        .update({ status, updated_at: new Date().toISOString() })
        .in('id', productIds);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Products updated successfully');
      setSelectedProducts([]);
    },
    onError: () => {
      toast.error('Failed to update products');
    }
  });

  const deleteProducts = useMutation({
    mutationFn: async (productIds: string[]) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .in('id', productIds);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Products deleted successfully');
      setSelectedProducts([]);
    },
    onError: () => {
      toast.error('Failed to delete products');
    }
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };

  const handleBulkStatusUpdate = (status: string) => {
    updateProductStatus.mutate({ productIds: selectedProducts, status });
  };

  const handleBulkDelete = () => {
    deleteProducts.mutate(selectedProducts);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProducts.mutate([productId]);
  };

  return (
    <div className="space-y-6">
      <ProductsHeader />

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <ProductsFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />

            {selectedProducts.length > 0 && (
              <ProductBulkActions
                selectedCount={selectedProducts.length}
                onUpdateStatus={handleBulkStatusUpdate}
                onDelete={handleBulkDelete}
              />
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {filteredProducts.length === 0 && !isLoading ? (
            <ProductsEmptyState searchTerm={searchTerm} />
          ) : (
            <ProductsTable
              products={filteredProducts}
              selectedProducts={selectedProducts}
              onSelectAll={handleSelectAll}
              onSelectProduct={handleSelectProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
