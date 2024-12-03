import React from 'react'
import Styles from './QuestionBanner.module.css';
import orderfood from '../../Assets/order-food 1.svg';
import food from '../../Assets/food 1.svg';
import order from '../../Assets/order 1.svg';

export default function QuestionBanner() {
   
  return (
    <>
        <div className={Styles.banner}>
            <div className={Styles.mainBanner}>
                <h1>Know more about us!</h1>
                <div className={Styles.text}>
                    <h2>Frequent Questions</h2>         
                    <h1>Who we are?</h1>          
                    <h1>Partner Program</h1>          
                    <h1>Help & Support</h1>
                </div>
            </div>
            <div className={Styles.innerBanner}>
                <div className={Styles.firstBanner}>
                    <h1>How does Order.UK work?</h1>
                    <h2>What payment methods are accepted?</h2>
                    <h2>Can I track my order in real-time?</h2>
                    <h2>Are there any special discounts or <span className={Styles.promotions}>promotions available?</span></h2>
                    <h2>Is Order.UK available in my area?</h2>
                </div>
                <div className={Styles.secondBanner}>
                    <div className={Styles.card}>
                        <h1>Place an Order!</h1>
                        <img src={orderfood} alt="order-food"/>
                        <h2>Place order through our website or Mobile app</h2>
                    </div>
                    <div className={Styles.card}>
                        <h1>Track Progress</h1>
                        <img src={food} alt="order-food"/>
                        <h2>Your can track your order status with delivery time</h2>
                    </div>
                    <div className={Styles.card}>
                        <h1>Get your Order!</h1>
                        <img src={order} alt="order-food"/>
                        <h2>Receive your order at a lighting fast speed!</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className={Styles.registerContainer}>
            <div className={Styles.content}>
                <h1>546+</h1>
                <h2>Registered Riders</h2>
            </div>
            <div className={Styles.content}>
                <h1>789,900+</h1>
                <h2>Orders Delivered</h2>
            </div>
            <div className={Styles.content}>
                <h1>690+</h1>
                <h2>Restaurants Partnered</h2>
            </div>
            <div className={Styles.content1}>
                <h1>17,457+</h1>
                <h2>Food Items</h2>
            </div>
        </div>
    </>
  )
}
