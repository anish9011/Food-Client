import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './HomeHeader.module.css';
import Logo from '../../Assets/LOGO 1.svg';
import male from '../../Assets/male.svg';
import Menu from '../../Assets/optionMenu.svg';
import Basket from '../../Assets/Basket.svg';
import Location from '../../Assets/Location.svg';


export default function HomeHeader() {
    const [active, setActive] = useState('Home');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleNavigation = (item) => {
        if (item === 'Home') {
            setActive('Home'); // Keep "Home" active even if clicked
        } else {
            setActive('Home'); // Always set to "Home" when another item is clicked
        }

        if (item === 'Restaurants') {
            navigate('/productpage/McDonalds', { state: { selectedRestaurant: item } }); // Pass the selected restaurant as state
        }
    };

const handleProfile = ()=>{
    navigate('/');
}



    return (
    <>
        <div className={Styles.mainHeader}>
            <div className={Styles.mainImage}>
                <img src={Logo} alt="header_logo" />
            </div>
            <div className={Styles.title}>
                {['Home', 'Special Offers', 'Restaurants', 'Track Order'].map((item) => (
                    <h1
                        key={item}
                        className={active === item ? Styles.active : ''}
                        onClick={() => handleNavigation(item)} // Use handleNavigation
                    >
                        {item}
                    </h1>
                ))}
            </div>
            <button className={Styles.profile} onClick={handleProfile}>
                <img src={male} alt="male_logo" />
                <h1>Login/Signup</h1>
            </button>


        </div>
        <div className={Styles.Nav}>
            <div className={Styles.navImage}>
                <img src={Logo} alt="logo"/>
            </div>
            <div className={Styles.navText}>
                <img src={Menu} alt="Menu"/>
            </div>
        </div>
        <div className={Styles.head}>
            <div className={Styles.headOne}>
            <button className={Styles.profile} onClick={handleProfile}>
                <img src={male} alt="male_logo" />
                <h1>Login/Signup</h1>
            </button>
            </div>
            <div className={Styles.headTwo}>
                <div className={Styles.innerDiv}>
                    <div className={Styles.innerImageDiv}>
                    <img src={Basket} alt="basket"/>
                    </div>
                    <h1>My Cart</h1>
                </div>
            </div>
        </div>
        <div className={Styles.location}>
          <img src={Location} alt="location_logo" />
          <h1>
            Regent Street, A4, A4201, London <span>Change Location</span>
          </h1>
        </div>
        <div className={Styles.container}>
            <div className={Styles.firstContainer}>
                <p>Order Restaurant food, takeaway and groceries.</p>
                <h1>Feast Your Senses,</h1>
                <h2>Fast and Fresh</h2>
                <h3>Enter a postcode to see what we deliver</h3>
                <input
                    type="email"
                    id="input-box"
                    placeholder="e.g. EC4R 3TE"
                />
                <button>Search</button>
            </div>
            <div className={Styles.secondContainer}>
                <div className={Styles.orangeImage}>
                    <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733033149/your-folder-name/srxxssfj7rvytxhznxqc.svg" alt="orange_image"/>
                </div>
                <div className={Styles.loodlesImage}>
                <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733033282/your-folder-name/sjplnp43myn7a2en86f1.svg" alt="loodles_image"/>
                </div>
                <div className={Styles.eatingImage}>
                <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733033320/your-folder-name/jaafxeugt24tbnugc1np.svg" alt="eating_image"/>
                </div>
                <div className={Styles.floatImage1}>
                <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733033223/your-folder-name/kk4a5bxs8usgdphk2ywl.svg" alt="floating_image"/>
                </div>
                <div className={Styles.floatImage2}>
                <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733033223/your-folder-name/kk4a5bxs8usgdphk2ywl.svg" alt="floating_image"/>
                </div>
                <div className={Styles.floatImage3}>
                <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733033223/your-folder-name/kk4a5bxs8usgdphk2ywl.svg" alt="floating_image"/>
                </div>
            </div>
        </div>

    </>
    );
}
