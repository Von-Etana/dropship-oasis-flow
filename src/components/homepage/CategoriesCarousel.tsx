
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const categories = [
  { name: 'Electronics', icon: '📱', count: '50k+ products' },
  { name: 'Fashion', icon: '👕', count: '80k+ products' },
  { name: 'Home & Garden', icon: '🏠', count: '30k+ products' },
  { name: 'Sports', icon: '⚽', count: '25k+ products' },
  { name: 'Beauty', icon: '💄', count: '40k+ products' },
  { name: 'Automotive', icon: '🚗', count: '15k+ products' },
];

export const CategoriesCarousel = () => {
  return (
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
  );
};
