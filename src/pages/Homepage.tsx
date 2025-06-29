
import React from 'react';
import { Navigation } from '@/components/homepage/Navigation';
import { HeroSection } from '@/components/homepage/HeroSection';
import { CategoriesCarousel } from '@/components/homepage/CategoriesCarousel';
import { HowItWorks } from '@/components/homepage/HowItWorks';
import { Testimonials } from '@/components/homepage/Testimonials';
import { CTASection } from '@/components/homepage/CTASection';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CategoriesCarousel />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Homepage;
