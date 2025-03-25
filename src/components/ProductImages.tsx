import React, { useState } from "react";

const images = [
  "/images/31343C.svg",
  "/images/31343C.svg",
  "/images/31343C.svg",
];

const ProductImages = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      <img
        src={selectedImage}
        alt="Product"
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="flex mt-4 space-x-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={`w-20 h-20 object-cover cursor-pointer rounded-md border ${
              selectedImage === img ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
