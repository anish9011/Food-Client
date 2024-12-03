import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './Restaurants.module.css';

export default function Restaurants() {
  const navigate = useNavigate();

  const handleRestaurant = (restaurantName) => {
    navigate(`/productpage/${restaurantName}`);
  };

  return (
    <div className={Styles.container}>
      <h1>Similar Restaurants</h1>
      <div className={Styles.flexBox}>
        <button onClick={() => handleRestaurant('McDonalds')}>
          <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732773926/your-folder-name/mkzvvq6vojhwoj9p4tlr.svg" alt="McDonalds" />
        </button>
        <button onClick={() => handleRestaurant('Papajohns')}>
          <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732773973/your-folder-name/vqikwcswdocljqngvizz.svg" alt="Papajohns" />
        </button>
        <button onClick={() => handleRestaurant('KFC')}>
          <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732774013/your-folder-name/uo6adcelkbciuaoyepzc.svg" alt="KFC" />
        </button>
        <button onClick={() => handleRestaurant('Texas')}>
          <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732774045/your-folder-name/onnxzn843q1ocqvu3rdc.svg" alt="Texas" />
        </button>
        <button onClick={() => handleRestaurant('Burger King')}>
          <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732774087/your-folder-name/xcr6vhclccjtsde7rdl0.svg" alt="Burger King" />
        </button>
        <button onClick={() => handleRestaurant('Shaurma')}>
          <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732774116/your-folder-name/lkaxjnl3jcylt92ksdxx.svg" alt="Shaurma" />
        </button>
      </div>
    </div>
  );
}
