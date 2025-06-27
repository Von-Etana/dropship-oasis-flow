
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Search, ShoppingCart, TrendingUp, Users, Star, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', count: '50k+ products' },
    { name: 'Fashion', icon: '👕', count: '80k+ products' },
    { name: 'Home & Garden', icon: '🏠', count: '30k+ products' },
    { name: 'Sports', icon: '⚽', count: '25k+ products' },
    { name: 'Beauty', icon: '💄', count: '40k+ products' },
    { name: 'Automotive', icon: '🚗', count: '15k+ products' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Online Store Owner',
      content: 'GlobalDropship Pro increased my profit margins by 35%. The automation saves me 10 hours per week!',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'E-commerce Entrepreneur',
      content: 'Best dropshipping platform I\'ve used. The Alibaba integration is seamless and order fulfillment is automatic.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Small Business Owner',
      content: 'The admin panel gives me complete control over my operations. Customer support is outstanding!',
      rating: 5,
      avatar: '👩‍🚀'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Search & Import',
      description: 'Search Alibaba products and import them with one click',
      icon: <Search className="w-8 h-8 text-blue-500" />
    },
    {
      step: 2,
      title: 'Auto-Fulfill Orders',
      description: 'Orders are automatically processed and fulfilled',
      icon: <ShoppingCart className="w-8 h-8 text-green-500" />
    },
    {
      step: 3,
      title: 'Track & Grow',
      description: 'Monitor performance and scale your business',
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                GlobalDropship Pro
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Automate Your <span className="text-blue-600">Dropshipping</span> Business
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Import products from Alibaba, automate order fulfillment, and scale your e-commerce business with our all-in-one platform.
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Popular Categories</h2>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {categories.map((category, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{category.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{category.count}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Scale Your Business?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of successful dropshippers using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                <Users className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 text-white border-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
