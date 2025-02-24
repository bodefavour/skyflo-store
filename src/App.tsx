import React from "react";
import NavBar from "../src/components/NavBar";
import HeroSection from "../src/components/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <NavBar />
      <HeroSection backgroundImage="/images/hero-bg.jpg" brandName="SKYFLO" />
    </main>
  );
}