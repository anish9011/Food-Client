import React from 'react';
import Styles from './Navbar.module.css';
import starImage from '../../Assets/star.png';
import Location from '../../Assets/Location.svg';
import Basket from '../../Assets/Basket.svg';
import downbutton from '../../Assets/downbutton.svg';

export default function Navbar({ toggleCart }) {

  return (
    <>
      <div className={Styles.mainBanner}>
        <div className={Styles.imageContainer}> 
          <img src={starImage} alt="star_logo" />
        </div>
        <h1>
          Get 5% Off your first order,<span>Promo: ORDER5</span>
        </h1>
        <div className={Styles.location}>
          <img src={Location} alt="location_logo" />
          <h1>
            Regent Street, A4, A4201, London <span>Change Location</span>
          </h1>
        </div>
        <div className={Styles.greenBox}>
          <div className={Styles.boxOne} onClick={toggleCart}>
            <div className={Styles.imageContainer}> {/* Wrapper div for the Basket icon */}
              <img src={Basket} alt="Basket_logo" />
            </div>
            <h1>My Cart</h1>
          </div>
          <div className={Styles.boxTwo}></div>
          <div className={Styles.boxThree}>
            <div className={Styles.imageContainer}> {/* Wrapper div for the Forward icon */}
              <img src={downbutton} alt="forward_image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
