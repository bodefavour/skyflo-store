import { motion } from "framer-motion";

// Dummy featured products (replace with real product data or Firebase query)
const featuredProducts = [
  {
    name: "Luxury Gift Box",
    price: "₦25,000",
    image: "/images/product1.jpg",
  },
  {
    name: "Beaded Elegance Bracelet",
    price: "₦15,000",
    image: "/images/product2.jpg",
  },
  {
    name: "Premium Travel Tote",
    price: "₦30,000",
    image: "/images/product3.jpg",
  },
  {
    name: "Golden Lip Gloss Duo",
    price: "₦9,500",
    image: "/images/product4.jpg",
  },
];

const sections = [
  {
    title: "Gifting Made Special",
    description: "Discover curated gifts that leave lasting impressions.",
    image: "../public/images/hero-bg.jpg",
  },
  {
    title: "Jewelry & Beaded Bracelets",
    description: "Handcrafted elegance to elevate your everyday look.",
    image: "/images/jewelry.jpg",
  },
  {
    title: "Fashion Essentials",
    description: "Timeless style curated with elegance and flair.",
    image: "/images/fashion.jpg",
  },
  {
    title: "Travel Collection",
    description: "Travel in luxury with our premium accessories.",
    image: "/images/travel.jpg",
  },
  {
    title: "Tote Bags",
    description: "Where functionality meets fashion — our best-selling totes.",
    image: "/images/totes.jpg",
  },
  {
    title: "Lip Gloss Selection",
    description: "Gloss up your day with smooth, radiant lips.",
    image: "/images/lipgloss.jpg",
  },
  {
    title: "Decor & Aesthetics",
    description: "Elevate your space with intentional artful decor.",
    image: "/images/decor.jpg",
  },
  {
    title: "Events by Skyflo",
    description: "Unforgettable experiences, beautifully organized.",
    image: "/images/events.jpg",
  },
  {
    title: "Holiday Specials",
    description: "Celebrate in style with limited-edition festive picks.",
    image: "/images/holiday.jpg",
  },
];

const LandingBody = () => {
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white px-4 md:px-16 py-10 space-y-24">

      {/* Feature Highlights */}
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Why Skyflo?</h2>
        <p className="text-lg">Crafted with elegance. Delivered with love.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {["Luxury Gifts", "Artisan Craft", "Fast Delivery"].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold">{item}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur elit.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Showcases */}
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="flex flex-col md:flex-row items-center gap-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
          <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
            <motion.img
              src={section.image}
              alt={section.title}
              className="w-full max-w-md rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4">{section.title}</h2>
            <p className="text-lg leading-relaxed">{section.description}</p>
          </div>
        </motion.div>
      ))}

      {/* Featured Products */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={i}
              className="border rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-60 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingBody;