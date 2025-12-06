import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

import ImageSliderPage from "./pages/ImageSliderPage";
import BeforeAfterPage from "./pages/BeforeAfterPage";

function App() {
  return (
    <BrowserRouter>

      <div style={{ textAlign: "center", padding: "20px" }}>
        <div 
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px"
  }}
>
  <h1 style={{ margin: 0 }}>Interactive Components</h1>

  <nav>
    <ul style={{ 
      display: "flex",
      listStyle: "none", 
      margin: 0, 
      padding: 0 
    }}>
      <li>
        <NavLink to="/image-slider" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
  Image Slider </NavLink>
      </li>
      <li style={{ marginLeft: "20px" }}>
        <NavLink to="/before-after" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Before / After</NavLink>
      </li>
    </ul>
  </nav>
</div>

       

     
        <Routes>
          <Route path="/image-slider" element={<ImageSliderPage />} />
          <Route path="/before-after" element={<BeforeAfterPage />} />
          
          {/* default route */}
          <Route path="/" element={<ImageSliderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
