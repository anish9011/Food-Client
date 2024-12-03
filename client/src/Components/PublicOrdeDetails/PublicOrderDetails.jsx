import React, { useState, useEffect } from 'react';
import Styles from './PublicOrderDetails.module.css';
import arrow from '../../Assets/rightarrow.svg';
import loc from '../../Assets/locmark.svg';
import leftarrow from '../../Assets/arrow-left.svg';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { Url } from '../../Utils.js/Url';


export default function PublicOrderDetails() {
  const [cartItems, setCartItems] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("itemId"); 
  const baseUrl = Url();

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('No token found');
        setError('No token found');
        return;
      }


      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; 

      console.log('Fetching cart for userId:', userId);

    
      const url = itemId 
        ? `${baseUrl}/api/usercart/${itemId}` 
        : `${baseUrl}/api/usercart`; 

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.status === 200) {
        setCartItems(response.data.data.cartItems);
        console.log('Cart items fetched:', response.data.data.cartItems);
      } else {
        console.error('Failed to fetch cart items:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('An error occurred while fetching cart items.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [itemId]); 

  const orderPageUrl = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); 
      const userId = decodedToken.userId; 
      return `${window.location.origin}/publicorderpage?userId=${userId}`; 
    }
    return '#'; 
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <>
      <div className={Styles.arrowbanner}>
        <img src={leftarrow} alt="arrow_image" />
        <h1>Your Order Details</h1>
      </div>
      <div className={Styles.flexBox}>
        <div className={Styles.firstFlex}>
          {cartItems.map((item, index) => (
            <div key={index} className={Styles.innerFlex}>
              <div className={Styles.image}>
                <img src={item.imageUrl} alt="food_image" />
              </div>
              <div className={Styles.itemFood}>
                <h1>{item.name}</h1>
                <h2>{item.quantity}x item</h2>
              </div>
              <h1>₹{item.quantity * item.price}</h1>
            </div>
          ))}
          <div className={Styles.notes}>
            <h1>Notes</h1>
            <input type="text" placeholder="Add order notes" className={Styles.input} />
          </div>
        </div>
        <div className={Styles.secondFlex}>
          <div className={Styles.outerFlex}>
            <div className={Styles.markFlex}>
              <div className={Styles.mark}>
                <img src={loc} alt="locmark" />
              </div>
              <div className={Styles.address}>
                <h1>Delivery Address</h1>
                <h2>
                  45, Green Street, Sector 12 iosdfhoi jfpio iopj oijh apsjopasdjpa sdpj opajd
                  aspdojaposdjpaosd asdjopas
                </h2>
              </div>
              <div className={Styles.arrowRight}>
                <img src={arrow} alt="arrow mark" />
              </div>
            </div>
          </div>
          <div className={Styles.taxiItems}>
            <div className={Styles.item}>
              <h1>Items</h1>
              <h2>₹{cartItems.reduce((total, item) => total + item.price, 0)}</h2> {/* Summing up all item prices */}
            </div>
            <div className={Styles.tax}>
              <h1>Sales Tax</h1>
              <h2>₹10</h2> {/* Static Sales Tax, or you can dynamically calculate if needed */}
            </div>
          </div>
          <div className={Styles.subTotal}>
            <h1>SubTotal ({cartItems.length} items)</h1> {/* Display number of items dynamically */}
            <h2>₹{cartItems.reduce((total, item) => total + item.price, 0) + 10}</h2> {/* Subtotal with Sales Tax */}
          </div>
          <div className={Styles.button}>
            <button onClick={() => window.location.href = orderPageUrl()}>
              Choose Payment Method
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
