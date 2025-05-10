import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Heading from '../Components/Heading';
import { assets } from '../assets/assets';
import NewsMailingBox from '../Components/NewsMailingBox';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Briefcase, 
  ArrowRight, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [activeTab, setActiveTab] = useState('contact');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <Heading text1="CONTACT" text2="US" />
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We'd love to hear from you. Get in touch with our team for any inquiries, collaborations, or support.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex justify-center mb-10">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-6 py-2 text-sm font-medium rounded-l-lg ${
              activeTab === 'contact' 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Us
          </button>
          <button
            type="button"
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === 'careers' 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('careers')}
          >
            Careers
          </button>
          <button
            type="button"
            className={`px-6 py-2 text-sm font-medium rounded-r-lg ${
              activeTab === 'faq' 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('faq')}
          >
            FAQs
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      {activeTab === 'contact' && (
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16"
        >
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white ${
                    loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map and Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[300px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.66802464225!2d-1.1424313237644617!3d52.629843028091855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879ddcfc377f7cd%3A0xd91c9efcc41fdd79!2sDe%20Montfort%20University!5e0!3m2!1sen!2suk!4v1741894728765!5m2!1sen!2suk" 
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Our Store</p>
                      <p className="mt-1 text-sm text-gray-600">
                        112 st Dummy Street <br />
                        Unit 234, Leicester, England
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="mt-1 text-sm text-gray-600">
                        (+44) 07497262832
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="mt-1 text-sm text-gray-600">
                        CustomerService@TCtrl.co.uk
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Working Hours</p>
                      <p className="mt-1 text-sm text-gray-600">
                        Monday - Friday: 9am - 6pm <br />
                        Saturday: 10am - 4pm <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm font-medium text-gray-900">Follow Us</p>
                  <div className="flex space-x-6 mt-2">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Careers Tab */}
      {activeTab === 'careers' && (
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
        >
          <div className="p-8">
            <div className="flex items-center mb-6">
              <Briefcase className="h-8 w-8 text-gray-700 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Join Our Team</h3>
            </div>
            
            <p className="text-gray-600 mb-8">
              At TCTRL, we're always looking for talented individuals who share our passion for sustainable fashion and innovation. 
              Join us in our mission to redefine the fashion industry with purpose, creativity, and responsibility.
            </p>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-black transition-colors">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Fashion Designer</h4>
                <p className="text-gray-600 text-sm mb-4">
                  We're looking for a creative fashion designer with experience in sustainable materials and ethical production methods.
                </p>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Full-time
                  </span>
                  <button className="inline-flex items-center text-sm font-medium text-black hover:underline">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-black transition-colors">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">E-commerce Specialist</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Help us grow our online presence and create exceptional digital shopping experiences for our customers.
                </p>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Full-time
                  </span>
                  <button className="inline-flex items-center text-sm font-medium text-black hover:underline">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-black transition-colors">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Marketing Coordinator</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Join our marketing team to help tell our story and connect with conscious consumers who share our values.
                </p>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Part-time
                  </span>
                  <button className="inline-flex items-center text-sm font-medium text-black hover:underline">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="inline-flex items-center px-6 py-3 border border-black bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                View All Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
        >
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>What are your shipping options?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                  We offer standard shipping (3-5 business days), express shipping (1-2 business days), and free shipping on orders over £100. International shipping is available to select countries.
                </p>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>What is your return policy?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                  We accept returns within 14 days of delivery. Items must be unworn, unwashed, and with all original tags attached. Please note that final sale items are not eligible for return.
                </p>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>How can I track my order?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                  Once your order ships, you'll receive a confirmation email with a tracking number. You can track your order by clicking the link in the email or by logging into your account on our website.
                </p>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>How do you ensure your clothing is sustainable?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                  We carefully source materials from ethical suppliers, use eco-friendly production methods, minimize waste, and ensure fair labor practices. We're committed to transparency and regularly publish sustainability reports on our progress.
                </p>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Do you offer size exchanges?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                  Yes, we offer free size exchanges within the 14-day return period. Simply initiate a return and select "size exchange" as the reason. Once we receive your original item, we'll ship out the new size.
                </p>
              </details>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <p className="text-center text-gray-600">
                Didn't find what you're looking for? 
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="ml-2 text-black font-medium hover:underline"
                >
                  Contact our support team
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Newsletter Section */}
      <motion.div variants={itemVariants}>
        <NewsMailingBox />
      </motion.div>
    </motion.div>
  );
};

export default Contact;