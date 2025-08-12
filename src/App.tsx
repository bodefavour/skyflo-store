// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
// import ProductGrid from "./components/ProductGrid";
import JewellriesBeads from "./pages/BirthdayGiftPage"; // Import the new page
import TravelSection from "./pages/TravelSection"; // Import the new page
import ToteBag from "./pages/ToteBaSec"; // Import the new page
import FashionSection from "./pages/FashionSection"; // Import the new page
import LipGloss from "./pages/LipGloss"; // Import the new page
import Décor from "./pages/Décor"; // Import the new page
import EventsPae from "./pages/EventsPae"; // Import the new page
import HolidaySpecials from "./pages/HolidaySpecials"; // Import the new page
import BirthdayGifts from "./pages/BirthdayGiftPage"; // Import the new page
// import ProductCarousel from "./components/ProductCarousel"; // Import the new carousel component
import Layout from "./components/Layout";
import ProductPage from "./components/productpage";
import LandingBody from "./components/LandingBody";
import ProductsPage from "./pages/admin/products/ProductsPage";
import ProductForm from "./pages/admin/products/ProductsForm";
import AdminAuth from "./pages/admin/AdminAuth";
import DashboardPage from "./pages/admin/DashboardPage";
function App() {
  const sampleProducts = [
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page"},
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg", path: "./Product-page" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg", path: "./Product-page" },// Add more products
  ];

  return (
    <Router> 
      <NavBar /> {/* NavBar stays on every page */}
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection backgroundImage="/images/1001631204_enhanced.jpg.avif" brandName="SKYFLO" /> 
            <LandingBody />
          </>
        } />
        <Route path="/birthday-gifts" element={<BirthdayGifts />} />
        <Route path="/Jewellries-Beads" element={<JewellriesBeads />} />
        <Route path="/jewelry-%26-accessories" element={<JewellriesBeads />} />
        <Route path="/Fashion" element={<FashionSection />} />
        <Route path="/fashion-essentials" element={<FashionSection />} />
        <Route path="/travel-collections" element={<TravelSection />} />
        <Route path="/travel-section" element={<TravelSection />} />
        <Route path="/tote-bags" element={<ToteBag />} />
        <Route path="/Lip-gloss" element={<LipGloss />} />
        <Route path="/Decor" element={<Décor />} />
        <Route path="/home-decor" element={<Décor />} />
        <Route path="/admin/login" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
      <Route path="/admin/products/add" element={<ProductForm />} />
      <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        <Route path="/event-packages" element={<EventsPae />} />
        <Route path="/Events" element={<EventsPae />} />
        <Route path="/Holiday-Specials" element={<HolidaySpecials />} />
        <Route path="/Product-page" element={<ProductPage />} />
      </Routes> 
<Layout children={undefined} /> {/* Wrap the entire app with the Layout component */}
    </Router>
  );
}

export default App;
//     //The  App  component is the main component that renders the navigation bar and the main content.