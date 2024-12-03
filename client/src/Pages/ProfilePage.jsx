import React from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx';
import OrderHeader from '../Components/OrderHeader/OrderHeader.jsx';
import Profile from '../Components/Profile/Profile'
import Footer from '../Components/Footer/Footer.jsx';

export default function ProfilePage() {
  return (
    <>
        <Navbar/>
        <OrderHeader/>
        <Profile/>
        <Footer/>
    </>
  )
}
