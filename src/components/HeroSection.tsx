import React, { ReactNode } from "react";

interface HeroSectionProps {
  backgroundImage: string;
  brandName?: string; 
  textSize?: string; 
  textSpacing?: string;
  customStyle?: React.CSSProperties; 
children?: ReactNode;
  className?: string;  
brandNameStyle?: React.CSSProperties;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  brandName, // Now optional
  children,
  className = "",
}) => {
  return (
    <section className={`relative w-full min-h-screen flex flex-col items-center ${className}`}>
      {/* Background Image */}
      <div className="relative w-full h-screen flex justify-center items-start">
        <div className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Custom Content Positioned 1/3 from Bottom */}
      <div className="absolute bottom-[13%] left-1/2 transform -translate-x-1/2 text-center text-white z-10 w-full">
        {children}
      </div>

      {/* Only show brand name if provided */}
      {brandName && (
        <h1 className="absolute font-extralight uppercase font-phudu text-white"
          style={{
            top: "1%", // Upper 1/3 of screen
            left: "55%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <span className="text-[6rem] tracking-[0.2em] md:text-[14rem] md:tracking-[0.4em]">
            {brandName}
          </span>
        </h1>
      )}
    </section>
  );
};

export default HeroSection;
