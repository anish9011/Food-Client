import React, { useRef } from 'react';
import Styles from './Testimonials.module.css';
import button1 from '../../Assets/button1.svg';
import button2 from '../../Assets/button2.svg';
import profile1 from '../../Assets/profile1.svg';
import Rectangle65 from '../../Assets/Rectangle 65.svg';
import Group52 from '../../Assets/Group 52.svg';
import Timespan from '../../Assets/Time Span.svg';

export default function Testimonials() {
  // Create a reference for the scrollable container
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      name: 'St Glx',
      location: 'South London',
      date: '24th September, 2023',
      review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard – hot and satisfying.',
      profileImg: profile1,
      bgImg: Rectangle65,
      ratingImg: Group52,
      timeSpanImg: Timespan,
    },
    {
        name: 'St Glx',
        location: 'South London',
        date: '24th September, 2023',
        review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard – hot and satisfying.',
        profileImg: profile1,
        bgImg: Rectangle65,
        ratingImg:Group52,
        timeSpanImg: Timespan,
      },
      {
        name: 'St Glx',
        location: 'South London',
        date: '24th September, 2023',
        review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard – hot and satisfying.',
        profileImg: profile1,
        bgImg: Rectangle65,
        ratingImg: Group52,
        timeSpanImg: Timespan,
      },
      {
        name: 'St Glx',
        location: 'South London',
        date: '24th September, 2023',
        review: 'The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald\'s standard – hot and satisfying.',
        profileImg: profile1,
        bgImg: Rectangle65,
        ratingImg:Group52,
        timeSpanImg: Timespan,
      },

  ];

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 600,  
        behavior: 'smooth',
      });
    }
  };


  const scrollPrevious = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -600, 
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={Styles.testimonials}>
      <div className={Styles.headerTestimonial}>
        <h1>Customer Reviews</h1>
        <div className={Styles.buttonGrp}>
          <button aria-label="Previous" onClick={scrollPrevious}>
            <img src={button1} alt="Previous" />
          </button>
          <button aria-label="Next" onClick={scrollNext}>
            <img src={button2} alt="Next" />
          </button>
        </div>
      </div>

      <div className={Styles.mainBanner}>
        {/* Scrollable Container */}
        <div className={Styles.scrollContainer} ref={scrollContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div className={Styles.NewBanner} key={index}>
              <div className={Styles.banner}>
                <div className={Styles.firstBanner}>
                  <img
                    src={testimonial.profileImg}
                    alt="Profile"
                  />
                  <img
                    src={testimonial.bgImg}
                    alt="Background rectangle"
                  />
                  <div className={Styles.profileName}>
                    <h2>{testimonial.name}</h2>
                    <h3>{testimonial.location}</h3>
                  </div>
                </div>
                <div className={Styles.secondBanner}>
                  <img
                    src={testimonial.timeSpanImg}
                    alt="Time span"
                  />
                  <div className={Styles.starGroup}>
                    <img
                      src={testimonial.ratingImg}
                      alt="Rating stars"
                    />
                    <p>{testimonial.date}</p>
                  </div>
                </div>
              </div>
              <div className={Styles.reviewText}>
                <p>{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
