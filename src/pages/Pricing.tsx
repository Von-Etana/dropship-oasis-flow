
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for beginners",
      features: [
        "Up to 1,000 products",
        "1 store connection",
        "Basic order automation",
        "Email support",
        "5GB image storage"
      ],
      limitations: [
        "Advanced analytics",
        "Bulk operations",
        "Priority support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Most popular choice",
      features: [
        "Up to 10,000 products",
        "5 store connections",
        "Advanced order automation",
        "Priority support",
        "50GB image storage",
        "Advanced analytics",
        "Bulk operations",
        "Staff accounts (3)"
      ],
      limitations: [
        "White-label solution"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For scaling businesses",
      features: [
        "Unlimited products",
        "Unlimited store connections",
        "Full automation suite",
        "24/7 phone support",
        "500GB image storage",
        "Advanced analytics",
        "Bulk operations",
        "Unlimited staff accounts",
        "White-label solution",
        "Custom integrations"
      ],
      limitations: [],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Start free, then scale as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-xl transition-shadow ${
              plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </CardTitle>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center opacity-50">
                      <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-500 dark:text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
