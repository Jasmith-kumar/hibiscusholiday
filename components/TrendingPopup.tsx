import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tour } from '../types';

interface TrendingPopupProps {
  tour: Tour;
}

const TrendingPopup: React.FC<TrendingPopupProps> = ({ tour }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('trendingPopupShown');
    
    if (!popupShown) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('trendingPopupShown', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-lg pointer-events-auto">
              {/* Glowing Background Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-hibiscus-500 via-gold-400 to-hibiscus-600 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-lg"
                >
                  <X size={20} />
                </button>

                {/* Trending Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-hibiscus-600 to-hibiscus-500 text-white px-4 py-2 rounded-full shadow-lg shadow-hibiscus-500/30"
                  >
                    <Flame size={16} className="animate-pulse" />
                    <span className="font-bold text-sm uppercase tracking-wide">Trending Now</span>
                    <Sparkles size={14} />
                  </motion.div>
                </div>

                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
                  
                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                      <p className="text-xs text-stone-500 font-medium">Starting from</p>
                      <p className="text-2xl font-bold text-hibiscus-600">₹{tour.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title & Location */}
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                    {tour.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 text-stone-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-hibiscus-500" />
                      <span className="text-sm">{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} className="text-hibiscus-500" />
                      <span className="text-sm">{tour.days} Days</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {tour.description}
                  </p>

                  {/* Highlights Preview */}
                  {tour.highlights && tour.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-hibiscus-50 text-hibiscus-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                      {tour.highlights.length > 3 && (
                        <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-medium">
                          +{tour.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/tours/${tour.id}`}
                      onClick={handleClose}
                      className="flex-1 bg-gradient-to-r from-hibiscus-600 to-hibiscus-500 text-white py-4 rounded-xl font-bold text-center hover:from-hibiscus-700 hover:to-hibiscus-600 transition-all shadow-lg shadow-hibiscus-500/20 flex items-center justify-center gap-2 group"
                    >
                      Explore Now
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      onClick={handleClose}
                      className="px-6 py-4 rounded-xl font-bold text-stone-500 hover:bg-stone-100 transition-colors"
                    >
                      Later
                    </button>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-hibiscus-500 via-gold-400 to-hibiscus-600"></div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TrendingPopup;

