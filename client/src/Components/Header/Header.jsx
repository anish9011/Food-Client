import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Styles from './Header.module.css';
import { useParams } from 'react-router-dom';
import LOGO from '../../Assets/LOGO 1.svg';
import male from '../../Assets/male.svg';
import Rectangle64 from '../../Assets/Rectangle 64.svg';
import OrderCompleted from '../../Assets/OrderCompleted.svg';
import Moto from '../../Assets/Moto.svg';
import Clock from '../../Assets/Clock.svg';
import Search from '../../Assets/Search.svg';
import Rectangle47 from '../../Assets/Rectangle 47.svg';
import Plus from '../../Assets/Plus.svg';
import share from '../../Assets/share-2.svg';
import shop from '../../Assets/Shoppingbasket.svg';
import Remove from '../../Assets/Remove.svg';
import Forward from '../../Assets/Forward.svg';
import side from '../../Assets/side.svg';
import bike from '../../Assets/bike.svg';
import store from '../../Assets/store.svg';
import Forward1 from '../../Assets/Forward1.svg';
import Logo from '../../Assets/LOGO 1.svg';
import Menu from '../../Assets/optionMenu.svg';
import Basket from '../../Assets/Basket.svg';
import Location from '../../Assets/Location.svg';
import { Url } from '../../Utils.js/Url';

import { jwtDecode } from 'jwt-decode';


export default function  Header({ isCartOpen }) {
  const [active, setActive] = useState('Restaurants'); 
  const [burgerImages, setBurgerImages] = useState([]);  
  const [friesImages, setFriesImages] = useState([]);    
  const [coldImages, setColdImages] = useState([]);      
  const [searchTerm, setSearchTerm] = useState('');      
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);     
  const navigate = useNavigate();
  const { restaurantName } = useParams();
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [opencart,setOpenCart] = useState(false);
  const cartRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const baseUrl = Url();

   
   useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}/auth/userdetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details. Please try again.');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

   useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 3 - 3;
    if (totalPrice < 20) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [cartItems]);

const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('No token found');
        setError('No token found');
        return;
      }
      const response = await axios.get(`${baseUrl}/api/usercart`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });

      if (response.status === 200) {
        setCartItems(response.data.data.cartItems); 
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred while fetching cart items.');
    } finally {
      setLoading(false); 
    }
  };


  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('token'); 
      setIsItemAdded(false);
      if (!token) {
        return;
      }
      const response = await axios.post(
        `${baseUrl}/api/addcart`,
        item,
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          }
        }
      );
  
      if (response.status === 200) {
        setIsItemAdded(true);
        setOpenCart(true);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [isItemAdded]); 
  
  
  const handleaddtocart = (item) => {
    const cartItem = {
      id:item.id,
      imageUrl: item.imageUrl,
      name: item.name,
      price: item.price,
      quantity: 1, 
    };
  
    addToCart(cartItem); 
  };


  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/image`); 
        const data = await response.json();

        if (data.success) {
          setBurgerImages(data.burgerImages); 
          setFriesImages(data.friesImages);    
          setColdImages(data.coldImages);     
        } else {
          console.error('Failed to fetch images:', data.message);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);


  const handleDelete = async (item) => {
    try {
      if (item.quantity > 1) {
  
        const updatedCartItems = cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }  
            : cartItem
        );
        setCartItems(updatedCartItems);  
      } else {

        const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCartItems); 
      }
  

      const response = await fetch(`${baseUrl}/api/usercart/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        console.log('Item updated or deleted successfully');
      } else {
        alert(data.message);  
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred while deleting the item.');
    }
  };
  

  const filteredBurgers = burgerImages.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredFries = friesImages.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredColdDrinks = coldImages.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigation = (item) => {
    setActive('Restaurants'); 
    
    if (item === 'Home') {
        navigate('/homepage', { state: { selectedRestaurant: item } });
    }
};

const copyLink = () => {
  const token = localStorage.getItem('token');
  
  console.log('Stored token:', token);

  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.userId) {
        const orderPageUrl = `${window.location.origin}/publicorderpage?userId=${decodedToken.userId}`;

        navigator.clipboard.writeText(orderPageUrl)
          .then(() => {
            alert("Order Page link copied to clipboard! Share it to access the order details.");
          })
          .catch(err => {
            console.error('Failed to copy the link to clipboard:', err);
            alert("Failed to copy the link. Please try again.");
          });
      } else {
        alert("User ID is not available in the token.");
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      alert("There was an error with the token. Please log in again.");
    }
  } else {
    alert("User not logged in or token is missing.");
  }
};

const handleNavigate=()=>{
  navigate('/orderpage');
}

