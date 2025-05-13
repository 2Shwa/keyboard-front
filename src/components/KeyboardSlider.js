import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import heartIcon from '../images/heart.png';
import keyboardImage from '../images/keyboard.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './css/KeyboardSlider.css';

function KeyboardSlider() {
  return (
    <section className="pick-container">
      <div className="pick-title">
        <h2 className="pick-heading">키덕 PICK! 추천 키보드</h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="pick-slide-container"
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <SwiperSlide key={num}>
            <div className="keyboard-Container">
              <div className="keyboard-slide">
                <img src={keyboardImage} alt="키보드 이미지" className="keyboard-image" />
                <div className="keyboard-information">
                  <div className="name-container">
                    <div className="keyboard-brand">제조사</div>
                    <div className="keyboard-name">키보드{num}</div>
                  </div>
                  <div className="price-container">
                    <div className="keyboard-price">100,000원</div>
                  </div>
                </div>
                <div className="keyboard-heart-placeholder">
                  <img src={heartIcon} alt="하트 아이콘" className="Heart-icon" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default KeyboardSlider;
