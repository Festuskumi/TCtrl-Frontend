import React, { useContext, useState } from 'react';
import { ContextShop } from '../Context/ContextShop';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductItems = ({ id, image, name, price }) => {
  const { currency, WishlistProducts, AddToWishlist } = useContext(ContextShop);
  const isWishlisted = !!WishlistProducts[id];
  const [animating, setAnimating] = useState(false);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    setAnimating(true);
    AddToWishlist(id);
    toast.success(`${name} ${isWishlisted ? 'removed from' : 'added to'} wishlist`);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <Link
      to={`/product/${id}`}
      className='text-gray-700 block group bg-white shadow-sm hover:shadow-md rounded-lg overflow-hidden transition'
    >
      <div className='w-full h-[280px] overflow-hidden relative'>
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          loading='lazy'
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        />

        <button
          onClick={handleWishlistClick}
          aria-label="Toggle Wishlist"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          className={`absolute bottom-2 right-2 p-2 rounded-full bg-white hover:bg-gray-200 transition shadow-md`}
        >
          <Heart
            className={`w-5 h-5 transition-transform ${animating ? 'scale-125' : ''}`}
            fill={isWishlisted ? 'red' : 'none'}
            stroke={isWishlisted ? 'red' : 'gray'}
          />
        </button>
      </div>

      <p className='pt-3 px-2 line-clamp-1 text-sm font-medium'>{name}</p>
      <div className='px-2 pb-3 flex justify-between items-center'>
        <p className='text-sm font-semibold'>{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItems;
