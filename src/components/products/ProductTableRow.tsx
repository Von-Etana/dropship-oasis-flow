
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash2, Package } from 'lucide-react';
import { ProductStatusBadge } from './ProductStatusBadge';

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

interface ProductTableRowProps {
  product: Product;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onDelete: () => void;
}

export const ProductTableRow = ({
  product,
  isSelected,
  onSelect,
  onDelete,
}: ProductTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
        />
      </TableCell>
      <TableCell>
        <ProductStatusBadge status={product.status} />
      </TableCell>
      <TableCell>
        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.title}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <Package className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{product.title}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">
            {product.description}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
          {product.sku || 'N/A'}
        </code>
      </TableCell>
      <TableCell>
        <Badge variant={product.inventory_quantity > 0 ? "default" : "destructive"}>
          {product.inventory_quantity}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm">{product.category || '(empty)'}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">{product.supplier_name || 'N/A'}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm text-gray-500">
          {new Date(product.updated_at).toLocaleDateString()} {new Date(product.updated_at).toLocaleTimeString()}
        </span>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="w-4 h-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
