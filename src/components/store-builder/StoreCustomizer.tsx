
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Layout, Type, Image, Settings } from 'lucide-react';

interface CustomizationProps {
  storeData: any;
  onUpdate: (updates: any) => void;
}

export const StoreCustomizer = ({ storeData, onUpdate }: CustomizationProps) => {
  const [activeTab, setActiveTab] = useState('design');

  const colorThemes = [
    { name: 'Ocean Blue', primary: '#0ea5e9', secondary: '#0284c7', accent: '#075985' },
    { name: 'Sunset Orange', primary: '#f97316', secondary: '#ea580c', accent: '#c2410c' },
    { name: 'Forest Green', primary: '#059669', secondary: '#047857', accent: '#065f46' },
    { name: 'Royal Purple', primary: '#7c3aed', secondary: '#6d28d9', accent: '#5b21b6' },
    { name: 'Rose Gold', primary: '#e11d48', secondary: '#be123c', accent: '#9f1239' },
  ];

  const layouts = [
    { name: 'Grid Layout', value: 'grid' },
    { name: 'List Layout', value: 'list' },
    { name: 'Masonry Layout', value: 'masonry' },
    { name: 'Carousel Layout', value: 'carousel' },
  ];

  const fonts = [
    { name: 'Modern Sans', value: 'Inter' },
    { name: 'Classic Serif', value: 'Playfair Display' },
    { name: 'Elegant Script', value: 'Dancing Script' },
    { name: 'Tech Mono', value: 'JetBrains Mono' },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Customize Your Store
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="design" className="flex items-center">
              <Palette className="w-4 h-4 mr-1" />
              Design
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center">
              <Layout className="w-4 h-4 mr-1" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center">
              <Type className="w-4 h-4 mr-1" />
              Fonts
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center">
              <Image className="w-4 h-4 mr-1" />
              Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Color Theme</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {colorThemes.map((theme) => (
                  <div
                    key={theme.name}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => onUpdate({ colorTheme: theme })}
                  >
                    <span className="font-medium">{theme.name}</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Product Layout</Label>
              <Select onValueChange={(value) => onUpdate({ layout: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose layout style" />
                </SelectTrigger>
                <SelectContent>
                  {layouts.map((layout) => (
                    <SelectItem key={layout.value} value={layout.value}>
                      {layout.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Header Style</Label>
              <Select onValueChange={(value) => onUpdate({ headerStyle: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose header style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="centered">Centered Logo</SelectItem>
                  <SelectItem value="full-width">Full Width</SelectItem>
                  <SelectItem value="sticky">Sticky Navigation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Primary Font</Label>
              <Select onValueChange={(value) => onUpdate({ primaryFont: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose primary font" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Heading Font</Label>
              <Select onValueChange={(value) => onUpdate({ headingFont: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose heading font" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div>
              <Label htmlFor="store-tagline" className="text-sm font-medium">Store Tagline</Label>
              <Input
                id="store-tagline"
                placeholder="Your store's tagline..."
                className="mt-2"
                onChange={(e) => onUpdate({ tagline: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="welcome-message" className="text-sm font-medium">Welcome Message</Label>
              <Input
                id="welcome-message"
                placeholder="Welcome to our store!"
                className="mt-2"
                onChange={(e) => onUpdate({ welcomeMessage: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="footer-text" className="text-sm font-medium">Footer Text</Label>
              <Input
                id="footer-text"
                placeholder="© 2024 Your Store Name"
                className="mt-2"
                onChange={(e) => onUpdate({ footerText: e.target.value })}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <Button className="w-full" size="lg">
            Apply Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
