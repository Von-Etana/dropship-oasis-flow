
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Zap, BarChart3, Settings, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  const actions = [
    {
      title: 'Build AI Store',
      description: 'Create a new store with AI',
      icon: <Zap className="w-5 h-5" />,
      link: '/store-builder',
      color: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
    },
    {
      title: 'Import Products',
      description: 'Add products from Alibaba',
      icon: <Plus className="w-5 h-5" />,
      link: '/import',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Search Products',
      description: 'Find winning products',
      icon: <Search className="w-5 h-5" />,
      link: '/import',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'View Analytics',
      description: 'Track your performance',
      icon: <BarChart3 className="w-5 h-5" />,
      link: '/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Manage Stores',
      description: 'Configure your stores',
      icon: <Globe className="w-5 h-5" />,
      link: '/stores',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Settings',
      description: 'Account & preferences',
      icon: <Settings className="w-5 h-5" />,
      link: '/settings',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link key={index} to={action.link}>
            <Button
              variant="ghost"
              className={`h-20 w-full flex flex-col items-center justify-center text-white ${action.color} hover:scale-105 transition-all duration-200`}
            >
              {action.icon}
              <span className="text-sm font-medium mt-1">{action.title}</span>
              <span className="text-xs opacity-80">{action.description}</span>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
