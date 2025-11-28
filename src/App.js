import React from "react";
import ImageSlider from "./components/ImageSlider";
import BeforeAfterSlider from "./components/BeforeAfterSlider";

function App() {
  return (
    <div>
     <h1>Image Slider</h1>
      <ImageSlider />

      <h2>Before / After</h2>
      <BeforeAfterSlider />
    </div>
  );
}



export default App;