import React from 'react';
import { assets } from '../assets/assets';

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around items-center text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div className='flex flex-col items-center'>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>Refunds and Our Exchange Policy</p>
        <p className='text-gray-400'>Refunds and Exchanges are available for eligible items.</p>
      </div>
      <div className='flex flex-col items-center'>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>Return Policy</p>
        <p className='text-gray-400'>Free Returns accepted within 14 days.</p>
      </div>
      <div className='flex flex-col items-center'>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>Customer Support</p>
        <p className='text-gray-400'>Customer support available via email for assistance with inquiries.</p>
      </div>
    </div>
  );
};

export default Policy;