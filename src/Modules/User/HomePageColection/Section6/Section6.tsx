import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./Section6.module.css";
import img from "../../../../assets/images/carousel.png";

export default function Section6() {
  const cardData = [
    {
      title: "Happy Family",
      description:
        "What a great trip with my family and I should try again next time soon ...",
      image: img,
      designer: "Aangaa Product Designer",
      stars: 4,
    },
    {
      title: "Happy Family",
      description:
        "What a great trip with my family and I should try again next time soon ...",
      image: img,
      designer: "Aangaa Product Designer",
      stars: 4,
    },
    {
      title: "Happy Family",
      description:
        "What a great trip with my family and I should try again next time soon ...",
      image: img,
      designer: "Aangaa Product Designer",
      stars: 4,
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={styles.wrapper} style={{paddingBlock: "70px"}}>
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className={`${styles.swiperButton} ${styles.swiperButtonPrev}`}
        aria-label="Previous"
      >
        <svg
          width="57"
          height="57"
          viewBox="0 0 57 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 28.5C0 44.244 12.756 57 28.5 57C44.244 57 57 44.244 57 28.5C57 12.756 44.244 0 28.5 0C12.756 0 0 12.756 0 28.5ZM51.4839 28.5C51.4839 41.1986 41.1986 51.4839 28.5 51.4839C15.8014 51.4839 5.51613 41.1986 5.51613 28.5C5.51613 15.8014 15.8014 5.51613 28.5 5.51613C41.1986 5.51613 51.4839 15.8014 51.4839 28.5ZM43.2097 26.2016V30.7984C43.2097 31.5569 42.5891 32.1774 41.8306 32.1774H28.5V39.877C28.5 41.1067 27.0175 41.7157 26.1442 40.8538L14.7671 29.4768C14.227 28.9367 14.227 28.0633 14.7671 27.5232L26.1442 16.1462C27.0175 15.2728 28.5 15.8933 28.5 17.123V24.8226H41.8306C42.5891 24.8226 43.2097 25.4431 43.2097 26.2016Z"
            fill="#203FC7"
          />
        </svg>
      </button>
      <button
        ref={nextRef}
        className={`${styles.swiperButton} ${styles.swiperButtonNext}`}
        aria-label="Next"
      >
        <svg
          width="57"
          height="54"
          viewBox="0 0 57 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57 26.8065C57 41.6149 44.244 53.6129 28.5 53.6129C12.756 53.6129 0 41.6149 0 26.8065C0 11.9981 12.756 0 28.5 0C44.244 0 57 11.9981 57 26.8065ZM5.51613 26.8065C5.51613 38.7505 15.8014 48.4246 28.5 48.4246C41.1986 48.4246 51.4839 38.7505 51.4839 26.8065C51.4839 14.8625 41.1986 5.18835 28.5 5.18835C15.8014 5.18835 5.51613 14.8625 5.51613 26.8065ZM13.7903 24.6447V28.9683C13.7903 29.6817 14.4109 30.2654 15.1694 30.2654H28.5V37.5074C28.5 38.664 29.9825 39.2369 30.8558 38.4262L42.2329 27.7252C42.773 27.2172 42.773 26.3957 42.2329 25.8877L30.8558 15.1867C29.9825 14.3652 28.5 14.9489 28.5 16.1055V23.3476H15.1694C14.4109 23.3476 13.7903 23.9313 13.7903 24.6447Z"
            fill="#203FC7"
          />
        </svg>
      </button>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        style={{ position: "relative" }}
      >
        {cardData.map((item, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div className={styles.container}>
              <div className={styles.imgContainer}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.contentContainer}>
                <h1 className={styles.title}>{item.title}</h1>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < item.stars ? styles.starGold : styles.starGray
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.designer}>{item.designer}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
