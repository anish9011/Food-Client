import React from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx';
import OrderHeader from '../Components/OrderHeader/OrderHeader.jsx';
import Payment from '../Components/Payment/Payment';
import Footer from '../Components/Footer/Footer.jsx';
export default function PaymentPage() {
  return (
    <>
            <Navbar/>
            <OrderHeader/>
            <Payment/>
            <Footer/>
    </>
  )
}
