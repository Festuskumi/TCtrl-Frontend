import React, { useContext, useEffect, useState } from 'react';
import { ContextShop } from '../Context/ContextShop';
import { assets } from '../assets/assets';
import Heading from '../Components/Heading';
import ProductItems from '../Components/ProductItems';

const Collections = () => {
  const { products, searchbar, showsearchbar } = useContext(ContextShop);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [sorttype, setsorttype] = useState('relevant');

  // Debug check
  console.log("All Products from Context:", products);

  const ToggleCategory = (e) => {
    const value = e.target.value.toLowerCase(); // force lowercase
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const ToggleSubcategories = (e) => {
    const value = e.target.value.toLowerCase(); // force lowercase
    setSubCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyTheFilters = () => {
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
        categories.includes(item.category?.toLowerCase())
      );
    }

    // Subcategory filter (note: field is subcategory not subCategory)
    if (subcategories.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        subcategories.includes(item.subcategory?.toLowerCase())
      );
    }

    setFilterProducts(sortProducts(filteredProducts, sorttype));
  };

  const sortProducts = (productsArray, sortType) => {
    switch (sortType) {
      case 'low-high':
        return [...productsArray].sort((a, b) => a.price - b.price);
      case 'high-low':
        return [...productsArray].sort((a, b) => b.price - a.price);
      default:
        return productsArray;
    }
  };

  useEffect(() => {
    applyTheFilters();
  }, [categories, subcategories, searchbar, showsearchbar, sorttype, products]);

  return (
    <div className='flex flex-col sm:flex-row gap-8 pt-10 border-t px-4 sm:px-8 lg:px-16'>
      {/* Sidebar Filters */}
      <div className='w-full sm:w-1/4 min-w-[250px]'>
        <p
          onClick={() => setShowFilters(!showFilters)}
          className='cursor-pointer flex items-center justify-between text-xl font-semibold sm:block'
        >
          FILTERS 
          <img className={`h-4 transition-transform sm:hidden ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
        </p>

        {/* Filter Categories */}
        <div className={`border border-gray-300 p-4 mt-4 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Men', 'women', 'Unisex'].map(category => (
              <label key={category} className='flex items-center gap-2'>
                <input className='w-4 h-4' type='checkbox' value={category} onChange={ToggleCategory} />
                {category.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filters */}
        <div className={`border border-gray-300 p-4 mt-4 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear', 'Summerwear', 'Dress', 'Full-Set'].map(type => (
              <label key={type} className='flex items-center gap-2'>
                <input className='w-4 h-4' type='checkbox' value={type} onChange={ToggleSubcategories} />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1'>
        {/* Header & Sorting */}
        <div className='flex flex-col sm:flex-row justify-between items-center text-base sm:text-2xl mb-6'>
          <Heading text1={'OUR'} text2={'COLLECTIONS'} />
          <select 
            onChange={(e) => setsorttype(e.target.value)} 
            className='border border-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition'
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Price (Low to High)</option>
            <option value='high-low'>Sort by: Price (High to Low)</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 '>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItems 
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image} 
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
