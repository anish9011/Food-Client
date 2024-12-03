import React from 'react'
import Styles from './FriendsBanner.module.css'
import LOGO from '../../Assets/LOGO 1.svg';
import app from '../../Assets/app-store.svg';


export default function FriendsBanner() {
  return (
    <>
    <div className={Styles.container}>
        <div className={Styles.leftContainer}>
            <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733035926/your-folder-name/blcfgt5vylue2rc7wosc.svg" alt="friends_image"/>
        </div>
        <div className={Styles.rightContainer}>
            <div className={Styles.logo}>
            <img src={LOGO} alt="logo"/>
            <h1>ing is more </h1></div>
            <div className={Styles.text}>
                <h1>Personalised </h1><span>&nbsp;& Instant</span>
            </div>
            <div className={Styles.content}>
              <h1>Download the Order.uk app for faster ordering</h1>
            </div>
            <div className={Styles.imageContent}>
              <img src={app} alt="appstore"/>
            </div>
        </div>
    </div>
    <div class={Styles.imageFlex}>
      <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733035957/your-folder-name/j9ie16ospngmjninor0h.svg" alt="man1"/>
      <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733035995/your-folder-name/hc9ieibxskz4cm9zilrk.svg" alt="man2"/>
    </div>
    </>
  )
}
