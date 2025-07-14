import { Link } from "react-router-dom";
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
    title: "Tote Bags",
    desc: "Minimal yet bold — our signature tote bags are built to carry your world while turning heads. Fashion meets everyday luxury in every stitch.",
    image: "/images/IMG-20250322-WA0051.jpg",
  },
  {
    title: "Lip Gloss",
    desc: "More than makeup — it’s a glow. Our luxury lip glosses offer high shine, smooth application, and nourishing formulas to leave you feeling radiant.",
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
  return (
    <main className="bg-white text-black px-4 md:px-16 py-12 space-y-20">

      {/* Hero Text */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto text-center px-2"
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-snug mb-4">
          Welcome to Skyflo
        </h2>
        <h3 className="text-2xl md:text-4xl font-semibold mb-6">
          Luxury Gifting. Curated Elegance. Everyday Moments.
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-gray-700">
          Skyflo is your destination for elevated lifestyle essentials — from premium gift boxes to artisan-crafted fashion, accessories, and décor. 
          We blend intentional design, cultural richness, and a taste of indulgence for those who believe luxury should feel personal.
        </p>
        <Link to="/auth">
          <button className="mt-6 bg-black hover:bg-gray-900 transition text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-medium shadow-md">
            Join the Skyflo Experience
          </button>
        </Link>
      </motion.section>

      {/* Service Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="group bg-[#fdf8f3] hover:shadow-lg transition p-4 md:p-6 rounded-2xl flex flex-col justify-between"
          >
            <img
              src={service.image}
              alt={service.title}
              className="rounded-xl mb-4 h-40 md:h-52 object-cover w-full"
            />
            <h4 className="text-xl md:text-2xl font-semibold mb-2">{service.title}</h4>
            <p className="text-sm md:text-base text-gray-700 mb-4">{service.desc}</p>
            <Link
              to={service.link}
              className="text-orange-500 hover:underline font-medium text-sm md:text-base"
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
        className="text-center space-y-4 md:space-y-6 bg-black text-white py-10 md:py-16 px-4 md:px-6 rounded-lg shadow-xl"
      >
        <h3 className="text-2xl md:text-4xl font-bold tracking-wide">
          Redefine Luxury. Elevate Every Moment.
        </h3>
        <p className="max-w-2xl mx-auto text-sm md:text-lg leading-relaxed text-gray-300">
          Join the Skyflo movement—where curated gifts, timeless fashion, and bold beauty converge to create unforgettable experiences. Discover elegance, delivered with purpose.
        </p>
        <Link to="/product-page">
          <button className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-lg tracking-wide hover:bg-gray-200 transition-all duration-300 shadow-md">
            Explore Our Collection
          </button>
        </Link>
      </motion.section>
    </main>
  );
};

export default LandingContents;