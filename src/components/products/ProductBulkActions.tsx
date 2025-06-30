
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface ProductBulkActionsProps {
  selectedCount: number;
  onUpdateStatus: (status: string) => void;
  onDelete: () => void;
}

export const ProductBulkActions = ({
  selectedCount,
  onUpdateStatus,
  onDelete,
}: ProductBulkActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">
        {selectedCount} products selected
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Actions <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onUpdateStatus('active')}>
            Publish Listings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateStatus('draft')}>
            Hide Listings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateStatus('archived')}>
            Archive Listings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} className="text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
