import React from "react";
import ImageSlider from "./components/ImageSlider";
import BeforeAfterSlider from "./components/BeforeAfterSlider";

function App() {
  return (
    <div>
     <h1 style={{ textAlign: 'center', }}>Image Slider</h1>
      <ImageSlider />

      <h2 style={{ textAlign: 'center', }}>Before / After</h2>
      <BeforeAfterSlider />
    </div>
  );
}



export default App;