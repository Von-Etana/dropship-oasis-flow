import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
  className?: string;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ 
  onImageGenerated, 
  className = '' 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const predefinedPrompts = [
    "Modern minimalist product photography of wireless headphones on white background",
    "Lifestyle photo of coffee mug on wooden desk with laptop, warm lighting",
    "Professional e-commerce product shot of smartwatch with sleek design",
    "Cozy home setup with plants and modern furniture, natural lighting",
    "Premium skincare products arranged on marble surface with soft shadows",
    "Trendy fashion accessories laid out on neutral background, studio lighting"
  ];

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw error;

      if (data?.image) {
        setGeneratedImage(data.image);
        onImageGenerated?.(data.image);
        toast.success('Image generated successfully!');
      } else {
        throw new Error('No image data received');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const copyImageUrl = () => {
    if (generatedImage) {
      navigator.clipboard.writeText(generatedImage);
      toast.success('Image URL copied to clipboard!');
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="w-5 h-5 mr-2" />
          AI Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="prompt">Describe the image you want to generate</Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Professional product photo of wireless earbuds on white background"
            className="mt-1"
          />
        </div>

        {/* Predefined Prompts */}
        <div>
          <Label className="text-sm text-gray-600">Quick prompts:</Label>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {predefinedPrompts.slice(0, 3).map((predefinedPrompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left justify-start h-auto py-2 px-3"
                onClick={() => setPrompt(predefinedPrompt)}
              >
                <span className="text-xs text-gray-600 truncate">
                  {predefinedPrompt}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <Button 
          onClick={generateImage} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Image
            </>
          )}
        </Button>

        {generatedImage && (
          <div className="space-y-3">
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={downloadImage}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={copyImageUrl}>
                <Copy className="w-4 h-4 mr-2" />
                Copy URL
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>✨ Powered by AI image generation</p>
          <p>🎨 Perfect for product photos, lifestyle images, and more</p>
        </div>
      </CardContent>
    </Card>
  );
};