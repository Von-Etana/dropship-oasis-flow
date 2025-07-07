import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Package,
  Upload,
  ShoppingCart,
  Truck,
  BarChart,
  Store,
  Paintbrush,
  Settings,
  Shield,
  Globe
} from 'lucide-react';

interface NavItemProps {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Product Import', href: '/import', icon: Upload },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Fulfillment', href: '/fulfillment', icon: Truck },
    { name: 'Analytics', href: '/analytics', icon: BarChart },
    { name: 'Stores', href: '/stores', icon: Store },
    { name: 'Store Builder', href: '/store-builder', icon: Paintbrush },
    { name: 'Storefront Demo', href: '/storefront', icon: Globe },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Admin Panel', href: '/admin', icon: Shield },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r py-4">
      <div className="px-6 mb-4">
        <h2 className="font-bold text-2xl">GlobalDropship</h2>
        <p className="text-sm text-gray-500">Your dropshipping HQ</p>
      </div>
      <nav className="flex-1">
        <ul>
          {navigation.map((item: NavItemProps) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-6 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto px-6 py-4">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} GlobalDropship
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
