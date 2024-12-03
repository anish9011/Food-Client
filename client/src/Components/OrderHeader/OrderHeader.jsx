import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Styles from './OrderHeader.module.css';
import LOGO from '../../Assets/LOGO 1.svg';
import male from '../../Assets/male.svg';
import Menu from '../../Assets/optionMenu.svg';
import { Url } from '../../Utils.js/Url';


export default function OrderHeader() {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate(); 
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const baseUrl = Url();

  const handleNavigation = (item) => {
    setActive(item); // Set the active item to the clicked one

    if (item === 'Restaurants') {
      navigate('/productpage/McDonalds', { state: { selectedRestaurant: item } }); // Pass the selected restaurant as state
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleProfile = () => {
    navigate('/profilepage');
  };

  return (
    <>
      <div className={Styles.mainHeader}>
        <div className={Styles.mainImage}>
          <img src={LOGO} alt="header_logo" />
        </div>
        <div className={Styles.title}>
          {['Home', 'Special Offers', 'Restaurants', 'Track Order'].map((item) => (
            <h1
              key={item}
              className={active === item ? Styles.active : ''} // Highlight active item
              onClick={() => handleNavigation(item)} // Use handleNavigation
            >
              {item}
            </h1>
          ))}
        </div>
        <button className={Styles.profile} onClick={handleProfile}>
          <img src={male} alt="male_logo" />
          {userDetails && <h1>Hey {userDetails.name}</h1>} {/* Show user name */}
        </button>
      </div>
      <div className={Styles.Nav}>
        <div className={Styles.navImage}>
            <img src={LOGO} alt="logo"/>
        </div>
        <div className={Styles.navText}>
            <img src={Menu} alt="Menu"/>
        </div>
      </div>
    </>
  );
}
