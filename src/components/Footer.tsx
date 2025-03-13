import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul>
            <li className="mb-2"><a href="/contact-us" className="hover:underline">Contact Us</a></li>
            <li className="mb-2"><a href="/shipping" className="hover:underline">Shipping & Delivery</a></li>
            <li className="mb-2"><a href="/returns" className="hover:underline">Returns & Exchanges</a></li>
            <li className="mb-2"><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul>
            <li className="mb-2"><a href="/our-story" className="hover:underline">Our Story</a></li>
            <li className="mb-2"><a href="/careers" className="hover:underline">Careers</a></li>
            <li className="mb-2"><a href="/sustainability" className="hover:underline">Sustainability</a></li>
            <li className="mb-2"><a href="/press" className="hover:underline">Press</a></li>
          </ul>
        </div>
        {/* Connect with Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
          <ul className="flex space-x-4">
            <li><a href="https://www.facebook.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://www.instagram.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://www.twitter.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://www.youtube.com/yourbrand" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a></li>
          </ul>
        </div>
        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul>
            <li className="mb-2"><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
            <li className="mb-2"><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
            <li className="mb-2"><a href="/cookie-policy" className="hover:underline">Cookie Policy</a></li>
            <li className="mb-2"><a href="/accessibility" className="hover:underline">Accessibility</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Brand Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
