import React from "react";
import "./ImageSlider.css";
import { useState } from "react";

import treeGreen from "../assets/tree_green.jpg";
import treeBlack from "../assets/tree_black.jpg";
import fall from "../assets/fall.jpg";
import spring from "../assets/spring.jpg";

const ImageSlider = () => {
  const images = [treeGreen, treeBlack, fall, spring];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
  {/* Image wrapper */}
 <div className="slider-image-wrapper">
  {images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`slide-${index}`}
      className={`slider-image ${currentIndex === index ? "active" : ""}`}
    />
  ))}
</div>

  {/* Navigation: arrows + dots */}
  <div className="navigation-wrapper">
    <button className="prev-btn" onClick={prevSlide}>
      ❮
    </button>

    <div className="dots-wrapper">
      {images.map((_, index) => (
        <span
          key={index}
          className={`dot ${currentIndex === index ? "active" : ""}`}
          onClick={() => setCurrentIndex(index)}
        ></span>
      ))}
    </div>

    <button className="next-btn" onClick={nextSlide}>
      ❯
    </button>
  </div>
</div>
  );
};

export default ImageSlider;
