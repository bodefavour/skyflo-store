import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import BirthdayGiftPage from "./pages/BirthdayGiftPage"; // Import the new page

function App() {
  const sampleProducts = [
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },
    // Add more products
  ];

  return (
    <Router>
      <NavBar /> {/* NavBar stays on every page */}
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection backgroundImage="/images/hero-bg.jpg" brandName="SKYFLO" />
            <ProductGrid products={sampleProducts} />
          </>
        } />
        <Route path="/birthday-gifts" element={<BirthdayGiftPage />} />
      </Routes>
    </Router>
  );
}

export default App;
//     //The  App  component is the main component that renders the navigation bar and the main content.