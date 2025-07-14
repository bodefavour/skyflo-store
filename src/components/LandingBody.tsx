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
        title: "Gift Boxes",
        desc: "Experience the joy of giving with our curated luxury gift selections. From timeless keepsakes to heartfelt surprises, we make every moment unforgettable.",
        image: "/images/IMG-20250402-WA0132.jpg",
    },
    {
        title: "Jewelries and Beaded Bracelets",
        desc: "Explore a collection where craftsmanship meets culture. Our handcrafted jewelry and beaded bracelets are designed to elevate your style with intentional elegance.",
        image: "/images/IMG-20250322-WA0048.jpg",
    },
    {
        title: "Fashion",
        desc: "Step into refined fashion with Skyflo’s exclusive wardrobe pieces — blending modern luxury with timeless silhouettes that speak confidence and class.",
        image: "/images/IMG-20250322-WA0051.jpg",
    },
    {
        title: "Travel",
        desc: "Redefine how you move. Our travel accessories are crafted for those who believe in journeying with style, functionality, and a sense of identity.",
        image: "/images/IMG-20250402-WA0140.jpg",
    },
    {
        title: "Tote Bag's",
        desc: "Minimal yet bold — our signature tote bags are built to carry your world while turning heads. Fashion meets everyday luxury in every stitch.",
        image: "/images/IMG-20250322-WA0051.jpg",
    },
    {
        title: "Lip Gloss",
        desc: "More than makeup — it’s a glow. Our luxury lip glosses offer high shine, smooth application, and nourishing formulas to leave you feeling radiant.
",
        image: "/images/IMG-20250402-WA0132.jpg",
    },
    {
        title: "Decor",
        desc: "Bring intentional beauty to your space. Our curated decor pieces inspire calm, sophistication, and a deep sense of home.",
        image: "/images/IMG-20250402-WA0134.jpg",
    },
{
        title: "Events",
        desc: "From private soirées to large-scale celebrations, we create experiences that exude elegance. Let Skyflo design your next unforgettable moment.",
        image: "/images/IMG-20250402-WA0134.jpg",
    },
{
        title: "Holiday Specials",
        desc: "Limited-edition magic designed for your most memorable seasons. Skyflo’s holiday picks are perfect for gifting or self-indulgence.",
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

            <motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="max-w-4xl mx-auto text-center"
>
  <h2 className="text-4xl md:text-5xl font-bold mb-6">
    Welcome to Skyflo
  </h2>
  <h2 className="text-4xl md:text-5xl font-bold mb-6">
    Luxury Gifting. Curated Elegance. Everyday Moments.
  </h2>
  <p className="text-lg md:text-xl leading-relaxed">
    Skyflo is your destination for elevated lifestyle essentials — from premium gift boxes to artisan-crafted fashion, accessories, and décor. 
    We blend intentional design, cultural richness, and a taste of indulgence for those who believe luxury should feel personal. 
    Be the first to discover limited releases, exclusive drops, and unforgettable moments made just for you.
  </p>
  <Link to="/auth">
    <button className="mt-6 bg-black hover:bg-gray-900 transition text-white px-8 py-3 rounded-full text-lg font-medium shadow-xl">
      Join the Skyflo Experience
    </button>
  </Link>
</motion.section>

            <motion.section
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
</motion.section>
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