import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import all product images properly
import giftBoxesImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import jewelryImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import fashionImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import travelImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import toteBagsImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import lipGlossImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import decorImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import eventsImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import holidaySpecialsImage from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";
import backgroundPattern from "../images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif";

// Organized image assets
const imageAssets = {
  products: {
    giftBoxes: giftBoxesImage,
    jewelry: jewelryImage,
    fashion: fashionImage,
    travel: travelImage,
    toteBags: toteBagsImage,
    lipGloss: lipGlossImage,
    decor: decorImage,
    events: eventsImage,
    holidaySpecials: holidaySpecialsImage,
  },
  pattern: backgroundPattern
};

const services = [
  {
    title: "Gift Boxes",
    desc: "Curated luxury gifts made to impress, inspire, and elevate your gifting game.",
    image: imageAssets.products.giftBoxes,
  },
  {
    title: "Jewelries and Beaded Bracelets",
    desc: "Handcrafted pieces that blend culture, elegance, and timeless design.",
    image: imageAssets.products.jewelry,
  },
  {
    title: "Fashion",
    desc: "Confidently express yourself through Skyflo's signature luxury fashion essentials.",
    image: imageAssets.products.fashion,
  },
  {
    title: "Travel",
    desc: "Refined travel accessories for those who journey in style and identity.",
    image: imageAssets.products.travel,
  },
  {
    title: "Tote Bags",
    desc: "Functional, fashionable, and bold — Skyflo's signature totes carry elegance.",
    image: imageAssets.products.toteBags,
  },
  {
    title: "Lip Gloss",
    desc: "Luxury gloss with a radiant finish. Shine bold. Glow different.",
    image: imageAssets.products.lipGloss,
  },
  {
    title: "Decor",
    desc: "Intentional decor pieces that turn everyday spaces into luxurious sanctuaries.",
    image: imageAssets.products.decor,
  },
  {
    title: "Events",
    desc: "Elegant experiences, beautifully crafted. Let Skyflo bring your moments to life.",
    image: imageAssets.products.events,
  },
  {
    title: "Holiday Specials",
    desc: "Exclusive festive collections to gift, keep, and remember.",
    image: imageAssets.products.holidaySpecials,
  },
].map((service) => ({
  ...service,
  link: `/${encodeURIComponent(service.title.toLowerCase().replace(/\s+/g, "-"))}`,
}));

const LandingContents = () => {
  return (
    <main className="bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Luxury Brand Logos Section */}
      <section className="py-16 bg-[#0f0f0f] border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <h3 className="text-center text-gray-400 font-light mb-12 tracking-widest text-sm">
            AS FEATURED IN
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-center">
            {["Vogue", "ELLE", "Harper's Bazaar", "GQ", "Tatler"].map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-center"
              >
                <div className="text-gray-400 text-xl font-serif italic">{brand}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-24 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h3 className="text-3xl md:text-4xl font-serif mb-6">Our Collections</h3>
            <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our exclusive range of luxury products crafted with precision and elegance
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group overflow-hidden"
              >
                <div className="relative h-[400px] overflow-hidden">
                  {/* Image with gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 transition-all duration-500 group-hover:pb-10">
                    <h4 className="text-xl md:text-2xl font-serif mb-2">{service.title}</h4>
                    <p className="text-gray-300 mb-4 text-sm">{service.desc}</p>
                    <Link
                      to={service.link}
                      className="text-[#d4af37] font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      Discover Collection
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-[#0f0f0f] border-y border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-serif mb-6">Client Experiences</h3>
            <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover what our distinguished clientele says about the Skyflo experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#1a1a1a] p-8 border border-[#2a2a2a]"
              >
                <div className="text-[#d4af37] text-4xl mb-4">"</div>
                <p className="text-gray-300 mb-6 italic">
                  The attention to detail in Skyflo's packaging and products is unmatched. Every item feels like a bespoke creation.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
                  <div>
                    <h4 className="font-medium">Alexandra R.</h4>
                    <p className="text-sm text-gray-500">Luxury Brand Consultant</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 relative overflow-hidden"
      >
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-[url('/images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif')] bg-repeat opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 md:px-16">
          <div className="inline-block mb-8">
            <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
              EXCLUSIVE OFFER
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-light mb-6">
            Redefine Luxury. Elevate Every Moment.
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Join the Skyflo movement — where curated gifts, elegant style, and cultural energy combine to make bold statements in every gesture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/product-page">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300 shadow-lg"
              >
                Explore Our Collection
              </motion.button>
            </Link>
            <Link to="/preorder">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300"
              >
                Pre-order Now
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default LandingContents;