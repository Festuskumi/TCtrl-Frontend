import React, { useEffect, useState, useContext } from 'react';
import Heading from '../Components/Heading';
import { ContextShop } from '../Context/ContextShop';
import axios from 'axios';

const OrdersPage = () => {
  const { backendUrl, token, currency } = useContext(ContextShop);
  const [orderDetails, setOrderDetails] = useState([]);

  // Function to safely construct image URL or fallback
  const getImageUrl = (img) => {
    if (!img) return '/placeholder.png'; // fallback if empty

    if (Array.isArray(img)) img = img[0]; // get first if array

    if (typeof img !== 'string') return '/placeholder.png'; // only accept strings

    // if already full link
    if (img.startsWith('http')) return img;

    // default to your Cloudinary base if not full link
    return `https://res.cloudinary.com/<your-cloud-name>/image/upload/${img}`;
  };

  // Fetch customer orders from backend
  const loadOrderDetails = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/customerorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrderDetails(response.data.orders);
      } else {
        console.warn('No orders found.');
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // Fetch orders on component mount or token change
  useEffect(() => {
    loadOrderDetails();
  }, [token]);

  return (
    <div className='border-t pt-14 px-4 sm:px-10'>
      {/* Page Title */}
      <div className='text-2xl mb-4'>
        <Heading text1='YOUR' text2='ORDERS' />
      </div>

      {/* No orders state */}
      {orderDetails.length === 0 ? (
        <div className='text-gray-500 text-center py-8'>No orders placed yet.</div>
      ) : (
        orderDetails.map((order, index) =>
          order.products.map((item, i) => (
            <div
              key={`${index}-${i}`}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1.5fr] sm:grid-cols-[4fr_1fr] items-center gap-4'
            >
              {/* Left: Product Details */}
              <div className='flex items-start gap-5 text-sm'>
                <img
                  className='w-16 sm:w-20 object-cover rounded'
                  src={getImageUrl(item.image)}
                  alt={item.title || 'product'}
                  onError={(e) => (e.target.src = '/placeholder.png')}
                />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{item.title}</p>
                  <div className='flex gap-5 items-center mt-2 text-xs sm:text-sm'>
                    <p>{currency}{item.price}</p>
                    <p className='px-2 py-1 border bg-slate-50'>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className='mt-2 text-xs sm:text-sm'>
                    Date: <span className='text-gray-500'>{new Date(order.date).toDateString()}</span>
                  </p>
                </div>
              </div>

              {/* Right: Status and Button */}
              <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4'>
                <div className='flex items-center gap-2'>
                  <p className='w-2 h-2 rounded-full bg-green-600'></p>
                  <p className='text-sm'>{order.status || 'Order placed'}</p>
                </div>
                <button onClick={loadOrderDetails} className='border px-4 py-1 text-sm font-medium rounded'>
                  Track Orders
                </button>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default OrdersPage;
