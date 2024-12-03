import React, { useState, useEffect } from 'react';
import Styles from './OrderDetails.module.css';
import arrow from '../../Assets/rightarrow.svg';
import loc from '../../Assets/locmark.svg';
import leftarrow from '../../Assets/arrow-left.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { Url } from '../../Utils.js/Url';

export default function OrderDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [address, setAddress] = useState(null);
  const [isFetching, setIsFetching] = useState(true);  
  const [isSuccess, setIsSuccess] = useState(false); 
  const [isFailed, setIsFailed] = useState(false);
  const navigate = useNavigate();
  const baseUrl = Url();

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
  }, []);


  useEffect(() => {
    const fetchSelectedAddress = async () => {
      try {
        setIsFetching(true);
        setIsFailed(false);
        setIsSuccess(false);
    

        const token = localStorage.getItem('token');
    
        if (!token) {
          console.error('No token found');
          toast.error('User is not authorized');
          setIsFetching(false);
          return;
        }
    
 
        const response = await axios.get(`${baseUrl}/api/selected-address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
    
        if (response.status === 200 && response.data.data.selected) {
          setAddress(response.data.data);
          setIsSuccess(true);
          toast.success('Selected address fetched successfully!');
        } else {
          setIsFailed(true);
          toast.error('No selected address found');
        }
      } catch (err) {
        console.error('Error fetching selected address:', err);
        setIsFailed(true);
        toast.error(err.response?.data?.message || 'Failed to fetch selected address');
      } finally {
        setIsFetching(false);
      }
    };
    

    fetchSelectedAddress();
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddress = () => {
    navigate('/addresspage');
  };

  const handlePayment = () => {
    navigate('/paymentpage');
  };
  

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
              <div className={Styles.address} onClick={handleAddress}>
                <h1>Delivery Address</h1>
                {isSuccess && address && (
                  <h2>
                    {address.fullAddress && `${address.fullAddress}, `}
                    {address.city && `${address.city}, `}
                    {address.state && `${address.state} `}
                    {address.pinCode && `${address.pinCode}, `}
                    {address.phoneNumber && `Phone: ${address.phoneNumber}`}
                  </h2>
                )}
              </div>
              <div className={Styles.arrowRight}>
                <img src={arrow} alt="arrow mark" />
              </div>
            </div>
          </div>
          <div className={Styles.taxiItems}>
            <div className={Styles.item}>
              <h1>Items</h1>
              <h2>₹{cartItems.reduce((total, item) => total + item.price*item.quantity, 0)}</h2> {/* Summing up all item prices */}
            </div>
            <div className={Styles.tax}>
              <h1>Sales Tax</h1>
              <h2>₹10</h2> {/* Static Sales Tax, or you can dynamically calculate if needed */}
            </div>
          </div>
          <div className={Styles.subTotal}>
            <h1>SubTotal ({cartItems.length} items)</h1> {/* Display number of items dynamically */}
            <h2>₹{cartItems.reduce((total, item) => total + item.price*item.quantity, 0) + 10}</h2> {/* Subtotal with Sales Tax */}
          </div>
          <div className={Styles.button} onClick={handlePayment}>
            <button>Choose Payment Method</button>
          </div>
        </div>
      </div>
    </>
  );
}
