import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ContextShop } from '../Context/ContextShop';
import { assets } from '../assets/assets';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  LogOut,
  Package,
  UserCircle
} from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { 
    setShowSearchbar, 
    GetCartNum, 
    Getwishlistnum, 
    navigate, 
    token, 
    setToken, 
    dispatch 
  } = useContext(ContextShop);

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setVisible(false);
    setProfileOpen(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishlistItems");
    setToken('');
    dispatch({ type: "RESET_CART" });
    dispatch({ type: "RESET_WISHLIST" });
    navigate('/login');
  };

  // Active link style function
  const isActiveLink = ({ isActive }) => 
    isActive 
      ? "text-black relative after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] after:bg-black" 
      : "text-gray-600 hover:text-black transition-colors";

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 py-5'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link to='/' className='flex-shrink-0 transition-transform hover:scale-105'>
            <img src={assets.Logo} className='h-20 w-auto' alt='TCTRL Logo' />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            <NavLink to="/" className={isActiveLink}>Home</NavLink>
            <NavLink to="/collection" className={isActiveLink}>Collections</NavLink>
            <NavLink to="/blog" className={isActiveLink}>Blog</NavLink>
            <NavLink to="/contact" className={isActiveLink}>Contact Us</NavLink>
          </nav>

          {/* Action Icons */}
          <div className='flex items-center space-x-6'>
            {/* Search */}
            <button 
              onClick={() => setShowSearchbar(true)}
              className='text-gray-600 hover:text-black transition-colors focus:outline-none'
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <Link to='/wishlist' className='relative'>
              <Heart 
                size={20} 
                strokeWidth={1.5} 
                className='text-gray-600 hover:text-black transition-colors' 
              />
              {Getwishlistnum() > 0 && (
                <span className='absolute -right-2 -bottom-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full animate-pulse'>
                  {Getwishlistnum()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className='relative'>
              <button 
                onClick={() => token ? setProfileOpen(!profileOpen) : navigate('/login')}
                className='text-gray-600 hover:text-black transition-colors focus:outline-none'
                aria-label="User menu"
              >
                <User size={20} strokeWidth={1.5} />
              </button>
              
              {token && profileOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5 animate-fadeIn'>
                  <div className='px-4 py-2 text-sm text-gray-700 border-b border-gray-100'>
                    My Account
                  </div>
                  <button 
                    onClick={() => navigate('/profile')}
                    className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    <UserCircle size={16} className='mr-2' />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => navigate('/orders')}
                    className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    <Package size={16} className='mr-2' />
                    <span>Orders</span>
                  </button>
                  <button 
                    onClick={logout}
                    className='flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
                  >
                    <LogOut size={16} className='mr-2' />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to='/cart' className='relative'>
              <ShoppingBag 
                size={20} 
                strokeWidth={1.5} 
                className='text-gray-600 hover:text-black transition-colors' 
              />
              {GetCartNum() > 0 && (
                <span className='absolute -right-2 -bottom-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full animate-pulse'>
                  {GetCartNum()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className='md:hidden text-gray-600 hover:text-black focus:outline-none'
              onClick={() => setVisible(!visible)}
              aria-label={visible ? "Close menu" : "Open menu"}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - MODIFIED TO REMOVE DARKENING EFFECT */}
      <div 
        className={`fixed inset-0 z-50 md:hidden pointer-events-none`}
      >
        <div 
          className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
            visible ? 'translate-x-0 pointer-events-auto' : 'translate-x-full'
          }`}
        >
          <div className='flex items-center justify-between p-4 border-b'>
            <h2 className='text-lg font-medium'>Menu</h2>
            <button 
              onClick={() => setVisible(false)}
              className='text-gray-500 hover:text-black transition-colors'
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className='p-4 flex flex-col space-y-4'>
            <NavLink to="/" className='flex justify-between items-center p-2 hover:bg-gray-100 rounded-md'>
              Home
              <ChevronRight size={16} />
            </NavLink>
            <NavLink to="/collection" className='flex justify-between items-center p-2 hover:bg-gray-100 rounded-md'>
              Collections
              <ChevronRight size={16} />
            </NavLink>
            <NavLink to="/blog" className='flex justify-between items-center p-2 hover:bg-gray-100 rounded-md'>
              Blog
              <ChevronRight size={16} />
            </NavLink>
            <NavLink to="/contact" className='flex justify-between items-center p-2 hover:bg-gray-100 rounded-md'>
              Contact Us
              <ChevronRight size={16} />
            </NavLink>
            
            {token && (
              <>
                <div className='border-t border-gray-200 my-2'></div>
                <NavLink to="/profile" className='flex justify-between items-center p-2 hover:bg-gray-100 rounded-md'>
                  Profile
                  <UserCircle size={16} />
                </NavLink>
                <NavLink to="/orders" className='flex justify-between items-center p-2 hover:bg-gray-100 rounded-md'>
                  Orders
                  <Package size={16} />
                </NavLink>
                <button 
                  onClick={logout}
                  className='flex justify-between items-center p-2 text-red-600 hover:bg-red-50 rounded-md'
                >
                  Logout
                  <LogOut size={16} />
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;