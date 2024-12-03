import React,{useState} from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx';
import Header from '../Components/Header/Header.jsx';
import BannerRestaurant from '../Components/BannerRestaurant/BannerRestaurant.jsx';
import Testimonials from '../Components/Testimonials/Testimonials.jsx';
import Restauarants from '../Components/Restaurants/Restauarants.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Leaflet from '../Components/Leaflet/Leaflet.jsx';

export default function ProductPage() {
  const [isCartOpen, setCartOpen] = useState(false);
  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };
  return (
    <div>
      <Navbar toggleCart={toggleCart}/>
      <Header isCartOpen={isCartOpen}/>
      <BannerRestaurant/>
      <Leaflet/>
      <Testimonials/>
      <Restauarants/>
      <Footer/>
    </div>
  )
}
