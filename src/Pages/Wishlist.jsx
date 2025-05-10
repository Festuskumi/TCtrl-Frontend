import React, { useContext, useState } from "react";
import { ContextShop } from "../Context/ContextShop";
import Heading from "../Components/Heading";
import { assets } from "../assets/assets";

const Wishlist = () => {
  const { WishlistProducts, products, AddToWishlist, AddCart, currency, Getwishlistnum } =
    useContext(ContextShop);

  const wishlistItems = Object.keys(WishlistProducts).map((id) =>
    products.find((product) => product._id === id)
  );

  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleMoveToCart = (productId) => {
    if (!selectedSizes[productId]) {
      alert("Please select a size before moving to cart!");
      return;
    }

    AddCart(productId, selectedSizes[productId]); 
    AddToWishlist(productId); 
  };

  return (
    <div className="border-t pt-10 px-4 sm:px-10 lg:px-20">
      <div className="text-center text-2xl md:text-3xl mb-6">
        <Heading text1={"YOUR"} text2={"WISHLIST"} />
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(
            (item, index) =>
              item && (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300"
                >
                  <div className="relative">
                    <img
                      className="w-full h-56 object-cover rounded-md"
                      src={Array.isArray(item.image) ? item.image[0] : item.image}
                      alt={item.name}
                    />
                    {/* Bin icon to remove from wishlist */}
                    <img
                      onClick={() => AddToWishlist(item._id)}
                      className="absolute top-2 right-2 w-6 cursor-pointer hover:scale-110 transition"
                      src={assets.bin_icon}
                      alt="Remove"
                    />
                  </div>

                  <div className="mt-4 text-gray-700">
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    <p className="text-md font-medium mt-2">{currency}{item.price}</p>

                    {/* Size selection */}
                    <select
                      className="border mt-2 p-2 w-full rounded focus:ring-2 focus:ring-gray-300 transition"
                      value={selectedSizes[item._id] || ""}
                      onChange={(e) => handleSizeChange(item._id, e.target.value)}
                    >
                      <option value="">Select Size</option>
                      {item.sizes?.map((size, idx) => (
                        <option key={idx} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>

                    {/* Move to Cart button */}
                    <button
                      onClick={() => handleMoveToCart(item._id)}
                      className="w-full mt-3 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
