import React from 'react'
import OrderDetails from '../Components/OrderDetails/OrderDetails'
import Navbar from '../Components/Navbar/Navbar.jsx';
import OrderHeader from '../Components/OrderHeader/OrderHeader.jsx';
import Restaurants from '../Components/Restaurants/Restauarants.jsx';
import Footer from '../Components/Footer/Footer.jsx';
export default function OrderPage() {
  return (
        <>
        <Navbar/>
        <OrderHeader/>
        <OrderDetails/>
        <Restaurants/>
        <Footer/>
        </>
  )
}
