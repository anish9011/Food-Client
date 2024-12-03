import React, { useEffect, useState } from "react";
import Styles from "./OrderSuccessful.module.css";
import roundicon from "../../Assets/roundicon.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Url } from '../../Utils.js/Url';

export default function OrderSuccessful() {
  const [cartItems, setCartItems] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = Url();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get(`${baseUrl}/api/usercart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCartItems(response.data?.data?.cartItems || []);
          toast.success("Cart items fetched successfully!");
        } else {
          setError(response.data.message || "Failed to fetch cart items");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching cart items.");
        toast.error("An error occurred while fetching cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  const handleNavigate = () => {
    navigate('/homepage');
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.image}>
        <img src={roundicon} alt="Order Successful" />
      </div>
      <div className={Styles.text}>
        <h1>Order Placed Successfully</h1>
        <h2>Your order is confirmed and on its way. Get set to savor your chosen delights!</h2>
      </div>
      <div className={Styles.content}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className={Styles.item}>
              <div className={Styles.itemDetails}>
                <h1>{item.name}</h1>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className={Styles.button} onClick={handleNavigate}>
          <button>Back to Home</button>
        </div>
      </div>
    </div>
  );
}
