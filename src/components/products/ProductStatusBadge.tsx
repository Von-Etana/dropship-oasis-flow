
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, X, AlertTriangle } from 'lucide-react';

interface ProductStatusBadgeProps {
  status: string;
}

export const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'archived':
        return <X className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge variant="destructive">Unknown</Badge>;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon(status)}
      {getStatusBadge(status)}
    </div>
  );
};
