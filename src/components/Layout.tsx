import React from "react";
import NavBar from "./NavBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
    
    //The  Layout  component is a simple component that wraps the  NavBar  component and the children components. 
    //The  NavBar  component is a simple component that displays a navigation bar.