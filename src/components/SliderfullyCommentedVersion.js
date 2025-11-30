import React, { useRef, useEffect, useState } from "react";
import "./BeforeAfterSlider.css";
import spring from "../assets/spring.jpg";
import fall from "../assets/fall.jpg";

const BeforeAfterSlider = () => {
  // holds reference to the container DOM element
  const containerRef = useRef(null);

  // track whether user is dragging the handle
  const [isDragging, setIsDragging] = useState(false);

  // slider position in % (0 = far left, 100 = far right)
  const [sliderPosition, setSliderPosition] = useState(50);

  // for throttling updates
  const dragAnimationRef = useRef(null);

  // ------------------------------
  // MAIN MOVE LOGIC
  // ------------------------------
  useEffect(() => {
    function moveSlider(e) {
      if (!isDragging) return;

      // 1. fresh measurement of container
      const rect = containerRef.current.getBoundingClientRect();

      // 2. get mouse X in page space
      const x = e.clientX;

      // 3. convert: how far inside the container (left → right)
      let percent = ((x - rect.left) / rect.width) * 100;

      // 4. clamp range (never below 0 or above 100)
      percent = Math.max(0, Math.min(100, percent));

      // throttle so it updates only once per animation frame
      if (dragAnimationRef.current) cancelAnimationFrame(dragAnimationRef.current);

      dragAnimationRef.current = requestAnimationFrame(() => {
        setSliderPosition(percent);
      });
    }

    // listen to mouse move globally
    document.addEventListener("mousemove", moveSlider);

    return () => {
      document.removeEventListener("mousemove", moveSlider);
    };
  }, [isDragging]);

  // ------------------------------
  // STOP DRAGGING ON MOUSE UP
  // ------------------------------
  useEffect(() => {
    function stop() {
      setIsDragging(false);
    }
    document.addEventListener("mouseup", stop);
    return () => document.removeEventListener("mouseup", stop);
  }, []);

  return (
    <div className="before-after-container" ref={containerRef}>
      {/* Left image (visible area depends on sliderPosition %) */}
      <img
        className="before-img"
        src={spring}
        alt="before"
        style={{ width: `${sliderPosition}%` }}
      />

      {/* Right image (opposite width) */}
      <img
        className="after-img"
        src={fall}
        alt="after"
        style={{ width: `${100 - sliderPosition}%` }}
      />

      {/* Handle container positioned at slider position */}
      <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
        {/* Vertical line */}
        <div
          className="slider-line"
          style={{ width: sliderPosition === 0 ? "0px" : "3px" }}
        ></div>

        {/* Draggable circle */}
        <div className="handle" onMouseDown={() => setIsDragging(true)}></div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
