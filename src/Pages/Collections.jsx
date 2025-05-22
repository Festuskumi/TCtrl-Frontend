import React, { useContext, useEffect, useState, useRef } from 'react';
import { ContextShop } from '../Context/ContextShop';
import { assets } from '../assets/assets';
import Heading from '../Components/Heading';
import ProductItems from '../Components/ProductItems';
import { motion, AnimatePresence } from 'framer-motion'; // You'll need to install this

const Collections = () => {
  const { products, searchbar, showsearchbar } = useContext(ContextShop);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [sorttype, setSortType] = useState('relevant');
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [activeFilters, setActiveFilters] = useState(0);
  
  // For tracking scroll position
  const filterRef = useRef(null);
  const [filterTopPosition, setFilterTopPosition] = useState(0);

  // Calculate unique categories and subcategories from products
  const allCategories = [...new Set(products.map(product => product.category?.toLowerCase()))].filter(Boolean);
  const allSubcategories = [...new Set(products.map(product => product.subcategory?.toLowerCase()))].filter(Boolean);

  // Function to handle category toggle
  const toggleCategory = (value) => {
    value = value.toLowerCase();
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Function to handle subcategory toggle
  const toggleSubcategory = (value) => {
    value = value.toLowerCase();
    setSubCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setCategories([]);
    setSubCategories([]);
    setPriceRange([0, 1000]);
    setSortType('relevant');
  };

  // Function to apply filters
  const applyFilters = () => {
    setIsLoading(true);
    let filteredProducts = [...products];

    // Search filter
    if (showsearchbar && searchbar) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchbar.toLowerCase())
      );
    }

    // Category filter
    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        item.category && categories.includes(item.category.toLowerCase())
      );
    }

    // Subcategory filter
    if (subcategories.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        item.subcategory && subcategories.includes(item.subcategory.toLowerCase())
      );
    }

    // Price range filter
    filteredProducts = filteredProducts.filter(item =>
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Sort products
    filteredProducts = sortProducts(filteredProducts, sorttype);
    
    // Simulate API call delay
    setTimeout(() => {
      setFilterProducts(filteredProducts);
      setIsLoading(false);
    }, 300);
    
    // Calculate active filters count
    setActiveFilters(
      categories.length + 
      subcategories.length + 
      (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)
    );
  };

  // Function to sort products
  const sortProducts = (productsArray, sortType) => {
    switch (sortType) {
      case 'new':
        return [...productsArray].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      case 'popular':
        return [...productsArray].sort((a, b) => (b.sales || 0) - (a.sales || 0));
      case 'low-high':
        return [...productsArray].sort((a, b) => a.price - b.price);
      case 'high-low':
        return [...productsArray].sort((a, b) => b.price - a.price);
      default:
        return productsArray;
    }
  };

  // Apply filters whenever dependencies change
  useEffect(() => {
    applyFilters();
  }, [categories, subcategories, searchbar, showsearchbar, sorttype, priceRange, products]);

  // Set up sticky sidebar scroll behavior
  useEffect(() => {
    if (!filterRef.current) return;
    
    setFilterTopPosition(filterRef.current.offsetTop);
    
    const handleScroll = () => {
      if (!filterRef.current) return;
      
      const scrollY = window.scrollY;
      const filterElement = filterRef.current;
      
      if (scrollY > filterTopPosition) {
        filterElement.style.position = 'fixed';
        filterElement.style.top = '20px';
        filterElement.style.width = filterElement.parentElement.offsetWidth + 'px';
      } else {
        filterElement.style.position = 'static';
        filterElement.style.width = '100%';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filterTopPosition]);

  // Handle window resize to update sticky sidebar width
  useEffect(() => {
    const handleResize = () => {
      if (filterRef.current && filterRef.current.style.position === 'fixed') {
        filterRef.current.style.width = filterRef.current.parentElement.offsetWidth + 'px';
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize with loading false after component mounts
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className='flex flex-col sm:flex-row gap-8 pt-10 border-t px-4 sm:px-8 lg:px-16'>
      {/* Sidebar Filters Container */}
      <div className='w-full sm:w-1/4 min-w-[250px] relative'>
        {/* Sticky Filters */}
        <div ref={filterRef} className='transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-xl font-semibold flex items-center gap-2'>
              FILTERS
              {activeFilters > 0 && (
                <span className='bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {activeFilters}
                </span>
              )}
            </p>
            
            <div className='flex items-center gap-2'>
              {activeFilters > 0 && (
                <button
                  onClick={clearAllFilters}
                  className='text-xs underline hover:text-gray-600 transition-colors'
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='sm:hidden'
              >
                <img 
                  className={`h-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} 
                  src={assets.dropdown_icon} 
                  alt='Toggle filters' 
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {(showFilters || window.innerWidth >= 640) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='overflow-hidden'
              >
                {/* Categories Filter */}
                <div className='border border-gray-300 p-4 mb-4 bg-white rounded-md shadow-sm'>
                  <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                  <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    {['Men', 'Women', 'Unisex'].map(category => (
                      <label key={category} className='flex items-center gap-2 hover:text-black transition-colors cursor-pointer'>
                        <input 
                          className='w-4 h-4 accent-black' 
                          type='checkbox' 
                          checked={categories.includes(category.toLowerCase())}
                          onChange={() => toggleCategory(category)} 
                        />
                        {category.toUpperCase()}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div className='border border-gray-300 p-4 mb-4 bg-white rounded-md shadow-sm'>
                  <p className='mb-3 text-sm font-medium'>TYPE</p>
                  <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    {['Topwear', 'Bottomwear', 'Winterwear', 'Summerwear', 'Dress', 'Full-Set'].map(type => (
                      <label key={type} className='flex items-center gap-2 hover:text-black transition-colors cursor-pointer'>
                        <input 
                          className='w-4 h-4 accent-black' 
                          type='checkbox' 
                          checked={subcategories.includes(type.toLowerCase())}
                          onChange={() => toggleSubcategory(type)} 
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div className='border border-gray-300 p-4 mb-4 bg-white rounded-md shadow-sm'>
                  <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
                  <div className='px-2'>
                    <div className='flex justify-between text-xs text-gray-500 mb-2'>
                      <span>£{priceRange[0]}</span>
                      <span>£{priceRange[1]}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black mb-4"
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1'>
        {/* Header & Sorting */}
        <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
          <Heading text1={'OUR'} text2={'COLLECTIONS'} />
          
          <select 
            value={sorttype}
            onChange={(e) => setSortType(e.target.value)} 
            className='border border-gray-300 text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition bg-white shadow-sm'
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='new'>Sort by: Newest</option>
            <option value='popular'>Sort by: Popular</option>
            <option value='low-high'>Sort by: Price (Low to High)</option>
            <option value='high-low'>Sort by: Price (High to Low)</option>
          </select>
        </div>

        {/* Product Counter */}
        <p className='text-sm text-gray-500 mb-4'>
          Showing {filterProducts.length} {filterProducts.length === 1 ? 'product' : 'products'}
        </p>

        {/* Loading State */}
        {isLoading ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {[...Array(8)].map((_, index) => (
              <div key={index} className='animate-pulse'>
                <div className='bg-gray-200 h-64 rounded-md mb-2'></div>
                <div className='bg-gray-200 h-4 rounded w-3/4 mb-2'></div>
                <div className='bg-gray-200 h-4 rounded w-1/4'></div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductItems 
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image} 
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <img src={assets.empty_search || '/empty-search.svg'} alt="No products found" className="w-24 h-24 mb-4 opacity-50" />
                <p className="text-gray-500 mb-2">No products found</p>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;