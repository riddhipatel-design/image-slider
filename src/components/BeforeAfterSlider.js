import React, { useRef, useEffect, useState } from "react";
import "./BeforeAfterSlider.css";
import sunBlue from "../assets/sun_blue.jpg";
import sunPink from "../assets/sun_pink.jpg";

export default function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const dragAnimationRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50); // 0–100

  // Live region text
  const [announcement, setAnnouncement] = useState("");

  // announce % to screen readers
  useEffect(() => {
    setAnnouncement(`Slider at ${Math.round(sliderPosition)} percent`);
  }, [sliderPosition]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (dragAnimationRef.current) cancelAnimationFrame(dragAnimationRef.current);
    };
  }, []);

  // Drag logic
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
      if (isDragging) updatePosition(e.clientX);
    }

    function moveTouch(e) {
      if (isDragging) updatePosition(e.touches[0].clientX);
    }

    function stopDrag() {
      if (isDragging) setIsDragging(false);
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

  return (
    <div
      className={`before-after-container${isDragging ? " dragging" : ""}`}
      ref={containerRef}
      aria-label="Before and after comparison slider"
    >
      {/* Screen reader image labels */}
      <span className="sr-only">Before image on the left</span>
      <span className="sr-only">After image on the right</span>

      <img
        className="before-img"
        src={sunBlue}
        alt="Before comparison"
        style={{ width: `${sliderPosition}%` }}
        draggable={false}
      />

      <img
        className="after-img"
        src={sunPink}
        alt="After comparison"
        style={{ width: `${100 - sliderPosition}%` }}
        draggable={false}
      />

      {/* Slider handle */}
      <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
        <div
          className="slider-line"
          aria-hidden="true"
          style={{ width: sliderPosition === 0 ? "0px" : "2px" }}
        />

        <div
          className="handle"
          role="slider"
          aria-label="Comparison slider handle"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuetext={`${Math.round(sliderPosition)} percent`}
          tabIndex="0"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onKeyDown={(e) => {
            const step = 2;

            if (e.key === "ArrowLeft") {
              setSliderPosition((prev) => Math.max(0, prev - step));
            }
            if (e.key === "ArrowRight") {
              setSliderPosition((prev) => Math.min(100, prev + step));
            }
            if (e.key === "Home") setSliderPosition(0);
            if (e.key === "End") setSliderPosition(100);
          }}
        >
          <span className="sr-only">Drag to reveal before or after</span>
        </div>
      </div>

      {/* Live region for screen readers */}
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
}
