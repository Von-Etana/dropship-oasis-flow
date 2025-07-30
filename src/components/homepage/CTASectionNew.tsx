import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  "1M+ products to choose from",
  "Automated order fulfillment", 
  "Custom branded stores",
  "24/7 expert support",
  "No monthly fees to start"
];

export const CTASectionNew = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your 
            <br />
            Dropshipping Journey?
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
            Join 50,000+ entrepreneurs who are already building successful stores with our platform.
            Start free today - no credit card required.
          </p>
          
          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start text-left">
                <CheckCircle className="w-5 h-5 mr-3 text-green-300 flex-shrink-0" />
                <span className="text-sm md:text-base">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-xl">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                Talk to Sales
              </Button>
            </Link>
          </div>
          
          {/* Trust Badge */}
          <div className="mt-12 text-center opacity-75">
            <p className="text-sm">
              ✨ 14-day free trial • No setup fees • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};