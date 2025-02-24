import React from "react";

interface HeroSectionProps {
  backgroundImage: string;
  brandName?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  brandName = "SKYFLO",
}) => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      {/* Dark overlay to make text stand out */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Main hero text */}
      <h1
        className="relative z-10 text-[6rem] md:text-[10rem] font-bold uppercase tracking-[0.2em] leading-tight font-phudu"
        style={{
          position: "absolute",
          top: "15%", // Adjusted to be in upper 1/3rd
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}
      >
        {brandName}
      </h1>
    </section>
  );
};

export default HeroSection;