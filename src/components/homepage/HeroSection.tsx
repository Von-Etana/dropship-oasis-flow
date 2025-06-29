
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Build & Automate Your <span className="text-blue-600">Dropshipping</span> Empire
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create AI-powered stores, import products from Alibaba, automate order fulfillment, and scale your e-commerce business with custom domains and professional designs.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search Alibaba products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg bg-white dark:bg-gray-800"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                <Search className="w-5 h-5 mr-2" />
                Search Products
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/store-builder">
              <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Zap className="w-5 h-5 mr-2" />
                Build AI Store
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" className="h-12 px-8">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8">
              Watch Demo
            </Button>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1 text-blue-500" />
                AI Store Builder
              </div>
              <div className="flex items-center">
                <Search className="w-4 h-4 mr-1 text-green-500" />
                Auto Product Import
              </div>
              <div className="flex items-center">
                <ArrowRight className="w-4 h-4 mr-1 text-purple-500" />
                Custom Domains
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
