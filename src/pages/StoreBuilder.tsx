
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wand2, Globe, Palette, Layout, Zap, CheckCircle } from 'lucide-react';

const StoreBuilder = () => {
  const [storeDetails, setStoreDetails] = useState({
    name: '',
    description: '',
    niche: '',
    style: '',
    customDomain: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStore, setGeneratedStore] = useState(null);

  const niches = [
    'Fashion & Apparel', 'Electronics', 'Home & Garden', 'Health & Beauty',
    'Sports & Fitness', 'Pet Supplies', 'Automotive', 'Jewelry & Accessories'
  ];

  const styles = [
    'Modern & Minimalist', 'Bold & Vibrant', 'Elegant & Luxury', 
    'Fun & Playful', 'Professional & Corporate', 'Rustic & Natural'
  ];

  const handleGenerateStore = async () => {
    setIsGenerating(true);
    // Simulate AI store generation
    setTimeout(() => {
      setGeneratedStore({
        layout: 'Modern Grid Layout',
        colors: ['#6366f1', '#f59e0b', '#ffffff'],
        pages: ['Home', 'Products', 'About', 'Contact'],
        features: ['Product Catalog', 'Shopping Cart', 'Customer Reviews', 'Live Chat']
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Build Your Dream Store with <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create a professional dropshipping store in minutes. Our AI analyzes your niche and builds a custom store optimized for conversions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Store Configuration */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Wand2 className="w-6 h-6 mr-2 text-blue-600" />
                AI Store Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Store Name</label>
                <Input
                  placeholder="e.g., TechHub Pro"
                  value={storeDetails.name}
                  onChange={(e) => setStoreDetails({...storeDetails, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Store Description</label>
                <Textarea
                  placeholder="Describe your store concept and target audience..."
                  value={storeDetails.description}
                  onChange={(e) => setStoreDetails({...storeDetails, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Niche</label>
                <Select onValueChange={(value) => setStoreDetails({...storeDetails, niche: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map((niche) => (
                      <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Style Preference</label>
                <Select onValueChange={(value) => setStoreDetails({...storeDetails, style: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Custom Domain (Optional)</label>
                <div className="flex">
                  <Input
                    placeholder="yourstore"
                    value={storeDetails.customDomain}
                    onChange={(e) => setStoreDetails({...storeDetails, customDomain: e.target.value})}
                    className="rounded-r-none"
                  />
                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 border border-l-0 rounded-r-md text-sm text-gray-500">
                    .com
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleGenerateStore}
                disabled={isGenerating || !storeDetails.name || !storeDetails.niche}
                className="w-full h-12"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Store...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate AI Store
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview/Results */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Layout className="w-6 h-6 mr-2 text-purple-600" />
                Store Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!generatedStore ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Layout className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Your AI-generated store will appear here</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{storeDetails.name}</h3>
                      <p className="opacity-90">AI-Generated Store</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Palette className="w-4 h-4 mr-2" />
                      Color Scheme
                    </h4>
                    <div className="flex space-x-2">
                      {generatedStore.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Generated Pages</h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedStore.pages.map((page) => (
                        <Badge key={page} variant="secondary">{page}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Included Features</h4>
                    <div className="space-y-2">
                      {generatedStore.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Globe className="w-5 h-5 mr-2" />
                    Deploy Store
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose AI Store Builder?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Generate a complete store in under 3 minutes with our advanced AI
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Domains</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect your own domain for a professional brand presence
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Palette className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Conversion Optimized</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  AI-designed layouts proven to maximize sales and engagement
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBuilder;
