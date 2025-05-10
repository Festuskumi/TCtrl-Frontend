import React, { use } from 'react'
import { useState, useContext, useEffect } from 'react';
import { ContextShop } from '../Context/ContextShop';
import Heading from './Heading';
import ProductItems from '../Components/ProductItems';


const SimilarProducts = ({categories, setCategories}) => {

    const {products} = useContext(ContextShop);
    const [similarProducts, setSimilarProducts] = useState([]);

   
    useEffect(() => {
      if(products.length > 0){
        let productsCopying = products.slice();

        productsCopying = productsCopying.filter((item )=> categories === item.categories);
        productsCopying = productsCopying.filter((item )=> setCategories === item.setCategories);

       setSimilarProducts(productsCopying.slice(0, 5));

      }
    }, [products])
  return (
    <div className='my-23'>
      <div className='flex justify-between items-center py-2 text-3xl mb-5'>
          <Heading text1={'Similar'} text2={'Products'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-7'>
        {similarProducts.map((item, index) => (
          <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
        ))}

      </div>
    </div>
  )
}

export default SimilarProducts
