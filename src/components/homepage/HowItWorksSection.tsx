import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, Store, Package, TrendingUp } from 'lucide-react';

const steps = [
  {
    step: "01",
    icon: <UserPlus className="w-8 h-8" />,
    title: "Create Account",
    description: "Sign up for free and get instant access to our platform and product catalog.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    step: "02", 
    icon: <Store className="w-8 h-8" />,
    title: "Build Your Store",
    description: "Choose from professional templates and customize your brand in minutes.",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20"
  },
  {
    step: "03",
    icon: <Package className="w-8 h-8" />,
    title: "Add Products",
    description: "Browse 1M+ products and add winning items to your store with 1-click import.",
    color: "text-purple-500", 
    bgColor: "bg-purple-50 dark:bg-purple-950/20"
  },
  {
    step: "04",
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Start Selling",
    description: "Launch your store and start selling. We handle fulfillment automatically.",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20"
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Start Selling in 
            <span className="text-primary"> 4 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Launch your dropshipping business today. No experience required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2"></div>
          
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={step.color}>
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90">
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};