import React from "react";
import ImageSlider from "../components/ImageSlider";
import "./page-styles.css"; 

export default function ImageSliderPage() {
  return (
    <div className="wrapper">
      <h2 className="title">Image Slider</h2>
        <ImageSlider />
    </div>
  );
}
