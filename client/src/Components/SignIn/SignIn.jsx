import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from './SignIn.module.css';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../Assets/LOGO 1.svg';
import Hand from '../../Assets/Hand.png';
import { Url } from '../../Utils.js/Url';


export default function SignIn() {
  const navigate = useNavigate();
  const baseUrl = Url();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseUrl}/auth/signin`, values);
        localStorage.setItem('token', response.data.token);
        toast.success(response.data.message);
        formik.resetForm();
        navigate('/homepage');
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      }
    },
  });

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className={Styles.mainBanner}>
        <div className={Styles.bannerOne}>
          <div className={Styles.logo}><img src={LOGO} alt="logo_image" /></div>
          <div className={Styles.secImg}><img src={Hand} alt="hand_image" /></div>
          <p>Today is a new day. It's your day. You shape it. 
            <h1>Sign in to start ordering.</h1>
          </p>
          
          <form onSubmit={formik.handleSubmit}>
            <div className={Styles.inputContainer}>
              <label htmlFor="email" className={Styles.inputLabel}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Example@email.com"
                className={Styles.emailInput}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className={Styles.inputContainer}>
              <label htmlFor="password" className={Styles.inputLabel}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="At least 8 characters"
                className={Styles.passwordInput}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <button type="submit">Sign In</button>
          </form>

          <div className={Styles.signup}>
            <h1>Don't you have an account? <a href="/signup">Sign up</a></h1>
          </div>
        </div>

        <div className={Styles.bannerTwo}>
          <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733157929/your-folder-name/x5d6tt7wqv4shi0gwfvn.svg" alt="art_image" />
        </div>
      </div>
    </div>
  );
}
