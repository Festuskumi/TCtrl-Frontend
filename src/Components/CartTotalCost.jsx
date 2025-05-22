import React, { useContext } from 'react';
import { ContextShop } from '../Context/ContextShop';
import Heading from './Heading';

const CartTotalCost = () => {
  const { currency, Postage_fee, GetCartTotal, CartProducts, products } = useContext(ContextShop);

  // Prevent rendering if products aren't ready
  if (!products || products.length === 0) {
    return <p className="text-sm text-gray-500 px-4">Loading cart summary...</p>;
  }

  const cartTotal = GetCartTotal();
  const isCartEmpty = !CartProducts || Object.keys(CartProducts).length === 0;

  // Check if cart actually has items with quantity > 0
  const hasItemsInCart = Object.values(CartProducts || {}).some(sizes => 
    Object.values(sizes || {}).some(({ quantity }) => quantity > 0)
  );

  const deliveryCost = (isCartEmpty || !hasItemsInCart) ? 0 : Postage_fee;
  const totalCost = (isCartEmpty || !hasItemsInCart) ? 0 : cartTotal + deliveryCost;

  // Format numbers to ensure they display correctly
  const formatPrice = (price) => {
    const num = parseFloat(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <div className='pt-10 px-4 sm:px-10 lg:px-20 w-full'>
      <div className='text-2xl'>
        <Heading text1='TOTAL' text2='COST' />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Sub-total</p>
          <p>{currency}{formatPrice(cartTotal)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Delivery Fee</p>
          <p>{currency}{formatPrice(deliveryCost)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency}{formatPrice(totalCost)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotalCost;