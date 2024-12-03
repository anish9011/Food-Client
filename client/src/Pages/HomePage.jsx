import React from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx';
import HomeHeader from '../Components/HomeHeader/HomeHeader.jsx';
import BannerHome from '../Components/BannerHome/BannerHome.jsx';
import Restaurants from '../Components/Restaurants/Restauarants.jsx';
import FriendsBanner from '../Components/FriendsBanner/FriendsBanner.jsx';
import QuestionBanner from '../Components/QuestionBanner/QuestionBanner.jsx';
import Footer from '../Components/Footer/Footer.jsx';

export default function HomePage() {
  return (
    <>
    <Navbar/>
    <HomeHeader/>
    <BannerHome/>
    <Restaurants/>
    <FriendsBanner/>
    <QuestionBanner/>
    <Footer/>
    </>
  )
}
