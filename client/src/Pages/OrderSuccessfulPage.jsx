import React from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx';
import OrderHeader from '../Components/OrderHeader/OrderHeader.jsx';
import OrderSuccessful from '../Components/OrderSuccessful/OrderSuccessful.jsx';
import Footer from '../Components/Footer/Footer.jsx';

export default function OrderSuccessfulPage() {
  return (
        <>
            <Navbar/>
            <OrderHeader/>
            <OrderSuccessful/>
            <Footer/>
        </>
  )
}
