import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const NewsMailingBox = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // In a real application, you would make an API call here
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-xl shadow-sm">
      <div className="text-center">
        <div className="mb-2 flex justify-center">
          <Mail className="text-gray-800 h-8 w-8" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Stay Updated with Our Latest Drops
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our community to receive exclusive news, sustainability tracking updates, 
          and be the first to know about new collections. Embrace stylish, sustainable fashion! 💌✨
        </p>

        {!submitted ? (
          <form onSubmit={onSubmitHandler} className="max-w-md mx-auto">
            <div className="relative">
              <div className={`flex flex-col sm:flex-row items-center gap-3 ${error ? 'mb-2' : 'mb-0'}`}>
                <div className="relative w-full">
                  <input
                    className={`w-full px-4 py-3 border-2 ${
                      error ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200`}
                    type="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-6 py-3 bg-black text-white font-medium rounded-lg transition-all duration-200 ${
                    loading
                      ? 'opacity-75 cursor-not-allowed'
                      : 'hover:bg-gray-800 active:bg-gray-900'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              
              {error && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{error}</span>
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our <a href="#" className="text-gray-800 hover:underline">Privacy Policy</a> and 
              <a href="#" className="text-gray-800 hover:underline"> Terms of Service</a>.
              We promise not to spam!
            </p>
          </form>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center text-gray-800 mb-3">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank you for subscribing!</h3>
            <p className="text-gray-700">
              We've sent a confirmation email to <span className="font-medium">{email}</span>.
              Please check your inbox to complete the subscription process.
            </p>
          </div>
        )}
      </div>
      
      
    </div>
  );
};

export default NewsMailingBox;