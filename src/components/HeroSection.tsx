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
    <section className="relative w-full min-h-screen flex flex-col items-center">
      {/* Image Container (Prevents Overflow, Shows Only 70% of Image) */}
      <div className="w-full h-[100vh] md:h-[100vh] overflow-hidden flex justify-center items-center">
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full max-w-[1600px] h-full object-cover"
          style={{ objectPosition: "contain" }} // Shows the upper 70% of the image
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      {/* Hero Text */}
      <h1
        className="absolute font-light uppercase leading-[1.2] font-phudu text-white"
        style={{
          top: "5%", // Adjusted for upper 1/3
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
