import React from "react";
import NavBar from "../navigation/NavBar";
import Footer from "../navigation/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />
      <main className="pt-20 sm:pt-24 pb-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;