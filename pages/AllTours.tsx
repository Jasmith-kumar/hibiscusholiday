import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import TourCard from '../components/TourCard';
import { PACKAGE_TYPES } from '../constants';
import { PackageType } from '../types';

const AllTours: React.FC = () => {
  const { tours, toursLoading } = useData();
  const location = useLocation();
  const [showAllTours, setShowAllTours] = useState(false);
  
  // Get tab from URL hash or default to first tab (trending)
  const getInitialTab = (): PackageType => {
    const hash = location.hash.replace('#', '') as PackageType;
    const validTab = PACKAGE_TYPES.find(p => p.id === hash);
    return validTab ? hash : 'trending';
  };

  const [activeTab, setActiveTab] = useState<PackageType>(getInitialTab);

  // Update tab when URL hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '') as PackageType;
    const validTab = PACKAGE_TYPES.find(p => p.id === hash);
    if (validTab) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // Filter tours by active tab - handle missing packageType by defaulting to 'domestic'
  const filteredTours = showAllTours 
    ? tours // Show all tours if debug mode
    : tours.filter(tour => {
        const tourPackageType = tour.packageType || 'domestic'; // Default to domestic if missing
        const matches = tourPackageType === activeTab;
        return matches;
      });

  // Get active tab info
  const activeTabInfo = PACKAGE_TYPES.find(p => p.id === activeTab);

  // Debug: Log all tours and their packageTypes
  useEffect(() => {
    console.log('=== TOURS DEBUG ===');
    console.log('Total tours loaded:', tours.length);
    console.log('Active tab:', activeTab);
    console.log('Filtered tours count:', filteredTours.length);
    console.log('ToursLoading:', toursLoading);
    
    if (tours.length > 0) {
      console.log('Tours breakdown by packageType:');
      const breakdown: Record<string, number> = {};
      tours.forEach(tour => {
        const pkgType = tour.packageType || 'MISSING';
        breakdown[pkgType] = (breakdown[pkgType] || 0) + 1;
        console.log(`  - "${tour.title}": packageType="${pkgType}"`);
      });
      console.log('Summary:', breakdown);
    } else {
      console.warn('⚠️ No tours loaded! Check API connection.');
    }
    
    console.log('Available Package Types:', PACKAGE_TYPES.map(p => `${p.id} (${p.name})`));
    console.log('===================');
  }, [tours, activeTab, filteredTours, toursLoading]);

  return (
    <div className="pt-28 min-h-screen bg-cream pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
          >
            <span className="text-hibiscus-600 font-bold uppercase tracking-widest text-sm bg-hibiscus-50 px-4 py-2 rounded-full">
              Explore Our Packages
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4"
          >
            Our Curated Journeys
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 text-lg leading-relaxed"
          >
            Whether you seek spiritual peace, adrenaline-pumping adventure, or royal luxury, we have a package designed just for you.
          </motion.p>
        </div>

        {/* Tabs Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          {/* Desktop Tabs */}
          <div className="hidden md:flex justify-center gap-2 flex-wrap">
            {PACKAGE_TYPES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setActiveTab(pkg.id)}
                className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === pkg.id
                    ? 'bg-hibiscus-600 text-white shadow-lg shadow-hibiscus-600/30 scale-105'
                    : 'bg-white text-stone-600 hover:bg-hibiscus-50 hover:text-hibiscus-600 border border-stone-200'
                }`}
              >
                <span className="text-lg">{pkg.icon}</span>
                {pkg.name}
              </button>
            ))}
          </div>

          {/* Mobile Tabs - Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {PACKAGE_TYPES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setActiveTab(pkg.id)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-xs transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === pkg.id
                      ? 'bg-hibiscus-600 text-white shadow-lg shadow-hibiscus-600/30'
                      : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  <span>{pkg.icon}</span>
                  {pkg.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Tab Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 flex items-center justify-center gap-3">
            <span className="text-3xl">{activeTabInfo?.icon}</span>
            {showAllTours ? 'All Tours' : activeTabInfo?.name}
          </h2>
          <div className="w-24 h-1 bg-hibiscus-600 mx-auto mt-3 rounded-full"></div>
          {tours.length > 0 && (
            <button
              onClick={() => setShowAllTours(!showAllTours)}
              className="mt-4 text-xs text-hibiscus-600 hover:text-hibiscus-700 underline"
            >
              {showAllTours ? 'Show Filtered Tours' : `Show All ${tours.length} Tours (Debug)`}
            </button>
          )}
        </div>

        {/* Tours Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {toursLoading ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hibiscus-600 mx-auto mb-4"></div>
                <p className="text-stone-500">Loading tours...</p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-100">
                <div className="text-6xl mb-4">{activeTabInfo?.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">No Tours Available Yet</h3>
                <p className="text-stone-500">We're working on adding amazing {activeTabInfo?.name.toLowerCase()}. Check back soon!</p>
                {tours.length > 0 && (
                  <div className="mt-6 p-4 bg-stone-50 rounded-xl text-left max-w-2xl mx-auto">
                    <p className="text-xs text-stone-600 mb-2 font-bold">Debug Info:</p>
                    <p className="text-xs text-stone-500">Total tours: {tours.length} | Active tab: {activeTab}</p>
                    <p className="text-xs text-stone-500 mt-2">Tours by category:</p>
                    <div className="text-xs text-stone-400 mt-1 space-y-1">
                      {PACKAGE_TYPES.map(pkg => {
                        const count = tours.filter(t => (t.packageType || 'domestic') === pkg.id).length;
                        return (
                          <div key={pkg.id}>
                            {pkg.name}: {count} tour{count !== 1 ? 's' : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TourCard tour={tour} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllTours;
