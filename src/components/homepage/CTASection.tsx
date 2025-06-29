
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="py-12 md:py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Scale Your Business?</h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Join thousands of successful dropshippers using our platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              <Users className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="h-12 px-8 text-white border-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
