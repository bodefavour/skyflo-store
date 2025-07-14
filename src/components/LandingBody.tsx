import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    title: "Gift Boxes",
    desc: "Curated luxury gifts made to impress, inspire, and elevate your gifting game.",
    image: "/images/IMG-20250402-WA0132.jpg",
  },
  {
    title: "Jewelries and Beaded Bracelets",
    desc: "Handcrafted pieces that blend culture, elegance, and timeless design.",
    image: "/images/IMG-20250322-WA0048.jpg",
  },
  {
    title: "Fashion",
    desc: "Confidently express yourself through Skyflo’s signature luxury fashion essentials.",
    image: "/images/IMG-20250322-WA0051.jpg",
  },
  {
    title: "Travel",
    desc: "Refined travel accessories for those who journey in style and identity.",
    image: "/images/IMG-20250402-WA0140.jpg",
  },
  {
    title: "Tote Bags",
    desc: "Functional, fashionable, and bold — Skyflo’s signature totes carry elegance.",
    image: "/images/IMG-20250322-WA0051.jpg",
  },
  {
    title: "Lip Gloss",
    desc: "Luxury gloss with a radiant finish. Shine bold. Glow different.",
    image: "/images/IMG-20250402-WA0132.jpg",
  },
  {
    title: "Decor",
    desc: "Intentional decor pieces that turn everyday spaces into luxurious sanctuaries.",
    image: "/images/IMG-20250402-WA0134.jpg",
  },
  {
    title: "Events",
    desc: "Elegant experiences, beautifully crafted. Let Skyflo bring your moments to life.",
    image: "/images/IMG-20250402-WA0134.jpg",
  },
  {
    title: "Holiday Specials",
    desc: "Exclusive festive collections to gift, keep, and remember.",
    image: "/images/IMG-20250402-WA0134.jpg",
  },
].map((service) => ({
  ...service,
  link: `/preorder/${encodeURIComponent(service.title.toLowerCase().replace(/\s+/g, "-"))}`,
}));

const LandingContents = () => {
  return (
    <main className="bg-black text-white px-4 md:px-16 py-16 space-y-24 font-sans">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-6 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-wider">Welcome to Skyflo</h2>
        <h3 className="text-2xl md:text-4xl font-medium text-gold-400">Luxury Gifting. Curated Elegance. Everyday Moments.</h3>
        <p className="text-base md:text-lg text-gray-300">
          Skyflo is your destination for refined lifestyle experiences — from premium gifts to timeless fashion, 
          cultural accessories, and bold beauty products. Luxury meets soul here.
        </p>
        <Link to="/auth">
          <button className="mt-6 bg-[#d1a954] hover:bg-[#c99b3f] transition text-black px-6 py-3 rounded-full text-lg font-medium shadow-lg">
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
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="group bg-[#1a1a1a] hover:shadow-lg hover:scale-[1.02] transition p-4 md:p-6 rounded-2xl"
          >
            <img
              src={service.image}
              alt={service.title}
              className="rounded-xl mb-4 h-48 object-cover w-full"
            />
            <h4 className="text-xl md:text-2xl font-semibold text-gold-400 mb-2">{service.title}</h4>
            <p className="text-sm md:text-base text-gray-300 mb-4">{service.desc}</p>
            <Link
              to={service.link}
              className="text-[#d1a954] hover:underline font-medium text-sm md:text-base"
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
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 py-20 px-6 bg-[#111] rounded-lg shadow-2xl"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white">
          Redefine Luxury. Elevate Every Moment.
        </h3>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-400">
          Join the Skyflo movement — where curated gifts, elegant style, and cultural energy combine to make bold statements in every gesture.
        </p>
        <Link to="/product-page">
          <button className="bg-[#d1a954] text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#c99739] transition-all shadow-lg">
            Explore Our Collection
          </button>
        </Link>
      </motion.section>
    </main>
  );
};

export default LandingContents;