
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Globe, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "Global Reach",
      description: "Connect with suppliers from 30+ countries worldwide"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Process orders in seconds with our automated system"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Trusted by Thousands",
      description: "Join 50,000+ successful dropshippers using our platform"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
      title: "Proven Results",
      description: "Average 35% increase in profit margins for our users"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About GlobalDropship Pro
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              We're revolutionizing the dropshipping industry by providing the most comprehensive 
              automation platform for e-commerce entrepreneurs worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
              To empower entrepreneurs worldwide by providing the tools, technology, and support 
              they need to build successful dropshipping businesses. We believe in democratizing 
              e-commerce and making it accessible to everyone, regardless of their technical expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
