
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Search, 
  User, 
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {!isMobile && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products, orders..."
                className="pl-10 w-64 lg:w-80 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Search */}
          {isMobile && (
            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
              <Search className="w-5 h-5" />
            </Button>
          )}

          {/* Dark Mode Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <DropdownMenuItem 
                onClick={() => setTheme("light")}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme("dark")}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme("system")}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-gray-600 dark:text-gray-300">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
              3
            </Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                <User className="w-5 h-5" />
                {!isMobile && <span className="ml-2">John Doe</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
