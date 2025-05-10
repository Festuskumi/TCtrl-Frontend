import React from 'react'
import Myhero from '../Components/Myhero';
import New_drops from '../Components/New_drops';
import Trending from '../Components/Trending';
import Policy from '../Components/Policy';
import NewsMailingBox from '../Components/NewsMailingBox';

const Home = () => {
  return (
    <div>
      <Myhero />
      <New_drops/>
      <Trending/>
      <Policy/>
      <NewsMailingBox/>
    </div>
  )
}

export default Home
