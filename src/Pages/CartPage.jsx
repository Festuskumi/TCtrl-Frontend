import React, { useState, useContext, useEffect, useMemo } from "react";
import { ContextShop } from "../Context/ContextShop";
import Heading from "../Components/Heading";
import { assets } from "../assets/assets";
import CartTotalCost from "../Components/CartTotalCost";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Assuming framer-motion is installed

const CartPage = () => {
  const { products, currency, CartProducts, updateQuantity } = useContext(ContextShop);
  const [cartDetails, setCartDetails] = useState([]);
  const navigate = useNavigate();

  // Calculate cart details whenever CartProducts or products change
  useEffect(() => {
    if (!CartProducts || !products.length) return;

    const items = [];
    
    Object.entries(CartProducts).forEach(([itemId, sizes]) => {
      Object.entries(sizes).forEach(([size, { quantity }]) => {
        if (quantity > 0) {
          const product = products.find(p => p._id === itemId);
          if (product) {
            items.push({ 
              _id: itemId, 
              size, 
              quantity,
              name: product.name,
              price: product.price,
              image: product.image?.[0] || "",
              totalPrice: product.price * quantity
            });
          }
        }
      });
    });
    
    setCartDetails(items);
  }, [CartProducts, products]);

  // Calculate if cart is empty
  const isCartEmpty = useMemo(() => cartDetails.length === 0, [cartDetails]);

  // Animation variants for cart items
  const cartItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  // Handle quantity change with validation
  const handleQuantityChange = (itemId, size, value) => {
    const newQty = Math.max(1, parseInt(value) || 1);
    updateQuantity(itemId, size, newQty);
  };

  // Handle item removal with confirmation
  const handleRemoveItem = (itemId, size, name) => {
    if (window.confirm(`Remove ${name} (${size}) from cart?`)) {
      updateQuantity(itemId, size, 0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Heading text1="YOUR" text2="CART" />
      </div>

      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img 
            src={assets.cart_icon || "/assets/cart_icon.png"} 
            alt="Empty Cart" 
            className="w-10 h-10 mb-4 opacity-50"
          />
          <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add items to your cart to continue shopping</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Header */}
          <div className="hidden sm:grid grid-cols-[4fr_1fr_1fr_1fr] gap-4 py-3 border-b text-sm font-medium text-gray-600">
            <div>Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Cart Items List */}
          <div className="divide-y">
            {cartDetails.map((item, index) => (
              <motion.div
                key={`${item._id}-${item.size}`}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cartItemVariants}
                className="py-4 grid grid-cols-1 sm:grid-cols-[4fr_1fr_1fr_1fr] items-center gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <div className="flex gap-3 items-center mt-1">
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
                        Size: {item.size}
                      </span>
                      <span className="text-sm text-gray-500 sm:hidden">
                        {currency}{item.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden sm:flex justify-center items-center">
                  <span className="font-medium">{currency}{item.price}</span>
                </div>

                {/* Quantity */}
                <div className="flex justify-center items-center">
                  <div className="flex border rounded-md">
                    <button
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-12 text-center border-x focus:outline-none"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
                    />
                    <button
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end sm:justify-center">
                  <button
                    className="flex items-center text-red-500 hover:text-red-700 transition"
                    onClick={() => handleRemoveItem(item._id, item.size, item.name)}
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove"
                      className="w-5 h-5 mr-1"
                    />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cart Summary & Checkout */}
          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Continue Shopping
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg w-full sm:w-96">
                <CartTotalCost />
                <div className="mt-6">
                  <button
                    onClick={() => navigate("/order-place")}
                    disabled={isCartEmpty}
                    className={`w-full py-3 rounded-md text-white font-medium transition flex items-center justify-center
                      ${isCartEmpty 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {isCartEmpty ? 'No Items in Cart' : 'Proceed to Checkout'}
                    {!isCartEmpty && (
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;