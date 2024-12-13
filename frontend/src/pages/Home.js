import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"earphones"} heading={"popular's Earphones"}/>

      
      <VerticalCardProduct category={"mobiles"} heading={"Smart Phones"}/>
      <VerticalCardProduct category={"Mouse"} heading={"wireless Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Smart TV"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & photography"}/>
      <VerticalCardProduct category={"watches"} heading={"Smart watches"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers with Base"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
      <VerticalCardProduct category={"Refrigerators"} heading={"Refrigerators"}/>
    </div>
  )
}

export default Home