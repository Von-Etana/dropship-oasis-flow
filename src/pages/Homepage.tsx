
import React from 'react';
import { Navigation } from '@/components/homepage/Navigation';
import { HeroSection } from '@/components/homepage/HeroSection';
import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { HowItWorksSection } from '@/components/homepage/HowItWorksSection';
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection';
import { CTASectionNew } from '@/components/homepage/CTASectionNew';
import { Footer } from '@/components/homepage/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Globe, 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard,
  Shield,
  Headphones,
  ArrowRight,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASectionNew />
      <Footer />
    </div>
  );
};

export default Homepage;
