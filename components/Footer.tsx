import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

// Footer component with updated contact info

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-hibiscus-50 to-white text-stone-700 pt-20 pb-10 rounded-t-3xl mt-10 border-t border-hibiscus-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <img 
                src="https://storage.googleapis.com/clientmedia/hibiscusholiday/Untitled%20design%20(6).png" 
                alt="Hibiscus Holidays" 
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
            Domestic & International Tour Packages | Wild Life & Adventure |Hotel | Flight | Visa & Passport | Car Rental | Cruises
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-stone-900 font-serif text-lg font-semibold mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/about" text="Our Story" />
              <FooterLink to="/tours" text="All Journeys" />
              <FooterLink to="/contact" text="Contact Us" />
              <FooterLink to="/privacy" text="Privacy Policy" />
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="text-stone-900 font-serif text-lg font-semibold mb-6">Trending</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/tours/golden-triangle" text="Golden Triangle" />
              <FooterLink to="/tours/kerala-backwaters" text="Kerala Bliss" />
              <FooterLink to="/tours/ladakh-adventure" text="Ladakh Expedition" />
              <FooterLink to="/tours/rajasthan-royal" text="Royal Rajasthan" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-stone-900 font-serif text-lg font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-hibiscus-100 flex items-center justify-center shrink-0 group-hover:bg-hibiscus-600 transition-colors">
                  <MapPin size={16} className="text-hibiscus-600 group-hover:text-white" />
                </div>
                <span>Plot No. 34-B, Saraswati Nagar, Nr. Uday Nagar Square, Nagpur-34 (MS)-India</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-hibiscus-100 flex items-center justify-center shrink-0 group-hover:bg-hibiscus-600 transition-colors">
                  <Phone size={16} className="text-hibiscus-600 group-hover:text-white" />
                </div>
                <span>+91 80555 15234</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-hibiscus-100 flex items-center justify-center shrink-0 group-hover:bg-hibiscus-600 transition-colors">
                  <Mail size={16} className="text-hibiscus-600 group-hover:text-white" />
                </div>
                <span>sales.hibiscusholidays@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="border-t border-hibiscus-100 pt-10 mb-8">
          <div className="bg-gradient-to-r from-hibiscus-600 to-hibiscus-700 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-hibiscus-200">
            <div>
              <h3 className="text-white font-serif text-xl mb-2">Subscribe to our newsletter</h3>
              <p className="text-hibiscus-100 text-sm">Get the latest travel updates and exclusive offers.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/30 w-full md:w-64"
              />
              <button className="bg-white text-hibiscus-600 hover:bg-hibiscus-50 px-6 py-3 rounded-lg font-bold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Hibiscus Holiday Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            <Link to="/dashboard" className="hover:text-hibiscus-600 transition-colors">Admin</Link>
            <a href="#" className="hover:text-hibiscus-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-hibiscus-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-hibiscus-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-hibiscus-100 flex items-center justify-center text-hibiscus-600 hover:bg-hibiscus-600 hover:text-white transition-all duration-300">
    {icon}
  </a>
);

const FooterLink = ({ to, text }: { to: string, text: string }) => (
  <li>
    <Link to={to} className="flex items-center gap-2 text-stone-500 hover:text-hibiscus-600 transition-colors group">
      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
      {text}
    </Link>
  </li>
);

export default Footer;