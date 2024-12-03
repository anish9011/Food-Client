import React from 'react';
import Styles from './BannerRestaurant.module.css';
import Tracking from '../../Assets/Tracking.svg';
import IDVerified from '../../Assets/ID Verified.svg';
import clock from '../../Assets/Clock.svg';

export default function BannerRestaurant() {
  return (
    <>
      <div className={Styles.bannerContainer}>
        <div className={Styles.bannerOne}>
          <div className={Styles.deliveryInfo}>
            <div className={Styles.infoHeader}>
              <img src={Tracking} alt="Tracking Information" className={Styles.infoImage} />
              <h1 className={Styles.infoTitle}>Delivery Information</h1>
            </div>
            <div className={Styles.deliverySchedule}>
              <h1>Monday: <span>12:00 AM – 3:00 AM, 8:00 AM – 3:00 AM</span></h1>
              <h1>Tuesday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Wednesday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Thursday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Friday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Saturday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Sunday: <span>8:00 AM – 12:00 AM</span></h1>
              <h1>Estimated Time Until Delivery: <span>20 min</span></h1>
            </div>
          </div>
          <div className={Styles.deliveryInfo}>
            <div className={Styles.infoHeader}>
              <img src={IDVerified} alt="Tracking Information" className={Styles.infoImage} />
              <h1 className={Styles.infoTitle}>Contact information</h1>
            </div>
            <div className={Styles.deliverySchedule}>
              <p>If you allergies or other dietary</p>
              <p>restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.</p>
              <h1>Phone number</h1>
              <h2>+934443-43</h2>
              <h1>Website</h1>
              <h2>http://mcdonalds.uk/</h2>
            </div>
          </div>
          <div className={Styles.operation}>
            <div className={Styles.time}>
                <div>
            <img src={clock} alt="clock_image"/></div>
            <h1>Operational Times</h1>
            </div>
            <div className={Styles.operationTime}>
              <h1>Monday: <span>12:00 AM – 3:00 AM, 8:00 AM – 3:00 AM</span></h1>
              <h1>Tuesday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Wednesday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Thursday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Friday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Saturday: <span>8:00 AM – 3:00 AM</span></h1>
              <h1>Sunday: <span>8:00 AM – 12:00 AM</span></h1>
              <h1>Estimated Time Until Delivery: <span>20 min</span></h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
