import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = () => {
  const carouselItems = [
    { id: 1, name: "Elegant Earrings", image: "/images/31343C.svg" },
    { id: 2, name: "Luxury Bag", image: "/images/31343C.svg" },
    { id: 3, name: "Classic Watch", image: "/images/31343C.svg" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <div className="w-full max-w-sm p-5 bg-white shadow-lg rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-4 text-center">{item.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;