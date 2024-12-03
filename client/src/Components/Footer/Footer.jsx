import React from 'react'
import Styles from './Footer.module.css';
import LOGO from '../../Assets/LOGO 1.svg';
import app from '../../Assets/app-store.svg';
import facebook from '../../Assets/Facebook.svg';
import instagram from '../../Assets/Instagram.svg';
import tiktok from '../../Assets/TikTok.svg';
import snapchat from '../../Assets/Snapchat.svg';

export default function Footer() {
  return (
    <>
      <div className={Styles.footerBanner}>
        <div className={Styles.firstFlex}>
            <img src={LOGO} alt="logo2_image"/>
            <div className={Styles.badges}>
                <img src={app} alt="app-store_image"/>
            </div>
            <p>Company # 490039-445, Registered with <p>House of companies.</p></p>
        </div>
        <div className={Styles.secondFlex}>
            <p>Get Exclusive Deals in your Inbox</p>
            <input
            className={Styles.input}
            type="email"
            placeholder="youremail@gmail.com"
            />
            <button className={Styles.button}>Subscribe</button>
            <p className={Styles.spam}>we wont spam, read our <a href="/">email policy</a></p>
            <div className={Styles.social}>
                <div><img src={facebook} alt="facebook" /></div>
                <div><img src={instagram} alt="instagram" /></div>
                <div><img src={snapchat} alt="snapchat" /></div>
                <div><img src={tiktok} alt="Tiktok" /></div>
            </div>
        </div>
        <div className={Styles.thirdFlex}>
            <h1>Legal Pages</h1>
            <ul>
            <li><a href="/">Terms and conditions</a></li>
            <li><a href="/">Privacy</a></li>
            <li><a href="/">Cookies</a></li>
            <li><a href="/">Modern Slavery Statement</a></li>
            </ul>
        </div>
        <div className={Styles.fourthFlex}>
            <h1>Important Links</h1>
            <ul>
            <li><a href="/">Get help</a></li>
            <li><a href="/">Add your restaurant</a></li>
            <li><a href="/">Sign up to deliver</a></li>
            <li><a href="/">Create a business account</a></li>
            </ul>
        </div>
      </div>
      <div className={Styles.content}>
        <div className={Styles.flexOne}>
          <h1>Order.uk Copyright 2024, All Rights Reserved.</h1>
        </div>
        <div className={Styles.flexTwo}>
          <h1>Privacy Policy </h1>         
          <h1>Terms</h1>          
          <h1>Pricing</h1>           
          <h1>Do not sell or share my personal information</h1>
        </div>
      </div>
    </>
  )
}
