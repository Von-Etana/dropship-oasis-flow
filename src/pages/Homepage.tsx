
import React from 'react';
import { Navigation } from '@/components/homepage/Navigation';
import { HeroSection } from '@/components/homepage/HeroSection';
import { HowItWorks } from '@/components/homepage/HowItWorks';
import { CategoriesCarousel } from '@/components/homepage/CategoriesCarousel';
import { Testimonials } from '@/components/homepage/Testimonials';
import { CTASection } from '@/components/homepage/CTASection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Globe, 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard,
  Shield,
  Headphones,
  ArrowRight,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Stores</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">$2.5M+</div>
              <div className="text-gray-600 dark:text-gray-300">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600 dark:text-gray-300">Products Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From AI-powered store building to automated fulfillment, we provide all the tools to grow your dropshipping business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Store Builder</h3>
                <p className="text-gray-600 mb-4">
                  Create professional stores in minutes with our AI-powered builder. Just upload your company profile and let AI do the rest.
                </p>
                <Button variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Product Import</h3>
                <p className="text-gray-600 mb-4">
                  Import products from Alibaba, AliExpress, and other suppliers with one click. Complete with reviews and ratings.
                </p>
                <Button variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Payment Processing</h3>
                <p className="text-gray-600 mb-4">
                  Integrated Stripe payments, automatic order processing, and seamless checkout experience for your customers.
                </p>
                <Button variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Custom Domains</h3>
                <p className="text-gray-600 mb-4">
                  Use your own domain name to build trust and brand recognition. SSL certificates included.
                </p>
                <Button variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Analytics & Insights</h3>
                <p className="text-gray-600 mb-4">
                  Track your performance with detailed analytics, conversion tracking, and actionable insights.
                </p>
                <Button variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure & Reliable</h3>
                <p className="text-gray-600 mb-4">
                  Enterprise-grade security, 99.9% uptime guarantee, and automatic backups to keep your business safe.
                </p>
                <Button variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">See It In Action</h2>
          <p className="text-xl mb-12 opacity-90">
            Watch how easy it is to build and launch your dropshipping store in under 5 minutes
          </p>
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play className="w-6 h-6 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real entrepreneurs achieving real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                business: "Home Decor Store",
                revenue: "$15,000/month",
                image: "/api/placeholder/100/100",
                quote: "I went from zero to $15k monthly revenue in just 3 months using this platform."
              },
              {
                name: "Mike Rodriguez",
                business: "Fitness Equipment",
                revenue: "$8,500/month",
                image: "/api/placeholder/100/100",
                quote: "The AI store builder saved me weeks of development time. Amazing results!"
              },
              {
                name: "Emma Thompson",
                business: "Fashion Accessories",
                revenue: "$22,000/month",
                image: "/api/placeholder/100/100",
                quote: "Best investment I've made for my business. The automation is incredible."
              }
            ].map((story, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold">{story.name}</h4>
                      <p className="text-sm text-gray-600">{story.business}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{story.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {story.revenue}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <CategoriesCarousel />
      <Testimonials />
      <CTASection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Dropship AI</h3>
              <p className="text-gray-400 mb-4">
                The most powerful dropshipping platform powered by AI.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">Facebook</Button>
                <Button variant="outline" size="sm">Twitter</Button>
                <Button variant="outline" size="sm">LinkedIn</Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">AI Store Builder</a></li>
                <li><a href="#" className="hover:text-white">Product Import</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Live Chat</a></li>
                <li><a href="#" className="hover:text-white">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dropship AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
