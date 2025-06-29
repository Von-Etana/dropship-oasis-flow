
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

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

export const Testimonials = () => {
  return (
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
  );
};
