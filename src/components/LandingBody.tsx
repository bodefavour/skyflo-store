import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import all images properly
import giftBoxImage from "../images/gift-box.jpg";
import customGiftImage from "../images/custom-gift.jpg";
import jewelryImage from "../images/jewelry.jpg";
import fashionImage from "../images/fashion.jpg";
import travelImage from "../images/travel.jpg";
import toteBagsImage from "../images/tote-bags.jpg";
import lipGlossImage from "../images/lip-gloss.jpg";
import decorImage from "../images/decor.jpg";
import eventsImage from "../images/events.jpg";
import holidaySpecialsImage from "../images/holiday-specials.jpg";
import backgroundPattern from "../images/luxury-pattern.png";
import featuredGiftBox from "../images/featured-gift-box.jpg";

// Organized image assets
const imageAssets = {
  products: {
    giftBoxes: giftBoxImage,
    customGifts: customGiftImage,
    jewelry: jewelryImage,
    fashion: fashionImage,
    travel: travelImage,
    toteBags: toteBagsImage,
    lipGloss: lipGlossImage,
    decor: decorImage,
    events: eventsImage,
    holidaySpecials: holidaySpecialsImage,
  },
  backgrounds: {
    pattern: backgroundPattern
  }
};

const giftCollections = [
  {
    title: "Executive Collection",
    desc: "Premium gifts for corporate clients and high-value partners",
    price: "$299+",
    image: imageAssets.products.giftBoxes,
  },
  {
    title: "Romantic Elegance",
    desc: "Curated boxes for anniversaries, engagements, and special moments",
    price: "$199+",
    image: imageAssets.products.holidaySpecials,
  },
  {
    title: "Wellness Retreat",
    desc: "Self-care packages for relaxation and rejuvenation",
    price: "$179+",
    image: imageAssets.products.decor,
  },
];

const services = [
  {
    title: "Jewelry & Accessories",
    desc: "Handcrafted pieces that complement our gift collections",
    image: imageAssets.products.jewelry,
  },
  {
    title: "Fashion Essentials",
    desc: "Signature luxury fashion items to complete your style",
    image: imageAssets.products.fashion,
  },
  {
    title: "Travel Collections",
    desc: "Refined accessories for the sophisticated traveler",
    image: imageAssets.products.travel,
  },
  {
    title: "Beauty & Care",
    desc: "Luxury beauty products that elevate your routine",
    image: imageAssets.products.lipGloss,
  },
  {
    title: "Home Decor",
    desc: "Intentional pieces that create luxurious spaces",
    image: imageAssets.products.decor,
  },
  {
    title: "Event Packages",
    desc: "Complete gifting solutions for corporate and social events",
    image: imageAssets.products.events,
  },
].map((service) => ({
  ...service,
  link: `/${encodeURIComponent(service.title.toLowerCase().replace(/\s+/g, "-"))}`,
}));

const testimonials = [
  {
    text: "The attention to detail in Skyflo's packaging and products is unmatched. Every item feels like a bespoke creation.",
    author: "Alexandra R.",
    title: "Luxury Brand Consultant"
  },
  {
    text: "Our clients were absolutely delighted with the corporate gift boxes. The unboxing experience is truly exceptional.",
    author: "Michael T.",
    title: "CEO, Tech Innovations"
  },
  {
    text: "I've never received a more thoughtful gift. The personalization options made it feel truly special.",
    author: "Sophia L.",
    title: "Loyal Customer"
  }
];

