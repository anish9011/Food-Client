import React from 'react';
import Styles from './BannerHome.module.css';

export default function BannerHome() {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.heading}>
          <h1>Up to -40% 🎊 Order.uk exclusive deals</h1>
        </div>
        <div className={Styles.flexbox}>
          <h1>Vegan</h1>
          <h1>Sushi</h1>
          <h2>Pizza & Fast food</h2>
          <h1>Others</h1>
        </div>
      </div>
      <div className={Styles.flexContents}>
        <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733033905/your-folder-name/ehwhzkroic9uc0knsqcc.svg" alt="burgerLondon"/>
        <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733033960/your-folder-name/hnoz98orevdalhkbzrz1.svg" alt="cafeLondon"/>
        <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733034154/your-folder-name/uz1pawr0qnrsfyxdsu6l.svg" alt="butterbrotLondon"/>
      </div>
      <div className={Styles.content}>
        <div className={Styles.heading}>
        <h1>Order.uk Popular Categories 🤩</h1>
        </div>
        <div className={Styles.imageFlex}>
      <div className={Styles.imageContent}>
        <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733034277/your-folder-name/zgx8b7ird1w7qzvgqztm.svg" alt="Burger_image" />
        <div className={Styles.innerbody}>
          <h1>Burger Fastfood</h1>
          <p>21 Restaurants</p>
        </div>
      </div>
      <div className={Styles.imageContent}>
        <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733034315/your-folder-name/nbvvvzcu0dabrsqj6cec.svg" alt="Salad_image" />
        <div className={Styles.innerbody}>
          <h1>Salads</h1>
          <p>32 Restaurants</p>
        </div>
      </div>
      <div className={Styles.imageContent}>
        <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733034346/your-folder-name/idf1ppjljeyhs6apmo82.svg" alt="Pasta_image" />
        <div className={Styles.innerbody}>
          <h1>Pasta & Casuals</h1>
          <p>4 Restaurants</p>
        </div>
      </div>
          <div className={Styles.imageContent}>
            <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733034388/your-folder-name/fybvu1gveodrr0ofz77p.svg" alt="Pizza_image" />
            <div className={Styles.innerbody}>
              <h1>Pizza</h1>
              <p>32 Restaurants</p>
            </div>
          </div>
          <div className={Styles.imageContent}>
            <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733034432/your-folder-name/zwlvixnr8f4itk7hqfia.svg" alt="Breakfast_image" />
            <div className={Styles.innerbody}>
              <h1>Breakfast</h1>
              <p>4 Restaurants</p>
            </div>
          </div>
          <div className={Styles.imageContent}>
            <img src="https://res.cloudinary.com/dnsl58bbi/image/upload/v1733034497/your-folder-name/kwrwaapspvlcu1s1srox.svg" alt="Soup_image" />
            <div className={Styles.innerbody}>
              <h1>Soups</h1>
              <p>32 Restaurants</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
