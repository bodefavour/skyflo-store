import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10 font-sans tracking-wide">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold text-[#d4af37] mb-4 uppercase">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/contact-us" className="hover:text-[#d4af37] transition">Contact Us</a></li>
            <li><a href="/shipping" className="hover:text-[#d4af37] transition">Shipping & Delivery</a></li>
            <li><a href="/returns" className="hover:text-[#d4af37] transition">Returns & Exchanges</a></li>
            <li><a href="/faq" className="hover:text-[#d4af37] transition">FAQs</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold text-[#d4af37] mb-4 uppercase">About Skyflo</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/our-story" className="hover:text-[#d4af37] transition">Our Story</a></li>
            <li><a href="/careers" className="hover:text-[#d4af37] transition">Careers</a></li>
            <li><a href="/sustainability" className="hover:text-[#d4af37] transition">Sustainability</a></li>
            <li><a href="/press" className="hover:text-[#d4af37] transition">Press</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-xl font-semibold text-[#d4af37] mb-4 uppercase">Connect</h3>
          <ul className="flex space-x-5 text-lg text-gray-300">
            <li>
              <a href="https://www.facebook.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#d4af37] transition">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#d4af37] transition">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#d4af37] transition">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#d4af37] transition">
                <i className="fab fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-semibold text-[#d4af37] mb-4 uppercase">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/privacy-policy" className="hover:text-[#d4af37] transition">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-[#d4af37] transition">Terms of Service</a></li>
            <li><a href="/cookie-policy" className="hover:text-[#d4af37] transition">Cookie Policy</a></li>
            <li><a href="/accessibility" className="hover:text-[#d4af37] transition">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} <span className="text-white font-medium">Skyflo</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;