const LandingContents = () => {
  return (
    <main className="bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Gift Box Showcase Section */}
      <section className="relative py-24 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
                SIGNATURE COLLECTIONS
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
              Exquisite Gift Boxes, Curated with Care
            </h2>
            <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Discover our signature gift box collections, each thoughtfully curated to create unforgettable moments and lasting impressions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {giftCollections.map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-8 transition-all duration-500 group-hover:pb-12">
                    <h3 className="text-2xl md:text-3xl font-serif mb-2">{collection.title}</h3>
                    <p className="text-gray-300 mb-3">{collection.desc}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[#d4af37] font-medium">{collection.price}</span>
                      <Link
                        to={`/collection/${collection.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-white bg-[#d4af37] hover:bg-[#c99b3f] px-4 py-2 rounded-full text-sm transition-all"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/collections">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-[#d4af37] hover:bg-[#d4af37]/10 text-[#d4af37] px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300"
              >
                View All Collections
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Orders Section */}
      <section className="py-24 bg-[#0f0f0f] border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-8 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-2xl z-0"></div>
              <img 
                src={imageAssets.products.customGifts} 
                alt="Custom gift box" 
                className="relative z-10 rounded-xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6">
                <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
                  BESPOKE CREATIONS
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
                Custom Gift Boxes Tailored to Your Vision
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Our bespoke service allows you to create a truly unique gifting experience. Collaborate with our luxury curators to design a custom box that perfectly captures your sentiment and style.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Personalized item selection",
                  "Custom packaging and branding",
                  "Handwritten notes and cards",
                  "Themed collections for special occasions",
                  "Corporate branding options"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-[#d4af37] mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/custom-orders">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300 shadow-lg"
                  >
                    Design Your Box
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300"
                  >
                    Contact Our Team
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Gift Box */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={featuredGiftBox} 
            alt="Luxury gift box background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
                  COLLECTION HIGHLIGHT
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
                The Signature Skyflo Experience Box
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Our flagship collection embodies the essence of luxury gifting. Each box contains a curated selection of premium products that create a multisensory unboxing experience.
              </p>
              
              <div className="mb-10">
                <h3 className="text-xl font-serif mb-4 text-[#d4af37]">Included in this collection:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Handcrafted leather journal",
                    "Artisan-crafted scented candle",
                    "24K gold-plated pen",
                    "Luxury skincare set",
                    "Silk eye mask",
                    "Personalized monogramming"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[#d4af37] mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Link to="/product/signature-experience-box">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300 shadow-lg"
                  >
                    Discover the Collection
                  </motion.button>
                </Link>
                <div className="text-2xl font-light">$349</div>
              </div>
            </div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={featuredGiftBox} 
                  alt="Signature Skyflo Experience Box" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border border-[#ffffff30] rounded-2xl pointer-events-none"></div>
              </div>
              <div className="absolute -inset-8 border border-[#d4af3730] rounded-2xl pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Complementary Collections */}
      <section className="py-24 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6">
              <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
                COMPLEMENTARY COLLECTIONS
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-light mb-6">
              Enhance Your Gifting Experience
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our curated selection of luxury items that perfectly complement our gift boxes
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
                <div className="relative h-[400px] overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  
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
            <div className="inline-block mb-6">
              <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
                CLIENT EXPERIENCES
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-light mb-6">
              Voices of Delight
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover what our distinguished clientele says about the Skyflo experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#1a1a1a] p-8 border border-[#2a2a2a] rounded-xl"
              >
                <div className="text-[#d4af37] text-4xl mb-4">"</div>
                <p className="text-gray-300 mb-6 italic">
                  {testimonial.text}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b6914] mr-4"></div>
                  <div>
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={imageAssets.backgrounds.pattern} 
            alt="Luxury pattern background"
            className="w-full h-full object-cover opacity-[0.03]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 md:px-16">
          <div className="inline-block mb-8">
            <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
              STAY CONNECTED
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-light mb-6">
            Join Our Luxury Circle
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Subscribe to receive exclusive offers, new collection previews, and styling inspiration
          </p>
          
          <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-[#1a1a1a] border border-[#2a2a2a] text-white py-4 px-6 rounded-full focus:outline-none focus:border-[#d4af37] transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300 shadow-lg rounded-full"
            >
              Subscribe
            </motion.button>
          </form>
          
          <p className="text-gray-500 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
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
        <div className="absolute inset-0">
          <img 
            src={giftBoxImage} 
            alt="Luxury gift box background" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 md:px-16">
          <div className="inline-block mb-8">
            <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
              EXCLUSIVE OFFER
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-light mb-6">
            Elevate Your Gifting Experience
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Discover the art of meaningful gifting with Skyflo's premium collections
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/collections">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300 shadow-lg"
              >
                Explore Collections
              </motion.button>
            </Link>
            <Link to="/custom-orders">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-4 font-medium tracking-wider text-lg transition-all duration-300"
              >
                Create Custom Order
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default LandingContents;