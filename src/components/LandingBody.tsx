// Project: Boshan Beauty Preorder Landing Page
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import { motion } from "framer-motion";

const services = [
    {
        title: "Skincare Essentials",
        desc: "Nurture your skin with our carefully crafted skincare essentials, inspired by rich Esan heritage and designed to celebrate your natural glow.",
        image: "/images/IMG-20250402-WA0132.jpg",
    },
    {
        title: "Beardcare Essentials",
        desc: "Elevate your beard game with grooming rituals that honor tradition while delivering softness, strength, and style.",
        image: "/images/IMG-20250322-WA0048.jpg",
    },
    {
        title: "Personal Hygiene",
        desc: "Cleanse and refresh daily with products rooted in culture and crafted for lasting freshness and confidence.",
        image: "/images/IMG-20250322-WA0051.jpg",
    },
    {
        title: "Beauty Tools and Makeup Accessories",
        desc: "Tools and accessories designed to enhance your natural beauty and express your unique style with cultural pride.",
        image: "/images/IMG-20250402-WA0140.jpg",
    },
    {
        title: "Subscription Boxes",
        desc: "Curated self-care experiences delivered to your door; Discover the perfect blend of tradition and modern indulgence every month.",
        image: "/images/IMG-20250322-WA0051.jpg",
    },
    {
        title: "Skin Therapy and Consultations",
        desc: "Personalized skin solutions and expert advice that connect age-old wisdom with modern skincare science.",
        image: "/images/IMG-20250402-WA0132.jpg",
    },
    {
        title: "Skinfood & Nutrition",
        desc: "Fuel your skin from within with nutrition inspired by nature and crafted for radiant, healthy skin.",
        image: "/images/IMG-20250402-WA0134.jpg",
    },
].map((service) => ({
    ...service,
    link: `/preorder/${encodeURIComponent(service.title.toLowerCase().replace(/\s+/g, "-"))}`,
}));

const LandingContents = () => {
    function handleLogout(event: React.MouseEvent<HTMLButtonElement>): void {
        throw new Error("Function not implemented.");
    }

    return (<><main>

    </main><div className="bg-white text-black px-6 md:px-16 py-12 space-y-20">
            {/* Awareness Teaser */}
            {/* <motion.section className="text-center">
              <p className="text-xl italic text-gray-700">“You’ve never glowed like this before… Boshan is almost here 👀✨”</p>
          </motion.section> */}

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Welcome to Boshan
                </h2>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Your Skin. Your Ritual. Your Lifestyle.
                </h2>
                <p className="text-lg md:text-xl leading-relaxed">
                    BOSHAN is more than a brand, it's a movement. Rooted in rich Esan culture and elevated with modern elegance,
                    we curate handcrafted skincare, luxe fashion, and memorable gifting experiences for today’s bold, conscious generation.
                    Join the Glow List today to be the first to preorder and get exclusive early bird benefits!
                </p>
                <Link to="/auth">
                    <button className="mt-6 bg-orange-600 hover:bg-orange-700 transition text-white px-8 py-3 rounded-full text-lg font-medium shadow-xl">
                        Be the First to Pre-Order
                    </button>
                </Link>
            </motion.section>

            {/* Services Overview */}
            <motion.section>
                initial="hidden"
                whileInView="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.3 },
                    },
                }}
                className="grid md:grid-cols-2 gap-10"
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="group bg-[#fdf8f3] hover:shadow-xl transition p-6 rounded-2xl flex flex-col justify-between"
                    >
                        <img
                            src={service.image}
                            alt={service.title}
                            className="rounded-xl mb-4 h-48 object-cover w-full" />
                        <h4 className="text-2xl font-semibold mb-2">{service.title}</h4>
                        <p className="text-base text-gray-700 mb-4">{service.desc}</p>
                        <Link
                            to={service.link}
                            className="text-orange-500 hover:underline font-medium"
                        >
                            Explore More →
                        </Link>
                    </motion.div>
                ))}

            {/* Final CTA */}
            <motion.section
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-center space-y-6"
            >
                <h3 className="text-3xl font-bold">Glow Different. Gift Bold. The Boshan Way.</h3>
                <p className="max-w-2xl mx-auto text-lg">
                    Join the tribe that's redefining beauty, fashion, and celebration. Culture meets Gen-Z energy in every drop, stitch, and beat.
                </p>
                <Link to="/product-page">
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md">
                        Shop Now
                    </button>
                </Link>
            </motion.section>
        </div></>
    );
};

export default LandingContents;