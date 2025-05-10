import React, { useContext, useEffect, useState } from 'react'
import { ContextShop } from '../Context/ContextShop'
import Heading from './Heading';
import ProductItems from './ProductItems';

const Trending = () => {
    const {products} = useContext(ContextShop);
    const [trending, setTrending] = useState([]);


    useEffect(()=>{
      const BestProduct = products.filter((item) => item.trending);
        setTrending(BestProduct.slice(0,5))
    }, [products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-4xl'>
        <Heading text1={'GOING'} text2={'FAST'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Discover our best-selling fashion trends – stylish, trendy, and customer favorites!</p>

      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center'>
        {
            trending.map((item,index)=>(
                <ProductItems  key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
           }
      </div>
    </div>
  )
}

export default Trending