const handleProfile = ()=>{
  navigate('/profilepage');
}

useEffect(() => {
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
    setOpenCart(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);


  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const handleMyCart=()=>{
  setOpenCart(true);
}

  return (
    <>
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
                {userDetails && <h1>Hey {userDetails.name}</h1>}
            </button>
            </div>
            <div className={Styles.headTwo}>
                <div className={Styles.innerDiv} onClick={handleMyCart}>
                    <div className={Styles.innerImageDiv}>
                    <img src={Basket} alt="basket"/>
                    </div>
                    <h1>My Cart</h1>
                </div>
            </div>
        </div>
       <div className={Styles.mainHeader}>
            <div className={Styles.mainImage}>
                <img src={LOGO} alt="header_logo" />
            </div>
            <div className={Styles.title}>
                {['Home', 'Special Offers', 'Restaurants', 'Track Order'].map((item) => (
                    <h1
                        key={item}
                        className={active === item ? Styles.active : ''}
                        onClick={() => handleNavigation(item)}
                    >
                        {item}
                    </h1>
                ))}
            </div>
            <button className={Styles.profile} onClick={handleProfile}>
                <img src={male} alt="male_logo" />
                {userDetails && <h1>Hey {userDetails.name}</h1>}
            </button>
        </div>

        <div className={Styles.location}>
          <img src={Location} alt="location_logo" />
          <h1>
            Regent Street, A4, A4201, London <span>Change Location</span>
          </h1>
        </div>

      <div className={Styles.secHeader}>
        <h1>I'm lovin' it!</h1>
        <div className={Styles.McD}>
          <h1>{restaurantName} East London</h1>
        </div>
        <div className={Styles.mainBannerImage}>
          <img
            src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732528431/your-folder-name/cg4jczbauvfoggt2ug4s.svg"
            alt="rectangle_image"
          />
          <div className={Styles.mainBannerStar}>
            <img src={Rectangle64} alt="rating_image" />
          </div>
        </div>

        <div className={Styles.imgOne}>
          <img src={OrderCompleted} alt="orderCompleted" />
          <h1>Minimum Order: 12 GBP</h1>
        </div>
        <div className={Styles.imgTwo}>
          <img src={Moto} alt="orderCompleted" />
          <h1>Delivery in 20-25 Minutes</h1>
        </div>

        <div className={Styles.clock}>
          <img src={Clock} alt="clock_image" />
          <h1>Open until 3:00 AM</h1>
        </div>
      </div>

      <div className={Styles.search}>
        <h1>All Offers from {restaurantName} East London</h1>
        <div className={Styles.searchContainer}>
          <img src={Search} alt="search_image" className={Styles.searchIcon} />
          <input
            type="text"
            placeholder="       Search from menu..."
            className={Styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <div className={Styles.sideBanner}>
        {[
          'Offers',
          'Burgers',
          'Fries',
          'Cold drinks'
        ].map((item, index) => (
          <span
            key={item}
            className={index === 0 ? Styles.roundedItem : Styles.normalItem}
          >
            {item}
          </span>
        ))}
      </div>

      <div className={`${isCartOpen||opencart ? Styles.discount : Styles.discountSection}`}>
        <img
          src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732528912/your-folder-name/ppgop71a3j4gbv2wy4kz.svg"
          alt="discounted_image"
        />
        <img
          src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732528944/your-folder-name/qrlwrq6uy7hmvxhkolu8.svg"
          alt="discounted_image"
        />
        <img
          src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1732529008/your-folder-name/fugedmmcet6ydhqkoewr.svg"
          alt="discounted_image"
        />
      </div>

      <div className={Styles.foodSection}>
 
        {filteredBurgers.length > 0 && (
          <div className={Styles.burgerSection}>
            <h1>Burgers</h1>
            <div className={`${isCartOpen ||opencart ? Styles.foodsCart : Styles.foods}`}>
              {filteredBurgers.map((image) => (
                <div key={image.id} className={Styles.foodItem}>
                  <div>
                    <h1>{image.name}</h1>
                    <h2>{image.about}</h2>
                    <p>&#8377;{image.price}</p>
                  </div>
                  <div className={Styles.image}>
                    <img src={image.imageUrl} alt={image.name} />
                    <div className={Styles.addButton} onClick={() => handleaddtocart(image)}>
                      <img src={Rectangle47} alt="addtocart_image" />
                      <div className={Styles.innerbtn}>
                        <img src={Plus} alt="addtocart_image" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredFries.length > 0 && (
          <div className={Styles.friesSection}>
            <h1>Fries</h1>
            <div className={`${isCartOpen||opencart ? Styles.foodsCart : Styles.foods}`}>
              {filteredFries.map((image) => (
                <div key={image.id} className={Styles.foodItem}>
                  <div>
                    <h1>{image.name}</h1>
                    <h2>{image.about}</h2>
                    <p>&#8377;{image.price}</p>
                  </div>
                  <div className={Styles.image}>
                    <img src={image.imageUrl} alt={image.name} />
                    <div className={Styles.addButton} onClick={() => handleaddtocart(image)}>
                      <img src={Rectangle47} alt="addtocart_image" />
                      <div className={Styles.innerbtn}>
                        <img src={Plus} alt="addtocart_image" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredColdDrinks.length > 0 && (
          <div className={Styles.coldSection}>
            <h1>Cold Drinks</h1>
            <div className={`${isCartOpen||opencart ? Styles.foodsCart : Styles.foods}`}>
              {filteredColdDrinks.map((image) => (
                <div key={image.id} className={Styles.foodItem}>
                  <div>
                    <h1>{image.name}</h1>
                    <h2>{image.about}</h2>
                    <p>&#8377;{image.price}</p>
                  </div>
                  <div className={Styles.image}>
                    <img src={image.imageUrl} alt={image.name} />
                    <div className={Styles.addButton} onClick={() => handleaddtocart(image)}>
                      <img src={Rectangle47} alt="addtocart_image" />
                      <div className={Styles.innerbtn}>
                        <img src={Plus} alt="addtocart_image" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {(isCartOpen || opencart) &&(
        <div className={Styles.cartOverlay}>
  <div className={Styles.cart} ref={cartRef}>
    <div className={Styles.shareLink}>
      <img src={share} alt="share2_image" />
      <h1>Share this cart with your friends</h1>
      <button onClick={() => copyLink()}>Copy Link</button>
    </div>
    <div className={Styles.basket}>
      <div className={Styles.innerBasket}>
        <img src={shop} alt="basket_img" />
        <h1>My Basket</h1>
      </div>

      {/* Loop through cartItems and display each item */}
      {cartItems.map((item) => (
        <div className={Styles.price} key={item.id}> {/* Ensure you're using the item id */}
          <h1>{item.quantity} x</h1>
          <div className={Styles.list}>
            <h1>&#x20B9;{item.price * item.quantity}</h1> {/* Total price per item */}
            <h2>{item.name}</h2>
          </div>
          <div className={Styles.delBtn}>
             <img src={Remove} alt="remove image" onClick={() => handleDelete(item)} />
          </div>
        </div>
      ))}

      <div className={Styles.subTotal}>
        <div className={Styles.total}>
          <h1>Sub Total:</h1>
          <h2>&#x20B9;{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h2> {/* Calculate subtotal */}
        </div>
        <div className={Styles.total}>
          <h1>Discounts:</h1>
          <h2>-&#x20B9;3.00</h2> 
        </div>
        <div className={Styles.total}>
          <h1>Delivery Fee:</h1>
          <h2>&#x20B9;3.00</h2>
        </div>
      </div>

      <div className={Styles.toPay}>
        <div className={Styles.pay}>
          <h1>Total to pay</h1>
          <h2>₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)  + 3 - 3}</h2> {/* Total calculation */}
        </div>
        <div className={Styles.freeItem}>
          <h1>Choose your free item..</h1>
          <img src={Forward} alt="forward.svg" />
        </div>
        <div className={Styles.freeItem}>
          <h1>Apply Coupon Code here</h1>
          <img src={side} alt="side.svg" />
        </div>
      </div>

      <div className={Styles.delivery}>
        <div className={Styles.innerDelivery}>
          <div className={Styles.delBike}>
            <img src={bike} alt="bike_image" />
            <h1>Delivery</h1>
            <h2>Starts at 17:50</h2>
          </div>
          <div className={Styles.store}>
            <img src={store} alt="store_image" />
            <h1>Collection</h1>
            <h2>Starts at 16:50</h2>
          </div>
        </div>
        <div
  className={`${Styles.checkOut} ${isDisabled ? Styles.disabled : ''}`}
  onClick={isDisabled ? null : handleNavigate}
>
  <img src={Forward1} alt="forward" />
  <h1>Checkout!</h1>
        {showTooltip && (
          <div className={Styles.tooltip}>
            {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 3 - 3 < 20
              ? "Minimum delivery is  ₹20, You must Spend ₹20 more for the checkout!"//then disabole the checkout button
              : "We are open now, but delivery starts at 18:00 however you may order and collect in store now"}
          </div>
        )}
</div>

      </div>
    </div>
  </div>
  </div>
)}

    </>
  );
}
