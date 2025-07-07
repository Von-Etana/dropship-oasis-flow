import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Crown, Zap, Building } from 'lucide-react';

const PricingTiers = () => {
  const [selectedTier, setSelectedTier] = useState('free');

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      maxStores: 1,
      maxProducts: 100,
      maxOrders: 50,
      features: [
        'Basic store management',
        'Manual order processing',
        'Basic analytics',
        'Email support',
        'Standard templates'
      ],
      limitations: [
        'No automated orders',
        'No advanced integrations',
        'No custom branding',
        'Limited support'
      ],
      icon: Building,
      popular: false,
      color: 'border-gray-200'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$29',
      period: 'per month',
      maxStores: 5,
      maxProducts: 1000,
      maxOrders: 500,
      features: [
        'Advanced store management',
        'Automated order processing',
        'Advanced analytics & reports',
        'Priority support',
        'Custom templates',
        'Payment integrations',
        'Platform integrations',
        'AI product descriptions'
      ],
      limitations: [
        'Limited custom branding',
        'Standard API limits'
      ],
      icon: Zap,
      popular: true,
      color: 'border-blue-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      maxStores: 25,
      maxProducts: 10000,
      maxOrders: 5000,
      features: [
        'Unlimited store management',
        'Advanced automation suite',
        'White-label solutions',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'Advanced security',
        'Custom workflows',
        'Multi-user management',
        'Advanced reporting'
      ],
      limitations: [],
      icon: Crown,
      popular: false,
      color: 'border-purple-500'
    }
  ];

  const currentUserPlan = 'free'; // This would come from user data

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Scale your dropshipping business with the right plan for your needs. 
          Upgrade anytime to unlock more stores, products, and advanced features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => {
          const IconComponent = plan.icon;
          const isCurrentPlan = currentUserPlan === plan.id;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500' : ''} hover:shadow-lg transition-shadow`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Limits */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Plan Limits</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Max Stores:</span>
                      <span className="font-medium">{plan.maxStores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Products:</span>
                      <span className="font-medium">{plan.maxProducts.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Orders/month:</span>
                      <span className="font-medium">{plan.maxOrders.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Features Included</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4">
                  {isCurrentPlan ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      onClick={() => setSelectedTier(plan.id)}
                    >
                      {currentUserPlan === 'free' && plan.id !== 'free' ? 'Upgrade' : 'Select Plan'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {[
            {
              question: "Can I change my plan anytime?",
              answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
            },
            {
              question: "What happens if I exceed my plan limits?",
              answer: "We'll notify you when approaching limits. You can upgrade your plan or temporarily restrictions may apply to new additions."
            },
            {
              question: "Do you offer custom enterprise solutions?",
              answer: "Yes, we provide custom solutions for large enterprises with specific needs. Contact our sales team for a tailored quote."
            },
            {
              question: "Is there a free trial for paid plans?",
              answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTiers;