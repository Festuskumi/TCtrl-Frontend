import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ContextShop } from '../Context/ContextShop';
import { assets } from '../assets/assets';
import SimilarProducts from '../Components/SimilarProducts';
import { motion, AnimatePresence } from 'framer-motion';

const Product = () => {
  const { productid } = useParams();
  const { products, currency, AddCart, AddToWishlist, WishlistProducts } = useContext(ContextShop);
  const [productDetails, setProductDetails] = useState(null);
  const [image, setImage] = useState('');
  const [sizes, setSizes] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const imageRef = useRef(null);

  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  // Image zoom animation variants
  const imageZoom = {
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  // Add to cart with animation and toast
  const handleAddToCart = () => {
    if (!sizes) {
      setToastMessage('Please select a size first');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setAddingToCart(true);
    AddCart(productDetails._id, sizes);
    
    setTimeout(() => {
      setAddingToCart(false);
      setToastMessage('Added to cart successfully!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
  };

  // Smooth image transition effect
  const changeImage = (newImage) => {
    if (imageRef.current) {
      imageRef.current.style.opacity = '0';
      setTimeout(() => {
        setImage(newImage);
        imageRef.current.style.opacity = '1';
      }, 300);
    } else {
      setImage(newImage);
    }
  };

  // Fetch product details
  useEffect(() => {
    setLoading(true);
    const foundProduct = products.find((item) => item._id === productid);
    
    // Simulate network delay for loading effect demo
    setTimeout(() => {
      if (foundProduct) {
        setProductDetails(foundProduct);
        setImage(foundProduct.image[0]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 800);
  }, [productid, products]);

  // Toast notification
  const Toast = ({ message }) => (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-5 right-5 bg-black text-white px-6 py-3 rounded-md shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-11 sm:gap-20 flex-col sm:flex-row">
          <div className="flex-1 animate-pulse bg-gray-200 h-96 rounded-md"></div>
          <div className="flex-1 space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-20 text-center"
      >
        <h2 className="text-2xl font-medium">Product not found</h2>
        <p className="mt-4 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="border-t-2 pt-10 container mx-auto px-4"
    >
      <Toast message={toastMessage} />
      
      {/* Product Details Section */}
      <div className="flex gap-11 sm:gap-20 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll scrollbar-hide justify-between sm:justify-normal sm:w-[19%] w-full h-max sm:max-h-[500px]">
            {productDetails.image.map((item, index) => (
              <motion.img 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeImage(item)} 
                src={item} 
                key={index} 
                className={`w-[23%] sm:w-full cursor-pointer sm:mb-3 flex-shrink-0 rounded-md ${item === image ? 'ring-2 ring-black' : ''}`} 
                alt="product thumbnail"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] overflow-hidden rounded-lg">
            <img 
              ref={imageRef}
              src={image} 
              className="w-full h-auto transition-opacity duration-300" 
              alt="product" 
              style={{ opacity: 1 }}
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="flex-1">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-medium text-3xl mt-1"
          >
            {productDetails.name}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-1 mt-2"
          >
            {[1, 2, 3, 4].map((index) => (
              <img key={index} className="w-4" src={assets.star_icon} alt="Star" />
            ))}
            <img className="w-4" src={assets.star_dull_icon} alt="Star" />
            <p className="pl-2 text-sm text-gray-600">198 reviews</p>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 text-3xl font-medium"
          >
            {currency}{productDetails.price}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 text-gray-600 md:w-4/5 leading-relaxed"
          >
            {productDetails.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3 my-7"
          >
            <p className="font-medium">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {productDetails.sizes.map((item, index) => (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSizes(item)} 
                  className={`border py-2 px-4 rounded-md transition-all duration-300 ${
                    item === sizes 
                      ? 'border-black bg-black text-white shadow-md' 
                      : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
                  }`} 
                  key={index}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-3 items-center"
          >
            {/* Add to Cart Button */}
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart} 
              className={`bg-black text-white px-9 py-3 rounded-md shadow-md transition-all duration-300 ${
                addingToCart ? 'opacity-80' : ''
              }`}
              disabled={addingToCart}
            >
              {addingToCart ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : 'Add to Cart'}
            </motion.button>
            
            {/* Wishlist Button */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => AddToWishlist(productDetails._id)}
              className={`p-3 rounded-full transition duration-300 shadow-md ${
                WishlistProducts[productDetails._id] ? 'bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <img 
                src={assets.Wishlist} 
                alt="Wishlist" 
                className={`w-5 h-5 ${WishlistProducts[productDetails._id] ? 'filter brightness-0 invert' : ''}`}
              />
            </motion.button>
          </motion.div>
          
          <motion.hr 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '80%' }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="my-5 mt-7"
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-sm text-gray-500 mt-5 flex flex-col gap-1"
          >
            <p>Category: <span className="text-black">{productDetails.category}</span></p>
            <p>SubCategory: <span className="text-black">{productDetails.subCategory}</span></p>
            <p className="text-xs italic mt-2">100% Authentic, eco-friendly, biodegradable, and highly durable</p>
          </motion.div>
        </div>
      </div>
      
      {/* Product Details Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16"
      >
        <div className="flex border-b">
          <button className="border-b-2 border-black px-5 py-3 text-sm font-medium">Description</button>
          <button className="px-5 py-3 text-sm text-gray-500 hover:text-black transition-colors duration-300">Reviews (198)</button>
        </div>
        <div className="mt-8 flex flex-col gap-6 py-4 text-gray-600 leading-relaxed">
          <p>At TCTRL, we take pride in crafting garments that meet the highest standards of quality, durability, and sustainability. Our materials are carefully selected to ensure authenticity, comfort, and longevity, using only premium, ethically sourced fabrics such as organic cotton, recycled polyester, and responsibly produced wool.</p>
          <p>Every piece is designed with meticulous attention to detail, ensuring exceptional fit, breathability, and wearability while maintaining durability for long-term use. Our commitment to eco-friendly practices means we utilize low-impact dyes, energy-efficient production methods, and minimal waste techniques, reducing our environmental footprint.</p>
          <p>By prioritizing sustainability and ethical sourcing, we ensure that each garment is not only stylish and functional but also aligns with our dedication to protecting the planet. When you choose TCTRL, you're choosing fashion that is responsibly made, built to last, and designed for a better future.</p>
        </div>
      </motion.div>
      
      {/* Similar Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-medium mb-8">You might also like</h2>
        <SimilarProducts categories={productDetails.categories} subcategories={productDetails.subcategories} />
      </motion.div>
    </motion.div>
  );
};

export default Product;