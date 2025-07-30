import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Zap, 
  Globe, 
  BarChart3, 
  Shield, 
  Headphones,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "1-Click Product Import",
    description: "Import winning products from AliExpress, Amazon, and other suppliers instantly with optimized descriptions and pricing.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "Auto Order Fulfillment",
    description: "Automated order processing with your suppliers. Orders are fulfilled automatically while you focus on growing your business.",
    color: "text-green-500", 
    bgColor: "bg-green-50 dark:bg-green-950/20"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Custom Branded Stores",
    description: "Professional, mobile-responsive stores with your branding. Custom domains and SSL certificates included.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Advanced Analytics",
    description: "Track sales, profits, and customer behavior with detailed reporting and insights to optimize your business.",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Payment Protection",
    description: "Secure payment processing with Stripe, PayPal, and more. Fraud protection and chargeback management included.",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20"
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Expert Support",
    description: "24/7 customer support from dropshipping experts. Live chat, email support, and comprehensive knowledge base.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to 
            <span className="text-primary"> Scale Fast</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From product sourcing to order fulfillment, we've got you covered with tools that grow with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};