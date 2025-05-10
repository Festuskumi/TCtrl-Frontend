import React from 'react';
import { MapPin, Globe, ChevronRight } from 'lucide-react';

const ShippingForm = ({ register, errors, handleNextStep, setStep, isValid }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <MapPin size={18} className="mr-2 text-blue-600" />
        Shipping Information
      </h2>

      <div className="mb-4">
        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          id="street"
          {...register('street')}
          className={`border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        />
        {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            id="city"
            {...register('city')}
            className={`border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-1">
            County
          </label>
          <input
            id="county"
            {...register('county')}
            className={`border ${errors.county ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
            Postcode
          </label>
          <input
            id="postcode"
            {...register('postcode')}
            className={`border ${errors.postcode ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode.message}</p>}
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe size={16} className="text-gray-400" />
            </div>
            <input
              id="country"
              {...register('country')}
              className={`border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
          </div>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <ChevronRight size={16} className="mr-1 transform rotate-180" />
          Back
        </button>
        <button
          type="button"
          onClick={() => handleNextStep(3)}
          className={`px-4 py-2 rounded-md flex items-center ${
            !isValid
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Continue to Payment
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ShippingForm;