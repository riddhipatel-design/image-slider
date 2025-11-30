import React, { useRef, useEffect, useState } from "react";
import "./BeforeAfterSlider.css";
import spring from "../assets/spring.jpg";
import fall from "../assets/fall.jpg";

export default function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const dragAnimationRef = useRef(null); // rafRef is a React ref that stores a value which does not reset on re-render.
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0..100

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (dragAnimationRef.current) {
        cancelAnimationFrame(dragAnimationRef.current);
      }
    };
  }, []);

  // Mouse move handler attached to document for robust dragging
  useEffect(() => {
    function updatePosition(clientX) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left;

      let percent = (relativeX / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      if (dragAnimationRef.current)
        cancelAnimationFrame(dragAnimationRef.current);

      dragAnimationRef.current = requestAnimationFrame(() => {
        setSliderPosition(percent);
      });
    }

    function moveMouse(e) {
      if (!isDragging) return;
      updatePosition(e.clientX);
    }

    function moveTouch(e) {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    }

    function stopDrag() {
      if (!isDragging) return;
      setIsDragging(false);
    }

    document.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseup", stopDrag);

    document.addEventListener("touchmove", moveTouch, { passive: false });
    document.addEventListener("touchend", stopDrag);
    document.addEventListener("touchcancel", stopDrag);

    return () => {
      document.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseup", stopDrag);

      document.removeEventListener("touchmove", moveTouch);
      document.removeEventListener("touchend", stopDrag);
      document.removeEventListener("touchcancel", stopDrag);
    };
  }, [isDragging]);

  const containerClass = `before-after-container${isDragging ? " dragging" : ""}`;

  return (
    <div className={containerClass} ref={containerRef}>
      <img
        className="before-img"
        src={spring}
        alt="before"
        style={{ width: `${sliderPosition}%` }}
        draggable={false}
      />

      <img
        className="after-img"
        src={fall}
        alt="after"
        style={{ width: `${100 - sliderPosition}%` }}
        draggable={false}
      />

      <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
        <div
          className="slider-line"
          style={{ width: sliderPosition === 0 ? "0px" : "2px" }}
        />

        <div
          className="handle"
          tabIndex="0"
          onMouseDown={(e) => {
            e.preventDefault();
              e.currentTarget.focus();
            setIsDragging(true);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
              e.currentTarget.focus();
            setIsDragging(true);
          }}
        onKeyDown={(e) => {
  containerRef.current.classList.add("keyboard-active");

  if (e.key === "ArrowLeft") {
    setSliderPosition(prev => Math.max(0, prev - 2));
  }
  if (e.key === "ArrowRight") {
    setSliderPosition(prev => Math.min(100, prev + 2));
  }

  // remove after tiny delay
  clearTimeout(containerRef.current._keyTimer);
  containerRef.current._keyTimer = setTimeout(() => {
    containerRef.current.classList.remove("keyboard-active");
  }, 100);
}}

        />
      </div>
    </div>
  );
}