
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Globe, Zap, Crown } from 'lucide-react';

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
        "5GB image storage",
        "AI store builder (1 store)",
        "Subdomain hosting"
      ],
      limitations: [
        "Custom domain",
        "Advanced analytics",
        "Bulk operations",
        "Priority support"
      ],
      popular: false,
      badge: null
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
        "Staff accounts (3)",
        "AI store builder (5 stores)",
        "Custom domain included",
        "SSL certificate"
      ],
      limitations: [
        "White-label solution"
      ],
      popular: true,
      badge: "Most Popular"
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
        "Custom integrations",
        "Unlimited AI stores",
        "Multiple custom domains",
        "Premium templates",
        "Dedicated account manager"
      ],
      limitations: [],
      popular: false,
      badge: "Enterprise"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start free, then scale as you grow with AI-powered store building
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 dark:text-blue-200 font-medium">AI Store Builder</span>
            </div>
            <div className="flex items-center bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
              <Globe className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 dark:text-green-200 font-medium">Custom Domains</span>
            </div>
            <div className="flex items-center bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full">
              <Crown className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-purple-800 dark:text-purple-200 font-medium">Premium Features</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${
              plan.popular ? 'ring-2 ring-blue-500 scale-105 shadow-2xl' : 'hover:scale-105'
            }`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    plan.popular 
                      ? 'bg-blue-500 text-white' 
                      : plan.badge === 'Enterprise' 
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-500 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
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
                    <div key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className={`text-gray-700 dark:text-gray-300 ${
                        feature.includes('AI store builder') || feature.includes('Custom domain') || feature.includes('SSL certificate')
                          ? 'font-semibold'
                          : ''
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-start opacity-50">
                      <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 dark:text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full h-12 text-lg font-semibold ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' 
                      : plan.badge === 'Enterprise'
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                  size="lg"
                >
                  {plan.badge === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              🎉 Limited Time Offer
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Get 2 months free when you upgrade to Professional or Enterprise plan. Use code <strong>AISTORE2024</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
