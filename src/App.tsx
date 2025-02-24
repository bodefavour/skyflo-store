import React from "react";
import NavBar from "../src/components/NavBar";
import HeroSection from "../src/components/HeroSection";
import ProductGrid from "../src/components/ProductGrid";

function App() {
  const sampleProducts = [
    { id: 1, name: "Red Gown", price: 599.99, image: "/images/31343C.svg" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
    { id: 2, name: "Royal Crown", price: 299.99, image: "/images/31343C.svg" },// ... add more
  ];

  return (
    <main>
      <NavBar />
      <HeroSection backgroundImage="/images/hero-bg.jpg" brandName="SKYFLO" />
      <ProductGrid products={sampleProducts} />
    </main>
  );
}
export default App;