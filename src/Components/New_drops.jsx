import React, { useContext, useEffect, useState } from 'react'
import { ContextShop } from '../Context/ContextShop'
import Heading from './Heading';
import ProductItems from './ProductItems';

const New_drops = () => {
    const {products}= useContext(ContextShop);
    const [NewProducts, SetNewProducts] = useState([]);

    useEffect(() => {
      if (products && products.length > 0) {
        SetNewProducts(products.slice(0, 10));
      }
    }, [products]);  // Runs whenever `products` updates
    
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-4xl'>
            <Heading text1={'New'} text2={'Drops'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover the latest sustainable fashion trends with our exclusive, stylish, and eco-friendly collections
            </p>
      </div>
       {/*rendering the products   */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center'>
           {
            NewProducts.map((item,index)=>(
                <ProductItems  key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
           }
        </div>
    </div>
  )
}

export default New_drops
