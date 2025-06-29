
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Settings, 
  Package, 
  DollarSign,
  Image,
  CheckCircle,
  Globe,
  Star,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ChromeExtensionDemo = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [autoSettings, setAutoSettings] = useState({
    markup: '150',
    store: 'shopify',
    category: 'electronics',
    autofill: true,
    removeWatermarks: true,
    importReviews: true
  });
  const { toast } = useToast();

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      toast({
        title: "Product Imported",
        description: `Successfully imported Wireless Bluetooth Earbuds${autoSettings.importReviews ? ' with 47 reviews' : ''} to your store.`,
      });
    }, 2000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Extension Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span className="font-semibold">GlobalDropship</span>
          </div>
          <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Product Detection */}
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <div className="text-sm font-medium text-green-900">Product Detected</div>
            <div className="text-xs text-green-700">Ready to import</div>
          </div>
        </div>

        {/* Product Preview */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Wireless Bluetooth Earbuds</h3>
                <p className="text-xs text-gray-600">AliExpress • $12.99</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    {renderStars(4)}
                  </div>
                  <span className="text-xs text-gray-500">4.3 (47 reviews)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Import Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Target Store</span>
            <Select value={autoSettings.store} onValueChange={(value) => setAutoSettings({...autoSettings, store: value})}>
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shopify">Shopify</SelectItem>
                <SelectItem value="ebay">eBay</SelectItem>
                <SelectItem value="woo">WooCommerce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Markup</span>
            <div className="flex items-center space-x-1">
              <Input 
                type="number" 
                value={autoSettings.markup}
                onChange={(e) => setAutoSettings({...autoSettings, markup: e.target.value})}
                className="w-16 h-8 text-sm"
              />
              <span className="text-xs text-gray-500">%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Auto-fill details</span>
            <Switch 
              checked={autoSettings.autofill}
              onCheckedChange={(checked) => setAutoSettings({...autoSettings, autofill: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Remove watermarks</span>
            <Switch 
              checked={autoSettings.removeWatermarks}
              onCheckedChange={(checked) => setAutoSettings({...autoSettings, removeWatermarks: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Import reviews</span>
            </div>
            <Switch 
              checked={autoSettings.importReviews}
              onCheckedChange={(checked) => setAutoSettings({...autoSettings, importReviews: checked})}
            />
          </div>

          {autoSettings.importReviews && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Reviews Preview</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-700">47 reviews found</span>
                  <Badge variant="secondary" className="text-xs">4.3 ★</Badge>
                </div>
                <div className="text-xs text-blue-600">
                  "Great quality, fast shipping!" - John D. ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Import Button */}
        <Button 
          onClick={handleImport} 
          disabled={isImporting}
          className="w-full"
        >
          {isImporting ? (
            <>
              <Download className="w-4 h-4 mr-2 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Import Product{autoSettings.importReviews ? ' + Reviews' : ''}
            </>
          )}
        </Button>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2 rounded text-center">
            <div className="font-medium text-gray-900">47</div>
            <div className="text-gray-600">Imported Today</div>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <div className="font-medium text-gray-900">94%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Extension Footer */}
        <div className="pt-3 border-t border-gray-200">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            <Globe className="w-3 h-3 mr-2" />
            Open Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
