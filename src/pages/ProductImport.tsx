
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Download, 
  Link, 
  Upload, 
  Globe, 
  Package, 
  Search,
  Filter,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ReviewsImportCard } from '@/components/reviews/ReviewsImportCard';

const ProductImport = () => {
  const [importMethod, setImportMethod] = useState('single');
  const [supplier, setSupplier] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importReviews, setImportReviews] = useState(true);
  const { toast } = useToast();

  const suppliers = [
    { id: 'aliexpress', name: 'AliExpress', logo: '🔸' },
    { id: 'cjdropshipping', name: 'CJDropshipping', logo: '🔷' },
    { id: 'banggood', name: 'Banggood', logo: '🔶' },
    { id: 'gogomall', name: 'Gogomall', logo: '🔺' },
    { id: 'dhgate', name: 'DHgate', logo: '🔹' },
  ];

  const handleImport = async () => {
    if (!supplier) {
      toast({
        title: "Supplier Required",
        description: "Please select a supplier before importing.",
        variant: "destructive",
      });
      return;
    }

    if (importMethod === 'single' && !productUrl) {
      toast({
        title: "Product URL Required",
        description: "Please enter a product URL to import.",
        variant: "destructive",
      });
      return;
    }

    if (importMethod === 'bulk' && !bulkUrls) {
      toast({
        title: "URLs Required",
        description: "Please enter product URLs for bulk import.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false);
      const reviewsText = importReviews ? ' with reviews' : '';
      toast({
        title: "Import Successful",
        description: `Successfully imported ${importMethod === 'bulk' ? bulkUrls.split('\n').length : 1} product(s)${reviewsText} from ${suppliers.find(s => s.id === supplier)?.name}.`,
      });
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Product Import</h1>
          <p className="text-gray-600">Import products from 30+ suppliers with one click</p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Import History
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Import Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Import Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Import Method Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Import Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'single', label: 'Single Product', icon: Package },
                    { id: 'bulk', label: 'Bulk Import', icon: Upload },
                    { id: 'category', label: 'Category URL', icon: Globe },
                  ].map((method) => (
                    <Button
                      key={method.id}
                      variant={importMethod === method.id ? "default" : "outline"}
                      className="h-auto p-4 flex-col space-y-2"
                      onClick={() => setImportMethod(method.id)}
                    >
                      <method.icon className="w-5 h-5" />
                      <span className="text-sm">{method.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Supplier Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Select Supplier</label>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a supplier..." />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((sup) => (
                      <SelectItem key={sup.id} value={sup.id}>
                        <div className="flex items-center">
                          <span className="mr-2">{sup.logo}</span>
                          {sup.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Import Input */}
              {importMethod === 'single' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Product URL</label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="url"
                      placeholder="https://example.com/product-link"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {importMethod === 'bulk' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Product URLs (one per line)</label>
                  <Textarea
                    placeholder="https://example.com/product-1&#10;https://example.com/product-2&#10;https://example.com/product-3"
                    value={bulkUrls}
                    onChange={(e) => setBulkUrls(e.target.value)}
                    rows={8}
                  />
                  <p className="text-sm text-gray-500">
                    {bulkUrls ? bulkUrls.split('\n').filter(url => url.trim()).length : 0} URLs detected
                  </p>
                </div>
              )}

              {importMethod === 'category' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Category URL</label>
                  <Input
                    type="url"
                    placeholder="https://example.com/category-page"
                    className="mb-3"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-600">Max Products</label>
                      <Input type="number" placeholder="50" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Min Rating</label>
                      <Input type="number" placeholder="4.0" step="0.1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Import Toggle */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">Import Product Reviews</div>
                    <div className="text-sm text-blue-700">Include customer reviews and ratings</div>
                  </div>
                </div>
                <Switch 
                  checked={importReviews}
                  onCheckedChange={setImportReviews}
                />
              </div>

              <Button 
                onClick={handleImport} 
                disabled={isImporting}
                className="w-full"
              >
                {isImporting ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Importing Products...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Start Import{importReviews ? ' with Reviews' : ''}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Reviews Preview for Single Product */}
          {importMethod === 'single' && productUrl && supplier && importReviews && (
            <ReviewsImportCard 
              productUrl={productUrl}
              supplier={supplier}
              storeType="shopify"
            />
          )}
        </div>

        {/* Import Settings & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Import Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Auto-publish to:</label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                    <SelectItem value="publish">Publish Immediately</SelectItem>
                    <SelectItem value="scheduled">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Markup Percentage</label>
                <div className="relative">
                  <Input type="number" placeholder="150" className="pr-8" />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Target Store</label>
                <Select defaultValue="shopify">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopify">Main Shopify Store</SelectItem>
                    <SelectItem value="ebay">eBay Store</SelectItem>
                    <SelectItem value="woocommerce">WooCommerce Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {importReviews && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">Review Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Filter low ratings</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Translate reviews</span>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Min rating to import</label>
                      <Select defaultValue="3">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1+ stars</SelectItem>
                          <SelectItem value="2">2+ stars</SelectItem>
                          <SelectItem value="3">3+ stars</SelectItem>
                          <SelectItem value="4">4+ stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Import Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'Today', value: '23', color: 'text-green-600' },
                  { label: 'This Week', value: '156', color: 'text-blue-600' },
                  { label: 'This Month', value: '847', color: 'text-purple-600' },
                  { label: 'Success Rate', value: '94%', color: 'text-green-600' },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
                {importReviews && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Reviews Imported</span>
                      <span className="font-semibold text-orange-600">1,247</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Imports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Imports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { product: 'Wireless Bluetooth Earbuds', supplier: 'AliExpress', status: 'completed', time: '2 minutes ago', reviews: 47 },
              { product: 'LED Strip Lights RGB', supplier: 'CJDropshipping', status: 'processing', time: '5 minutes ago', reviews: 23 },
              { product: 'Phone Case Clear TPU', supplier: 'Banggood', status: 'completed', time: '8 minutes ago', reviews: 15 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-gray-900">{item.product}</div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>from {item.supplier}</span>
                      {importReviews && item.reviews && (
                        <>
                          <span>•</span>
                          <span className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {item.reviews} reviews
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status === 'completed' ? 'Completed' : 'Processing'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductImport;
