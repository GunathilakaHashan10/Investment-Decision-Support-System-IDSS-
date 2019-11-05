import React, { Component } from 'react';
import Slider from "react-slick";
import styles from '../../assets/css/HomePage/ImageSlider.css';
import B1 from '../../assets/images/Homepage/B1.jpg';
import R2 from '../../assets/images/Homepage/R2.jpg';
import R3 from '../../assets/images/Homepage/R1.jpg';
import S2 from '../../assets/images/Homepage/S2.png';


class ImageSlider extends Component {
  render() {
    var settings = {
      dots: true
    };
    return (
      <div className={styles.container}>
        <Slider {...settings} adaptiveHeight={true} autoplay={true} autoplaySpeed={3000}>
          <div className={styles.image_contaier}>
            <img src={S2} alt="slideImage" />
            <span className={styles.annotation}>Your investemt will more easier</span>
          </div>
          <div className={styles.image_contaier}>
            <img src={R2} alt="slideImage"/>
            <span className={styles.annotation}>Your investemt will more easier</span>
          </div>
          <div className={styles.image_contaier}>
            <img src={R3} alt="slideImage"/>
            <span className={styles.annotation}>Your investemt will more easier</span>
          </div>
          <div className={styles.image_contaier}>
            <img src={B1} alt="slideImage"/>
            <span className={styles.annotation}>Your investemt will more easier</span>
          </div>
        </Slider>
      </div>
    );
  }
}

export default ImageSlider;
