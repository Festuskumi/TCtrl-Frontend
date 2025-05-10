import React from 'react';
import { useContext } from 'react';
import { ContextShop } from '../Context/ContextShop';
import Heading from './Heading';

const CartTotalCost = () => {
  const { currency, Postage_fee, GetCartTotal, CartProducts } = useContext(ContextShop);

  const cartTotal = GetCartTotal(); // Get the total cost of items in the cart
  const isCartEmpty = Object.keys(CartProducts).length === 0; // Check if cart is empty

  const deliveryCost = isCartEmpty ? 0 : Postage_fee; // Set delivery fee to 0 if cart is empty
  const totalCost = isCartEmpty ? 0 : cartTotal + deliveryCost; // Ensure total is 0 when cart is empty

  return (
    <div className=' pt-10 px-4 sm:px-10 lg:px-20 w-full'>
      <div className='text-2xl'>
        <Heading text1='TOTAL' text2='COST' />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm '>
        <div className='flex justify-between'>
          <p>Sub-total</p>
          <p>{currency}{cartTotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Delivery Fee</p>
          <p>{currency}{deliveryCost.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency}{totalCost.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
}

export default CartTotalCost;
