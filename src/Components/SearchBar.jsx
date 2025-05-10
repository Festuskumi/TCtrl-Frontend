import React, { useContext, useEffect, useState } from 'react';
import { ContextShop } from '../Context/ContextShop';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    // Extract values from context
    const { searchbar, setsearchbar, showsearchbar, setShowSearchbar } = useContext(ContextShop);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('/collection')) {
            setVisible(true);  // Always visible on the Collection page
        } else {
            setVisible(showsearchbar); // Only show when manually opened on other pages
        }
    }, [location, showsearchbar]); // Re-run when route or search state changes

    return visible ? (
        <div className='border-t  bg-gray-30 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-500 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                {/* Search input */}
                <input 
                    value={searchbar} 
                    onChange={(e) => setsearchbar(e.target.value)} 
                    className='flex-1 outline-none text-center bg-inherit text-sm' 
                    type='text' 
                    placeholder='Search' 
                />
                {/* Search icon */}
                <img className='w-4 cursor-pointer' src={assets.search_icon} alt='Search Icon' />
            </div>
            {/* Close button - hides search bar when clicked */}
            <img 
                onClick={() => {
                    setShowSearchbar(false);
                    if (location.pathname.includes('/collection')) {
                        setVisible(false); // Hide search bar on Collection page when X is clicked
                    }
                }} 
                className='inline w-3 cursor-pointer'  
                src={assets.cross_icon} 
                alt='Close Search'
            />
        </div>
    ) : null; 
};

export default SearchBar;
