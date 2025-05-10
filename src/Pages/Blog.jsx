import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../Components/Heading';
import NewsMailingBox from '../Components/NewsMailingBox';
// Import the video directly from the assets folder

import { ArrowDown, Leaf, ShoppingBag, HeadphonesIcon } from 'lucide-react';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const Blog = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <Heading text1="OUR" text2="BLOG" />
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          Explore our journey, philosophy, and commitment to sustainable fashion.
        </p>
      </motion.div>

      {/* Video and Mission Section */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-20 items-center"
      >
        <div className="relative">
          {/* Using a poster image fallback with video for better loading */}
          <div className="rounded-xl shadow-2xl overflow-hidden bg-white">
            <video 
              className="w-full h-auto"
              key="video-element"
              autoPlay 
               loop 
               muted 
               playsInline
               controls={false}
            >
              <source src="/src/assets/About_TCtrl.mp4" type="video/mp4" />
              
            </video>
            
            {/* Fallback image in case video doesn't load */}
            <div className="absolute bottom-6 left-6 text-white z-10">
              <p className="text-lg font-semibold">TCTRL Fashion</p>
              <p className="text-sm opacity-80">Sustainable Style</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center gap-6 text-gray-700">
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl font-semibold text-gray-800 mb-3"
          >
            Our Story
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed">
            Fashion is more than just clothing; it's a form of self-expression, confidence, and creativity. 
            At TCTRL, we believe in curating styles that blend modern aesthetics with timeless elegance. 
            Whether you're drawn to minimalist streetwear, vintage-inspired pieces, or bold statement outfits, 
            our collections are designed to inspire and empower.
          </motion.p>
          
          <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-gray-800 mt-2">
            Our Mission
          </motion.h3>
          
          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed">
            At TCTRL, our mission is to redefine fashion with purpose, creativity, and sustainability. 
            We are committed to curating high-quality, trend-forward pieces that empower individuals to 
            express their unique style while making conscious choices. By prioritizing ethical sourcing, 
            innovative designs, and timeless craftsmanship, we aim to bridge the gap between fashion and 
            responsibility.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="inline-flex mt-4"
          >
            <a href="#why-choose-us" className="group flex items-center text-gray-800 font-semibold">
              Learn more about our values
              <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300" size={16} />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div variants={itemVariants} id="why-choose-us" className="mb-20">
        <div className="text-center mb-12">
          <Heading text1="WHY" text2="CHOOSE US" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We're redefining fashion with purpose, creativity, and sustainability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Leaf className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Fashion</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                At <strong>TCTRL</strong>, we don't just follow trends—we set them. Our commitment to quality, 
                sustainability, and individuality ensures that every piece you wear makes a statement. We curate 
                timeless fashion designed for modern lifestyles.
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-sm text-gray-500">
                Ethically sourced materials, eco-friendly production
              </p>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenience</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                At <strong>TCTRL</strong>, we prioritize convenience to make your shopping experience effortless 
                and enjoyable. From our user-friendly website to secure and flexible payment options, we ensure 
                a seamless journey from browsing to checkout.
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-sm text-gray-500">
                Fast shipping, easy returns, secure payments
              </p>
            </div>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <HeadphonesIcon className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                At <strong>TCTRL</strong>, we believe that great fashion deserves exceptional customer service. 
                Our team is dedicated to providing fast, friendly, and personalized support to ensure your 
                shopping experience is seamless.
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-sm text-gray-500">
                24/7 support, personal styling advice, order tracking
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-8 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At the heart of TCTRL are values that drive everything we do. From ethical 
            sourcing to customer satisfaction, these principles guide our journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Value 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600 text-sm">
              We're committed to reducing our environmental footprint through responsible 
              sourcing and production methods.
            </p>
          </div>
          
          {/* Value 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Quality</h3>
            <p className="text-gray-600 text-sm">
              Every garment is crafted with attention to detail, ensuring longevity 
              and superior comfort.
            </p>
          </div>
          
          {/* Value 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600 text-sm">
              We continuously explore new materials, designs, and technologies to 
              stay ahead of trends.
            </p>
          </div>
          
          {/* Value 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Inclusivity</h3>
            <p className="text-gray-600 text-sm">
              We design for diverse body types, styles, and preferences, ensuring 
              fashion is accessible to all.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div variants={itemVariants} className="mb-10">
        <NewsMailingBox />
      </motion.div>
    </motion.div>
  );
};

export default Blog;