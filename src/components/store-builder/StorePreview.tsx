
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Eye, Download, Share2, Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

interface StorePreviewProps {
  storeData: any;
  sections: any[];
}

export const StorePreview = ({ storeData, sections }: StorePreviewProps) => {
  const enabledSections = sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{storeData.name || 'Your Store'}</h2>
          <p className="text-gray-600">{storeData.description || 'Store preview'}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button>
            <Globe className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
            {/* Browser Bar */}
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
                {storeData.domain || `${storeData.subdomain || 'mystore'}.yourdomain.com`}
              </div>
            </div>

            {/* Store Preview */}
            <div 
              className="min-h-[600px]"
              style={{ 
                backgroundColor: storeData.colorTheme?.primary || '#6366f1',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              }}
            >
              {enabledSections.map((section) => (
                <div key={section.id} className="p-8">
                  {section.type === 'hero' && (
                    <div className="text-center text-white">
                      <h1 className="text-5xl font-bold mb-4">
                        {storeData.heroTitle || storeData.name}
                      </h1>
                      <p className="text-xl mb-8">
                        {storeData.heroSubtitle || storeData.description}
                      </p>
                      <Button size="lg" variant="secondary">
                        Shop Now
                      </Button>
                    </div>
                  )}
                  
                  {section.type === 'products' && (
                    <div className="bg-white rounded-lg p-6 mt-8">
                      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border rounded-lg p-4">
                            <div className="h-48 bg-gray-200 rounded mb-4"></div>
                            <h3 className="font-semibold">Product {i}</h3>
                            <p className="text-gray-600">$29.99</p>
                            <Button className="w-full mt-2" size="sm">
                              Add to Cart
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.type === 'about' && (
                    <div className="bg-white rounded-lg p-6 mt-8">
                      <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
                      <p className="text-gray-600 text-center max-w-2xl mx-auto">
                        {storeData.aboutContent || 
                        "We are passionate about providing high-quality products that make a difference in your life. Our commitment to excellence drives everything we do."
                        }
                      </p>
                    </div>
                  )}

                  {section.type === 'testimonials' && (
                    <div className="bg-white rounded-lg p-6 mt-8">
                      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map((i) => (
                          <div key={i} className="border rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              {[1,2,3,4,5].map((star) => (
                                <span key={star} className="text-yellow-400">★</span>
                              ))}
                            </div>
                            <p className="text-gray-600 mb-2">"Great product, excellent service!"</p>
                            <p className="font-semibold">Customer {i}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.type === 'contact' && (
                    <div className="bg-white rounded-lg p-6 mt-8">
                      <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
                      <div className="text-center mb-6">
                        {storeData.socialMedia?.email && (
                          <div className="flex items-center justify-center mb-2">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>{storeData.socialMedia.email}</span>
                          </div>
                        )}
                        {storeData.socialMedia?.phone && (
                          <div className="flex items-center justify-center mb-4">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{storeData.socialMedia.phone}</span>
                          </div>
                        )}
                        {!storeData.socialMedia?.email && !storeData.socialMedia?.phone && (
                          <>
                            <p className="text-gray-600">Email: hello@{storeData.subdomain || 'mystore'}.com</p>
                            <p className="text-gray-600">Phone: (555) 123-4567</p>
                          </>
                        )}
                      </div>
                      
                      {/* Social Media Links */}
                      <div className="flex justify-center space-x-4">
                        {storeData.socialMedia?.facebook && (
                          <a 
                            href={storeData.socialMedia.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                          >
                            <Facebook className="w-5 h-5" />
                          </a>
                        )}
                        {storeData.socialMedia?.instagram && (
                          <a 
                            href={storeData.socialMedia.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
                          >
                            <Instagram className="w-5 h-5" />
                          </a>
                        )}
                        {storeData.socialMedia?.twitter && (
                          <a 
                            href={storeData.socialMedia.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {storeData.socialMedia?.linkedin && (
                          <a 
                            href={storeData.socialMedia.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
