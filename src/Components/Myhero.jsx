import React from 'react';
import backvid from '../assets/backvid.mov'; // Import video separately

const Myhero = () => {
  return (
    <div className='flex mt-7 flex-col sm:flex-row border border-gray-400 p-0'>
      {/* Left Hero Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141] space-y-3'>

          {/* Sustainable Fashion Choice with Dash */}
          <div className='flex items-center gap-2'>
            <p className='h-[2px] w-10 bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base whitespace-nowrap'>Sustainable Fashion Choice</p>
          </div>

          {/* Main Heading */}
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>New Drops</h1>

          {/* Grab Yours Now with Dash (closer together) */}
          <div className='flex items-center gap-1'>
            <p className='font-semibold text-sm md:text-base whitespace-nowrap'>Grab Yours Now</p>
            <p className='h-[2px] w-10 bg-[#414141]'></p> 
          </div>
        </div>
      </div>

      {/* Right Hero Side with Full-Screen Video */}
      <div className='w-full sm:w-1/2 h-full'>
      <video 
  className='w-full h-full object-cover rounded-lg shadow-md'
  src={backvid} 
  autoPlay 
  loop 
  muted 
  playsInline
  controls={false} // Ensure no controls appear
/>

      </div>
    </div>
  );
}

export default Myhero;
