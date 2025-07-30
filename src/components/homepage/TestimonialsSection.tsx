import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Entrepreneur", 
    revenue: "$15K/month",
    content: "Zendrop transformed my business. I went from struggling with suppliers to automated fulfillment and $15K monthly revenue in just 4 months.",
    rating: 5,
    avatar: "photo-1494790108755-2616b612b789"
  },
  {
    name: "Marcus Chen",
    role: "Digital Marketer",
    revenue: "$8.5K/month", 
    content: "The product import feature is incredible. I can add hundreds of products in minutes and the auto-fulfillment saves me 20+ hours per week.",
    rating: 5,
    avatar: "photo-1507003211169-0a1dd7228f2d"
  },
  {
    name: "Emma Rodriguez",
    role: "Store Owner",
    revenue: "$22K/month",
    content: "Best investment I've made. The platform handles everything while I focus on marketing. My store looks professional and converts amazingly well.",
    rating: 5,
    avatar: "photo-1438761681033-6461ffad8d80"
  },
  {
    name: "David Kim",
    role: "Fitness Entrepreneur",
    revenue: "$12K/month",
    content: "Started with zero experience and now generating consistent revenue. The support team is incredible and the analytics help me optimize everything.",
    rating: 5,
    avatar: "photo-1472099645785-5658abf4ff4e"
  },
  {
    name: "Lisa Wang", 
    role: "Fashion Retailer",
    revenue: "$18K/month",
    content: "The custom branding options are fantastic. My customers have no idea it's dropshipping - everything looks and feels premium.",
    rating: 5,
    avatar: "photo-1544005313-94ddf0286df2"
  },
  {
    name: "James Wilson",
    role: "Tech Entrepreneur", 
    revenue: "$25K/month",
    content: "Scaled to $25K/month in 6 months. The automation features are game-changing and the product quality from suppliers is consistently excellent.",
    rating: 5,
    avatar: "photo-1519085360753-af0119f7cbe7"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Trusted by 
            <span className="text-primary"> 50,000+ Entrepreneurs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people building successful dropshipping businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md relative overflow-hidden">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-primary/20">
                  <Quote className="w-8 h-8" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground mb-8 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mr-4 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/${testimonial.avatar}?w=100&h=100&fit=crop&crop=face`}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="text-primary font-bold text-sm">{testimonial.revenue}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};