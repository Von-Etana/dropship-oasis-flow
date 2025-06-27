
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Download, 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Store,
  Settings,
  Shield,
  Home
} from 'lucide-react';

const navigation = [
  { name: 'Homepage', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Product Import', href: '/import', icon: Download },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Fulfillment', href: '/fulfillment', icon: Truck },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Stores', href: '/stores', icon: Store },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Admin Panel', href: '/admin', icon: Shield },
];

export const Sidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            GlobalDropship Pro
          </h1>
        </div>
        
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900 border-r-2 border-blue-500 text-blue-700 dark:text-blue-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-l-md transition-colors'
                  )
                }
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
