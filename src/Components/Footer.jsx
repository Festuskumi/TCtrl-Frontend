import React from 'react';
import { assets } from '../assets/assets';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/collection' },
    { name: 'About Us', url: '/blog' },
  ];

  const customerService = [
    { name: 'Contact Us', url: '/contact' },
    { name: 'Track Order', url: '/orders' },
    { name: 'FAQ', url: '/contact' },
  ];

  const policies = [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Sustainability', url: '/sustainability' },
    { name: 'Accessibility', url: '/accessibility' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: assets.Ig, url: 'https://www.instagram.com/' },
    { name: 'TikTok', icon: assets.Tiktok, url: 'https://www.tiktok.com/en/' },
    { name: 'YouTube', icon: assets.Youtube, url: 'https://www.youtube.com/' },
    { name: 'LinkedIn', icon: assets.Linkindln, url: 'https://www.linkedin.com/' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.19.0/visa.svg' },
    { name: 'Mastercard', icon: 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.19.0/mastercard.svg' },
    { name: 'PayPal', icon: 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.19.0/paypal.svg' },
    { name: 'Apple Pay', icon: 'https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.19.0/applepay.svg' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-black to-gray-200"></div>
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gray-100 opacity-50"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gray-100 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                <img 
                  src={assets.Logo} 
                  className="w-14 h-14" 
                  alt="TCTRL Logo" 
                />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">TCTRL</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Discover timeless fashion with a sustainable touch. Redefining style
              with eco-conscious choices for the modern consumer.
            </p>
            <div className="pt-4">
              <div className="flex flex-col space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <span className="text-gray-600">123 Fashion Street, London, UK</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <span className="text-gray-600">+44 (0) 123 456 7890</span>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <a 
                    href="mailto:Tctrl.Fashion.ac@outlook.com"
                    className="text-gray-600 hover:text-black transition-colors duration-300"
                  >
                    Tctrl.Fashion.ac@outlook.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-800 mb-5 uppercase tracking-wider border-b border-gray-200 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className="text-gray-600 hover:text-black group transition-all duration-300 flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-black transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Customer Service Column */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-800 mb-5 uppercase tracking-wider border-b border-gray-200 pb-2">Customer Service</h4>
            <ul className="space-y-3">
              {customerService.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className="text-gray-600 hover:text-black group transition-all duration-300 flex items-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-black transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Links Column */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-5 uppercase tracking-wider border-b border-gray-200 pb-2">Connect With Us</h4>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center mr-3 overflow-hidden">
                    <img 
                      src={social.icon} 
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                      alt={social.name} 
                    />
                  </div>
                  <span className="text-gray-700 group-hover:text-black transition-colors duration-300">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Middle Section with Policies */}
        <div className="border-t border-gray-200 pt-8 pb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {policies.map((policy, index) => (
              <a 
                key={index}
                href={policy.url}
                className="px-4 py-2 bg-white rounded-md shadow-sm hover:shadow-md text-gray-700 hover:text-black transition-all duration-300 text-sm"
              >
                {policy.name}
              </a>
            ))}
          </div>
          
          {/* Payment Methods */}
         
        </div>
        
        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={assets.Copyright} alt="Copyright" className="w-4 h-4 mr-2" />
              <p>{currentYear} TCTRL. All Rights Reserved.</p>
            </div>
            <p className="text-gray-500">Designed with sustainability in mind.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;