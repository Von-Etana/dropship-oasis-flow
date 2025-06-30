
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import { StoreCustomizer } from '@/components/store-builder/StoreCustomizer';
import { StorePreview } from '@/components/store-builder/StorePreview';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Zap, 
  Upload, 
  Globe, 
  Palette, 
  CreditCard, 
  Package,
  FileText,
  Wand2,
  Eye,
  Save,
  Download,
  Plus,
  Trash2,
  GripVertical
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StoreSection {
  id: string;
  type: 'hero' | 'products' | 'about' | 'testimonials' | 'contact';
  title: string;
  enabled: boolean;
  order: number;
}

const StoreBuilder = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [buildingProgress, setBuildingProgress] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<File | null>(null);
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    domain: '',
    subdomain: '',
    logo: null as File | null,
    colorTheme: {
      primary: '#6366f1',
      secondary: '#f59e0b',
      accent: '#10b981'
    },
    font: 'Inter',
    template: 'modern'
  });

  const [storeSections, setStoreSections] = useState<StoreSection[]>([
    { id: '1', type: 'hero', title: 'Hero Section', enabled: true, order: 1 },
    { id: '2', type: 'products', title: 'Featured Products', enabled: true, order: 2 },
    { id: '3', type: 'about', title: 'About Us', enabled: true, order: 3 },
    { id: '4', type: 'testimonials', title: 'Customer Reviews', enabled: false, order: 4 },
    { id: '5', type: 'contact', title: 'Contact Info', enabled: true, order: 5 }
  ]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setCompanyProfile(file);
      toast.success('Company profile uploaded successfully!');
    } else {
      toast.error('Please upload a PDF file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(storeSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedSections = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setStoreSections(updatedSections);
  };

  const buildStoreWithAI = async () => {
    setIsBuilding(true);
    setBuildingProgress(0);

    try {
      // Simulate AI building process
      const steps = [
        'Analyzing company profile...',
        'Generating brand identity...',
        'Creating page layouts...',
        'Optimizing for conversions...',
        'Setting up payment processing...',
        'Finalizing store configuration...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBuildingProgress(((i + 1) / steps.length) * 100);
        toast.info(steps[i]);
      }

      // Create store in database
      const { data: store, error } = await supabase
        .from('stores')
        .insert({
          name: storeData.name,
          description: storeData.description,
          domain: storeData.domain || null,
          subdomain: storeData.subdomain,
          primary_color: storeData.colorTheme.primary,
          secondary_color: storeData.colorTheme.secondary,
          font_family: storeData.font,
          status: 'draft',
          settings: {
            sections: storeSections,
            template: storeData.template
          }
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('🎉 Your AI-powered store has been created successfully!');
      setActiveTab('preview');
    } catch (error) {
      console.error('Error building store:', error);
      toast.error('Failed to build store. Please try again.');
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Store Builder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Create a professional e-commerce store in minutes with AI
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup" className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Design
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Company Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    {companyProfile ? (
                      <div>
                        <p className="text-green-600 font-medium">{companyProfile.name}</p>
                        <p className="text-sm text-gray-500">
                          AI will use this to understand your business
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          Drop your company profile here
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF format • Used by AI to build your store
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Store Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="store-name"
                      value={storeData.name}
                      onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                      placeholder="My Amazing Store"
                    />
                  </div>
                  <div>
                    <Label htmlFor="store-description">Description</Label>
                    <Textarea
                      id="store-description"
                      value={storeData.description}
                      onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                      placeholder="Brief description of your store..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <div className="flex">
                      <Input
                        id="subdomain"
                        value={storeData.subdomain}
                        onChange={(e) => setStoreData({...storeData, subdomain: e.target.value})}
                        placeholder="mystore"
                      />
                      <span className="flex items-center px-3 text-sm text-gray-500 bg-gray-100 border border-l-0 rounded-r-md">
                        .yourdomain.com
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="custom-domain">Custom Domain (Premium)</Label>
                    <Input
                      id="custom-domain"
                      value={storeData.domain}
                      onChange={(e) => setStoreData({...storeData, domain: e.target.value})}
                      placeholder="www.mystore.com"
                    />
                    <Badge variant="secondary" className="mt-1">Premium Feature</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {isBuilding && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Wand2 className="w-8 h-8 mx-auto mb-2 text-blue-500 animate-spin" />
                    <h3 className="text-lg font-medium">AI is Building Your Store...</h3>
                  </div>
                  <Progress value={buildingProgress} className="w-full" />
                  <p className="text-center text-sm text-gray-500 mt-2">
                    {buildingProgress}% Complete
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={buildStoreWithAI}
                disabled={!storeData.name || !companyProfile || isBuilding}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                {isBuilding ? 'Building...' : 'Build Store with AI'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="design">
            <StoreCustomizer 
              storeData={storeData} 
              onUpdate={(updates) => setStoreData({...storeData, ...updates})} 
            />
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Sections</CardTitle>
                <p className="text-sm text-gray-500">
                  Drag and drop to reorder sections. Toggle to enable/disable.
                </p>
              </CardHeader>
              <CardContent>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {storeSections.map((section, index) => (
                          <Draggable key={section.id} draggableId={section.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center justify-between p-4 mb-2 bg-white dark:bg-gray-800 border rounded-lg"
                              >
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="w-5 h-5 text-gray-400 mr-3" />
                                  </div>
                                  <span className="font-medium">{section.title}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={section.enabled ? "default" : "secondary"}>
                                    {section.enabled ? "Enabled" : "Disabled"}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const updated = storeSections.map(s =>
                                        s.id === section.id ? {...s, enabled: !s.enabled} : s
                                      );
                                      setStoreSections(updated);
                                    }}
                                  >
                                    {section.enabled ? "Disable" : "Enable"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <StorePreview storeData={storeData} sections={storeSections} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StoreBuilder;
