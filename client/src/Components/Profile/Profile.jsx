import React, { useEffect, useState } from 'react';
import Styles from './Profile.module.css';
import leftarrow from '../../Assets/arrow-left.svg';
import boy from '../../Assets/boy.svg';
import msg from '../../Assets/msg.svg';
import edit from '../../Assets/edit.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Url } from '../../Utils.js/Url';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    gender: '',
    country: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [debitCards, setDebitCards] = useState([]);
  const [debitLoading, setDebitLoading] = useState(true);
  const [debitError, setDebitError] = useState(null);
  const [cardModalOpen, setCardModalOpen] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [editedCard, setEditedCard] = useState({
    cardName: '', 
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    nameOnCard: ''
  });
  const baseUrl = Url();


  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please log in.');
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/auth/userdetails`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setUser(response.data);
      setEditedUser({
        name: response.data.name,
        email: response.data.email,
        gender: response.data.gender || '',
        country: response.data.country || '',
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.error || 'An error occurred while fetching user data';
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setModalOpen(true);
  };


  const handleModalClose = () => {
    setIsEditing(false);
    setModalOpen(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${baseUrl}/auth/userdetails`, editedUser, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setUser(response.data);
      setModalOpen(false);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Error updating profile';
      toast.error(errorMessage);
    }
  };


  const fetchDebitCards = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please log in.');
      setDebitError('No token found. Please log in.');
      setDebitLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/api/user`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setDebitCards(response.data);
      setDebitLoading(false);
    } catch (err) {
      setDebitLoading(false);
      const errorMessage = err.response?.data?.error || 'Error fetching debit cards';
      toast.error(errorMessage);
      setDebitError(errorMessage);
    }
  };


  useEffect(() => {
    fetchUserData();
    fetchDebitCards();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (debitLoading) {
    return <div>Loading debit cards...</div>;
  }

  if (debitError) {
    return <div>{debitError}</div>;
  }

  const handleCardEditClick = (card) => {
    setSelectedCard(card); 
    setEditedCard({
      cardName: card.cardName, 
      cardNumber: card.cardNumber,
      expirationDate: card.expirationDate,
      cvc: card.cvc,
      nameOnCard: card.nameOnCard,
    });
    setCardModalOpen(true); 
  };
  
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCard((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCardSubmit = async () => {

    const cardNumberRegex = /^\d{16,19}$/;
    if (!cardNumberRegex.test(editedCard.cardNumber)) {
      toast.error('Card number should be between 16 and 19 digits.');
      return; 
    }
  
    
    const cvcRegex = /^\d{3}$/;
    if (!cvcRegex.test(editedCard.cvc)) {
      toast.error('CVC should be exactly 3 digits.');
      return; 
    }
  
   
    if (!editedCard.cardNumber || !editedCard.expirationDate || !editedCard.cvc || !editedCard.nameOnCard || !editedCard.cardName) {
      toast.error('All fields are required');
      return; 
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token is missing.');
      return;
    }
  
    try {

      const response = await axios.put(
        `${baseUrl}/api/updateCard/${selectedCard.cardName}`, // Using cardName in the URL
        editedCard,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
  
      const updatedCard = response.data;
      setDebitCards((prevCards) =>
        prevCards.map((card) =>
          card.cardName === selectedCard.cardName ? updatedCard : card  
        )
      );
      toast.success('Card updated successfully!');
      setCardModalOpen(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error updating debit card';
      toast.error(errorMessage);
    }
  };
  
  
  
  const handleCardModalClose = (e) => {
    if (e.target === e.currentTarget) {
      setCardModalOpen(false);
    }
  };
      

  const handleDeleteCard = async (cardName) => {
    if (!cardName) {
      toast.error('Card name is required to delete.');
      return; 
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token is missing.');
      return;
    }
  
    try {

      const response = await axios.delete(
        `${baseUrl}/api/deleteCard/${cardName}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }, 
        }
      );

      setDebitCards((prevCards) =>
        prevCards.filter((card) => card.cardName !== cardName)
      );
      setCardModalOpen(false);
      toast.success('Card deleted successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error deleting debit card';
      toast.error(errorMessage);
    }
  };
  

  return (
    <>
      <div className={Styles.arrowbanner}>
        <img src={leftarrow} alt="arrow_image" />
        <h1>My Profile</h1>
      </div>
      <div className={Styles.Container}>
        <div className={Styles.profile}>
          <img src={boy} alt="Profile" />
          <h1>{user ? user.name : 'User'}</h1>
          {!isEditing && (
            <button onClick={handleEditClick}>Edit</button>
          )}
          {isEditing && (
            <button onClick={handleSubmit}>Save</button>
          )}
        </div>
      </div>

      {/* Modal for Editing Profile */}
      {modalOpen && (
        <div className={Styles.outerDiv}>
          <div className={Styles.innerDiv}>
            <div className={Styles.content}>
              <h1>Full Name</h1>
              <input
                type="text"
                value={editedUser.name}
                name="name"
                className={Styles.inputField}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={Styles.content}>
              <h1>Email Address</h1>
              <input
                type="text"
                value={editedUser.email}
                name="email"
                className={Styles.inputField}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={Styles.content}>
              <h1>Gender</h1>
              <input
                type="text"
                value={editedUser.gender || ''}
                name="gender"
                className={Styles.inputField}
                onChange={handleInputChange}
              />
            </div>
            <div className={Styles.content}>
              <h1>Country</h1>
              <input
                type="text"
                value={editedUser.country || ''}
                name="country"
                className={Styles.inputField}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Displaying User Information */}
      {!isEditing && (
        <div className={Styles.outerDiv}>
          <div className={Styles.innerDiv}>
            <div className={Styles.content}>
              <h1>Full Name</h1>
              <input
                type="text"
                value={user ? user.name : ''}
                className={Styles.inputField}
                readOnly
                required
              />
            </div>
            <div className={Styles.content}>
              <h1>Email Address</h1>
              <input
                type="text"
                value={user ? user.email : ''}
                className={Styles.inputField}
                readOnly
                required
              />
            </div>
            <div className={Styles.content}>
              <h1>Gender</h1>
              <input
                type="text"
                value={user ? user.gender || '' : ''}
                className={Styles.inputField}
                readOnly
              />
            </div>
            <div className={Styles.content}>
              <h1>Country</h1>
              <input
                type="text"
                value={user ? user.country || '' : ''}
                className={Styles.inputField}
                readOnly
              />
            </div>
          </div>
        </div>
      )}


   <div className={Styles.payment}>
        <div className={Styles.innerPay}>
          <h1>Saved Payment Methods</h1>
        </div>
        {debitCards.length === 0 ? (
          <div>No debit cards available. Please add from Payment Page</div>
        ) : (
          <div className={Styles.mainDiv}>
            {debitCards.map((card, index) => (
              <div className={Styles.debitDiv} key={index}>
                <div className={Styles.debit}>
                  <img src={msg} alt="Debit Card" />
                </div>
                <div className={Styles.text}>
                  <h1>{card.cardNumber}</h1>
                  <h2>{card.cardName}</h2>
                </div>
                <div className={Styles.edit} onClick={() => handleCardEditClick(card)}>
                  <img src={edit} alt="Edit" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
      {cardModalOpen && (
  <div className={Styles.modalWrapper}  onClick={handleCardModalClose} >
    <div className={Styles.modalContent}>
      <h1>Edit Payment Method</h1>
      <div className={Styles.formGroup}>
        <h1>Card Number</h1>
        <input
          type="text"
          value={editedCard.cardNumber || ''} // Ensure default value is an empty string
          name="cardNumber"
          className={Styles.inputField}
          onChange={handleCardInputChange}
          required
        />
      </div>

      {/* Expiration Date */}
      <div className={Styles.formGroup}>
        <h1>Expiration Date</h1>
        <input
          type="text"
          value={editedCard.expirationDate || ''} // Ensure default value is an empty string
          name="expirationDate"
          className={Styles.inputField}
          onChange={handleCardInputChange}
          required
        />
      </div>

      {/* CVC */}
      <div className={Styles.formGroup}>
        <h1>CVC</h1>
        <input
          type="text"
          value={editedCard.cvc || ''} // Ensure default value is an empty string
          name="cvc"
          className={Styles.inputField}
          onChange={handleCardInputChange}
          required
        />
      </div>

      {/* Name on Card */}
      <div className={Styles.formGroup}>
        <h1>Name on Card</h1>
        <input
          type="text"
          value={editedCard.nameOnCard || ''} // Ensure default value is an empty string
          name="nameOnCard"
          className={Styles.inputField}
          onChange={handleCardInputChange}
          required
        />
      </div>
      <div className={Styles.btnGrp}>
      <button onClick={()=>handleDeleteCard(editedCard.cardName)} className={Styles.removeButton}>Remove</button>
      <button onClick={handleCardModalClose} className={Styles.closeButton}>Cancel</button>
        <button onClick={handleCardSubmit} className={Styles.saveButton}>Save Changes</button>
      </div>
    </div>
  </div>
)}




    </>
  );
}
