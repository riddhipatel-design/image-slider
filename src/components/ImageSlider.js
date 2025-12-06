import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

import treeGreen from "../assets/tree_green.jpg";
import treeBlack from "../assets/tree_black.jpg";
import fall from "../assets/fall.jpg";
import spring from "../assets/spring.jpg";

const ImageSlider = () => {
  const images = [
    { src: treeGreen, alt: "Green tree in summer" },
    { src: treeBlack, alt: "Leafless tree in winter" },
    { src: fall, alt: "Fall season foliage" },
    { src: spring, alt: "Spring season blooming trees" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="slider-container" aria-labelledby="slider-heading">
      <h2 id="slider-heading" className="sr-only">
        Seasonal Image Slider
      </h2>

      {/* Live region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {`Slide ${currentIndex + 1} of ${images.length}`}
      </div>

      {/* Image Wrapper */}
      <div className="slider-image-wrapper">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className={`slider-image ${currentIndex === index ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="navigation-wrapper">
        <button
          className="prev-btn"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          ❮
        </button>

        {/* Dots (fully accessible) */}
        <div className="dots-wrapper" role="tablist">
          {images.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={currentIndex === index}
              aria-controls={`slide-${index}`}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">{`Go to slide ${index + 1}`}</span>
            </button>
          ))}
        </div>

        <button
          className="next-btn"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
