import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "/pricing" }, 
    { name: "Product Import", href: "/import" },
    { name: "Store Builder", href: "/store-builder" },
    { name: "Analytics", href: "/analytics" }
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "/contact" },
    { name: "Live Chat", href: "#" },
    { name: "API Documentation", href: "#" },
    { name: "Status Page", href: "#" }
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" }
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Webinars", href: "#" },
    { name: "Dropshipping Guide", href: "#" },
    { name: "Success Stories", href: "#" }
  ]
};

const socialLinks = [
  { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
  { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
  { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
  { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" }
];

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest dropshipping tips, product updates, and success stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary mb-4">Zendrop Clone</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The most powerful dropshipping platform that helps entrepreneurs build, 
                scale, and automate their e-commerce businesses with confidence.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-primary" />
                <span>support@zendropclone.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-foreground">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-foreground">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Zendrop Clone. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};