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
    function moveSlider(e) {
      if (!isDragging) return;

      // Read fresh measurements each move so layout/resize won't break mapping
      const dimensions = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - dimensions.left;
      let percent = (relativeX / dimensions.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      // throttle updates to animation frames
     if (dragAnimationRef.current) {
  cancelAnimationFrame(dragAnimationRef.current);
}

dragAnimationRef.current = requestAnimationFrame(() => {
  setSliderPosition(percent);
});

    }

    function stopDrag() {
      if (isDragging) {
        setIsDragging(false);
      }
    }

    document.addEventListener("mousemove", moveSlider);
    document.addEventListener("mouseup", stopDrag);

    return () => {
      document.removeEventListener("mousemove", moveSlider);
      document.removeEventListener("mouseup", stopDrag);
      if (dragAnimationRef.current) cancelAnimationFrame(dragAnimationRef.current);
    };
  }, [isDragging]);

  // Optional: handle window resize so if container moves/changes we keep consistent
  useEffect(() => {
    function handleResize() {
      // small no-op — we don't store dimensions; moveSlider reads rect on every move.
      // But you could re-calc sliderPosition if you store pixel values.
      // Keeping this here in case you want to add responsive logic later.
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add / remove a CSS class to disable transitions while dragging
  const containerClass = `before-after-container${isDragging ? " dragging" : ""}`;

  return (
    <div
      className={containerClass}
      ref={containerRef}
      // support simple in-container start/stop as well
      onMouseDown={(e) => {
        // If user clicked the handle or anywhere in container - start dragging
        // We'll keep dragging true, document listeners handle move + stop
        setIsDragging(true);
      }}
      // optional: handleMouseLeave could stop dragging if desired
    >
      {/* BEFORE IMAGE: width grows with sliderPosition */}
      <img
        className="before-img"
        src={spring}
        alt="before"
        style={{ width: `${sliderPosition}%` }}
        draggable={false}
      />

      {/* AFTER IMAGE: anchored to right; width is remaining percentage */}
      <img
        className="after-img"
        src={fall}
        alt="after"
        style={{ width: `${100 - sliderPosition}%` }}
        draggable={false}
      />

      {/* Handle; its left is the percent */}
      <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
        <div
          className="slider-line"
          style={{ width: sliderPosition === 0 ? "0px" : "3px" }}
        />
        <div
          className="handle"
          onMouseDown={(e) => {
            // prevent text/image selection while dragging
            e.preventDefault();
            setIsDragging(true);
          }}
        />
      </div>
    </div>
  );
}
