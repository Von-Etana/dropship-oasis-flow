
import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductTableRow } from './ProductTableRow';

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

interface ProductsTableProps {
  products: Product[];
  selectedProducts: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectProduct: (productId: string, checked: boolean) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ProductsTable = ({
  products,
  selectedProducts,
  onSelectAll,
  onSelectProduct,
  onDeleteProduct,
}: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={selectedProducts.length === products.length && products.length > 0}
              onCheckedChange={onSelectAll}
            />
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <ProductTableRow
            key={product.id}
            product={product}
            isSelected={selectedProducts.includes(product.id)}
            onSelect={(checked) => onSelectProduct(product.id, checked)}
            onDelete={() => onDeleteProduct(product.id)}
          />
        ))}
      </TableBody>
    </Table>
  );
};
