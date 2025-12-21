import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Heart, Globe, Star, Users, Map, X, MapPin, Calendar, Flame } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { useData } from '../context/DataContext';
import TourCard from '../components/TourCard';

const Home: React.FC = () => {
  const { tours } = useData();
  const featuredTours = tours.filter(t => t.featured);
  
  // Trending Popup State
  const [showPopup, setShowPopup] = useState(false);
  const popupTour = tours.find(t => t.showInPopup);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('trendingPopupShown');
    
    if (!popupShown && popupTour) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [popupTour]);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('trendingPopupShown', 'true');
  };

  return (
    <div className="w-full overflow-hidden bg-cream">
      
      {/* Trending Tour Popup */}
      <AnimatePresence>
        {showPopup && popupTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white shadow-lg transition-all"
              >
                <X size={20} />
              </button>

              {/* Trending Badge */}
              <div className="absolute top-4 left-4 z-20">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <Flame size={16} className="animate-pulse" />
                  TRENDING NOW
                </motion.div>
              </div>

              {/* Tour Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={popupTour.image}
                  alt={popupTour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <span className="text-stone-500 text-xs">Starting from</span>
                  <div className="text-2xl font-bold text-hibiscus-600">₹{popupTour.price.toLocaleString()}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-stone-500 text-sm mb-2">
                  <MapPin size={14} />
                  <span>{popupTour.location}</span>
                  <span className="text-stone-300">•</span>
                  <Calendar size={14} />
                  <span>{popupTour.days} Days</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                  {popupTour.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {popupTour.description}
                </p>

                {/* Highlights */}
                {popupTour.highlights && popupTour.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {popupTour.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-hibiscus-50 text-hibiscus-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Link
                    to={`/tours/${popupTour.id}`}
                    onClick={closePopup}
                    className="flex-1 bg-gradient-to-r from-hibiscus-600 to-hibiscus-700 text-white py-3 rounded-xl font-bold text-center hover:from-hibiscus-700 hover:to-hibiscus-800 transition-all shadow-lg shadow-hibiscus-600/30 flex items-center justify-center gap-2"
                  >
                    View Details <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/contact"
                    onClick={closePopup}
                    className="px-6 py-3 border-2 border-stone-200 text-stone-700 rounded-xl font-bold hover:bg-stone-50 transition-colors"
                  >
                    Enquire
                  </Link>
                </div>

                {/* Urgency Text */}
                <p className="text-center text-orange-600 text-xs font-bold mt-4 flex items-center justify-center gap-1">
                  <Flame size={12} />
                  Limited slots available! Book now to secure your spot.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop" 
            alt="India Gate Delhi" 
            className="w-full h-full object-cover"
          />
          {/* Enhanced Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white mt-0 md:mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex justify-center"
          >
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg">
              ✨ Discover Incredible India
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight drop-shadow-2xl"
          >
            Let Your Soul <br/>
            <span className="text-hibiscus-500 font-script italic">Bloom</span> in India
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-stone-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md opacity-90"
          >
            From the royal palaces of Rajasthan to the serene backwaters of Kerala, experience luxury travel curated just for you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/tours" 
              className="px-8 py-4 bg-hibiscus-600 text-white rounded-full font-bold text-lg hover:bg-hibiscus-700 transition-all hover:scale-105 shadow-xl shadow-hibiscus-600/30 flex items-center justify-center gap-2"
            >
              Explore Packages <ArrowRight size={20} />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white hover:text-stone-900 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              Custom Trip
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className="relative z-20 container mx-auto px-4 md:px-6 -mt-10 md:-mt-20 mb-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-900/10 p-6 md:p-12 border border-stone-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
            <StatItem number="10k+" label="Happy Travelers" icon={<Users className="text-hibiscus-600" />} />
            <StatItem number="500+" label="Destinations" icon={<Map className="text-hibiscus-600" />} />
            <StatItem number="15+" label="Years Experience" icon={<ShieldCheck className="text-hibiscus-600" />} />
            <StatItem number="4.9" label="Average Rating" icon={<Star className="text-hibiscus-600" />} />
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-hibiscus-600 font-bold tracking-wider uppercase text-sm mb-2 block">Premium Collections</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                Curated Experiences
              </h2>
            </div>
            <Link to="/tours" className="group flex items-center gap-2 text-stone-900 font-bold border-b-2 border-stone-900 pb-1 hover:text-hibiscus-600 hover:border-hibiscus-600 transition-all">
              View All Tours <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour, idx) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-hibiscus-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-gold-400 font-bold tracking-wider uppercase text-sm mb-4 block">Why Choose Hibiscus Holiday?</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                We Don't Just Plan Trips, <br/> We Design Memories.
              </h2>
              <div className="space-y-8">
                <FeatureRow 
                  title="Personalized Itineraries" 
                  desc="Every trip is crafted from scratch based on your preferences, budget, and travel style."
                  icon={<Heart className="w-6 h-6 text-stone-900" />} 
                />
                <FeatureRow 
                  title="Local Expertise" 
                  desc="Our guides are storytelling locals who know the hidden gems beyond the guidebooks."
                  icon={<Globe className="w-6 h-6 text-stone-900" />} 
                />
                <FeatureRow 
                  title="24/7 Support" 
                  desc="Travel with peace of mind knowing our dedicated team is always a phone call away."
                  icon={<ShieldCheck className="w-6 h-6 text-stone-900" />} 
                />
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop" className="rounded-2xl translate-y-8 shadow-2xl border border-white/10" alt="Humayun's Tomb Delhi" />
                <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop" className="rounded-2xl shadow-2xl border border-white/10" alt="Jaipur Palace" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-hibiscus-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-hibiscus-600 font-bold tracking-wider uppercase text-sm mb-2 block">Reviews</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Traveler Diaries</h2>
            <p className="text-stone-600">Stories from those who have experienced the magic with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 relative group">
                <div className="text-hibiscus-200 absolute top-6 right-8 text-7xl font-serif leading-none opacity-50 group-hover:text-hibiscus-300 transition-colors">"</div>
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-4 border-hibiscus-50 group-hover:border-hibiscus-100 transition-colors" />
                  <div>
                    <h4 className="font-bold text-stone-900">{t.name}</h4>
                    <p className="text-xs text-hibiscus-600 font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
                <p className="text-stone-600 italic relative z-10 leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-hibiscus-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-hibiscus-900/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready for your Indian Adventure?</h2>
            <p className="text-hibiscus-100 text-lg mb-10">Let us help you plan the perfect itinerary that suits your style and budget.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/contact" className="bg-white text-hibiscus-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-stone-50 transition-colors shadow-lg">
                 Start Planning
               </Link>
               <Link to="/tours" className="bg-hibiscus-700/50 backdrop-blur-sm border border-hibiscus-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-hibiscus-700 transition-colors">
                 Browse Tours
               </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ number, label, icon }: { number: string, label: string, icon: React.ReactNode }) => (
  <div className="text-center group">
    <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform bg-hibiscus-50 w-16 h-16 rounded-full items-center mx-auto shadow-sm">
      {icon}
    </div>
    <div className="text-3xl font-bold text-stone-900 mb-1">{number}</div>
    <div className="text-xs text-stone-500 font-bold uppercase tracking-wide">{label}</div>
  </div>
);

const FeatureRow = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
  <div className="flex gap-5">
    <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center shrink-0 shadow-lg shadow-gold-500/20 text-stone-900">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-stone-300 leading-relaxed text-sm">{desc}</p>
    </div>
  </div>
);

export default Home;