import React, { useState, useEffect } from 'react';
import Styles from './Payment.module.css';
import leftarrow from '../../Assets/arrow-left.svg';
import payicon from '../../Assets/payicon.svg';
import rightarrow from '../../Assets/rightarrow (2).svg';
import mastro from '../../Assets/mastro.svg';
import Add from '../../Assets/Add.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Url } from '../../Utils.js/Url';

const fetchCards = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Log the error response
        console.error('API Error:', errorText);
        return [];
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching debit cards:', error);
      return [];
    }
  };
  
  
  
export default function Payment() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const baseUrl = Url();


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };


  useEffect(() => {
    const getCards = async () => {
      const fetchedCards = await fetchCards();
      if (fetchedCards) {
        setCards(fetchedCards);
      }
    };
    getCards();
  }, []);
  

  const handleAddCard = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const cardData = {
      cardName: formData.get('cardName'),
      cardNumber: formData.get('cardNumber'),
      expirationDate: formData.get('expirationDate'),
      cvc: formData.get('cvc'),
      nameOnCard: formData.get('nameOnCard'),
    };
  
  
    if (!cardData.cardName || !cardData.cardNumber || !cardData.expirationDate || !cardData.cvc || !cardData.nameOnCard) {
      toast.error('All fields are required');
      return;
    }
  
    if (cardData.cardNumber.length < 13 || cardData.cardNumber.length > 19) {
      toast.error('Card number must be 16 digits');
      return;
    }
  
    if (cardData.cvc.length < 3 || cardData.cvc.length > 4) {
      toast.error('CVC must be 3 digits');
      return;
    }
  
    const token = localStorage.getItem('token');
  
    if (!token) {
      toast.error('No token found. Please log in.');
      return;
    }
  
    try {
      const response = await axios.post(`${baseUrl}/api/add`, cardData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        const newCard = response.data;
        setCards([...cards, newCard]);
        toggleModal();
        toast.success('Card added successfully!');
      } else {
        toast.error('Failed to save card');
      }
    } catch (error) {
      console.error('Error adding debit card:', error.response?.data || error.message);
      toast.error('Error adding debit card: ' + (error.response?.data?.message || error.message));
    }
  };
  
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

  const handleCardSelection = (card) => {
    setSelectedCard(card);
    console.log('Selected Card:', card);
  };
  
  const handleNavigate = () => {
    navigate('/ordersuccess');
  };

  
  return (
    <>
      <div className={Styles.arrowbanner}>
        <img src={leftarrow} alt="arrow_image" />
        <h1>Choose and Pay</h1>
      </div>
      <div className={Styles.mainContainer}>
        <div className={Styles.Container}>
          <div className={Styles.outerDiv}>
            <div className={Styles.innerDiv}>
              <div className={Styles.image}>
                <img src={payicon} alt="payicon" />
              </div>
              <div>
                <h1>Wallet</h1>
                <h2>Available balance: ₹300</h2>
              </div>
              <div className={Styles.arrow}>
                <img src={rightarrow} alt="payicon" />
              </div>
            </div>
          </div>


          {cards && cards.length > 0 ? (
            cards.map((card, index) => (
                <div key={card._id} className={Styles.outerDiv1}>
                <div className={Styles.innerDiv1}>
                    <div className={Styles.image1}>
                    <img src={mastro} alt="payicon" />
                    </div>
                    <div>
                    <h1>{card.cardName || 'Unnamed Card'}</h1>
                    </div>
                    <div className={Styles.checkbox}>
                    <input 
                        type="radio" 
                        name="selectedCard" 
                        value={card._id} 
                        id={`card-${index}`} 
                        onChange={() => handleCardSelection(card)} 
                    />
                    <label htmlFor={`card-${index}`}></label>
                    </div>
                </div>
                </div>
            ))
            ) : (
            <div className={Styles.noCardsMessage}>
                <h2>No cards available. Add one to proceed!</h2>
            </div>
            )}



          <div className={Styles.outerDiv1} onClick={toggleModal}>
            <div className={Styles.innerDiv1}>
              <div className={Styles.image2}>
                <img src={Add} alt="payicon" />
              </div>
              <div>
                <h1>Add Debit Card</h1>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.secondFlex}>
          <div className={Styles.outerFlex}>
            <div className={Styles.flexOne}>
              <h1>Amount to be paid</h1>
              <h2>₹{cartItems.reduce((total, item) => total + item.price*item.quantity, 0)+10}</h2>
            </div>
            <div className={Styles.flexTwo} onClick={handleNavigate}>
              <button>Proceed Payment</button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className={Styles.modal}>
          <div className={Styles.modalContent}>
            <h2>Add Debit Card Details</h2>
            <form onSubmit={handleAddCard}>
              <div className={Styles.formGroup}>
                <label>Card Name</label>
                <input type="text" name="cardName" placeholder="Card Name" required />
              </div>
              <div className={Styles.formGroup}>
                <label>Card Number</label>
                <input type="text" name="cardNumber" placeholder="1234 5678 9876 5432" required />
              </div>
              <div className={Styles.formGroup}>
                <label>Expiration Date</label>
                <input type="month" name="expirationDate" required />
              </div>
              <div className={Styles.formGroup}>
                <label>CVC</label>
                <input type="text" name="cvc" placeholder="only 3 digits allowed" required />
              </div>
              <div className={Styles.formGroup}>
                <label>Name on Card</label>
                <input type="text" name="nameOnCard" placeholder="John Doe" required />
              </div>
              <div className={Styles.formActions}>
                <button type="submit">Save Card</button>
                <button type="button" onClick={toggleModal}>Cancel</button>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
