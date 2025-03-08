import React from "react";

interface HeroSectionProps {
  backgroundImage: string;
  brandName?: string; 
textSize?: string; 
textSpacing?: string;
customStyle?: React.CSSProperties;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  brandName = "SKYFLO", 
textSize = "text-6xl", 
textSpacing = "tracking-normal leading-tight",
customStyle,
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center">
      {/* Responsive Image Wrapper */}
      <div className="relative w-full h-screen flex justify-center items-start">
        {/* PC/Laptop Specific Container */}
        <div className="w-full h-[100vh] md:h-[100vh] md:max-w-[1600px] mx-auto overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-top md:object-contain"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Hero Text */}
      <h1
        className="absolute font-extralight uppercase leading-[1.2] font-phudu text-white"
        style={{
          top: "5%", // Upper 1/3 of screen
          left: "55%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}
      >
        <span className="text-[6rem] tracking-[0.2em] md:text-[14rem] md:tracking-[0.4em]">
          {brandName}
        </span>
      </h1>
    </section>
  );
};

export default HeroSection;
