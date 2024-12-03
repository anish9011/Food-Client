import React, { useState, useEffect } from 'react';
import Styles from './Address.module.css';
import leftarrow from '../../Assets/arrow-left.svg';
import plus from '../../Assets/plusaddr.svg';
import loc from '../../Assets/newloc.svg';
import axios from 'axios';
import { Url } from '../../Utils.js/Url';

export default function Address() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const baseUrl = Url();

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/api/address`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAddresses(response.data); 
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);


  const handleAddress = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

 
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };


  const handleSaveAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${baseUrl}/api/address`,
        {
          fullAddress: address,
          state: selectedState,
          city,
          pinCode,
          phoneNumber,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setAddress('');
      setCity('');
      setPinCode('');
      setPhoneNumber('');
      setSelectedState('');
      closeModal();

      fetchAddresses(); 
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  const handleSelectAddress = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${baseUrl}/api/address/select/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAddresses(); // Refresh the list of addresses to show the updated selection
    } catch (error) {
      console.error('Failed to select address:', error);
    }
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ];

  return (
    <>
      <div className={Styles.arrowbanner}>
        <img src={leftarrow} alt="arrow_image" />
        <h1>Your Addresses</h1>
      </div>
      <div className={Styles.address}>
        <div className={Styles.innerDiv} onClick={handleAddress}>
          <img
            src={plus}
            alt="plusaddress_image"
          />
          <h1>Add Address</h1>
        </div>

        {addresses.map((addr) => (
          <div
            key={addr._id}
            className={`${Styles.inneraddrDiv} ${
              addr.selected ? Styles.selected : ''
            }`}
            onClick={() => handleSelectAddress(addr._id)}
          >
            <div className={Styles.name}>
              <h1>Change name</h1>
              {addr.selected && <h2>Default</h2>}
            </div>
            <div className={Styles.addr}>
              <h1>{addr.fullAddress}, {addr.pinCode}, {addr.state}</h1>
            </div>
            <div className={Styles.phone}>
              <h1>{addr.phoneNumber}</h1>
            </div>
            <div className={Styles.edit}>
              <h1>Edit</h1>
              <h2>Remove</h2>
            </div>
          </div>
        ))}
      </div>


      {isModalOpen && (
        <div
          className={Styles.modalOverlay}
          onClick={handleOverlayClick}
        >
          <div className={Styles.modalContent}>
            <div className={Styles.address1}>
              <img src={loc} alt="location_image" />
              <h2>Add New Address</h2>
            </div>
            <div className={Styles.firstModal}>
              <select
                className={Styles.stateSelect}
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="City/District"
                className={Styles.input}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Pin Code"
                className={Styles.input}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className={Styles.input}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className={Styles.secondModal}>
              <textarea
                placeholder="Enter full address"
                className={Styles.textarea}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={Styles.save}>
              <button onClick={handleSaveAddress}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
