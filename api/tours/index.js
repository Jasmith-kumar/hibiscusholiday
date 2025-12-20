import { connectToDatabase } from '../lib/mongodb.js';

// Default tours to seed if collection is empty
const DEFAULT_TOURS = [
  {
    id: 'goa-package-3n4d',
    title: 'Goa Beach Escape',
    location: 'North & South Goa',
    days: 4,
    price: 30500,
    category: 'Relaxation',
    packageType: 'trending',
    featured: true,
    showInPopup: true,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600&auto=format&fit=crop',
    description: 'Experience the vibrant beaches, historic churches, and Portuguese charm of Goa.',
    highlights: ['North Goa Sightseeing', 'South Goa Sightseeing', 'Boat Cruise at River Mandovi', 'Fort Aguada Visit'],
    itinerary: [
      { day: 1, title: 'Arrival at Goa', description: 'Arrive at Goa Airport, transfer to hotel. Comfortable overnight stay.' },
      { day: 2, title: 'South Goa Sightseeing', description: 'Explore Old Goa Church, Mangueshi Temple, Dona Paula, Miramar Beach, Panjim Shopping, Boat Cruise.' },
      { day: 3, title: 'North Goa Sightseeing', description: 'Visit Anjuna Beach, Vagator Beach, Baga Beach, Calangute Beach, Fort Aguada.' },
      { day: 4, title: 'Departure', description: 'After breakfast, transfer to Goa airport.' }
    ]
  },
  {
    id: 'kashmir-dreamland-6n7d',
    title: 'Dreamland Kashmir',
    location: 'Pahalgam - Srinagar - Houseboat',
    days: 7,
    price: 18500,
    category: 'Nature',
    packageType: 'trending',
    featured: true,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1600&auto=format&fit=crop',
    description: 'Discover the paradise on Earth with our comprehensive Kashmir tour.',
    highlights: ['2N Pahalgam', '3N Srinagar', '1N Houseboat', 'Shikara Ride', 'Gulmarg & Sonmarg'],
    itinerary: [
      { day: 1, title: 'Jammu - Pahalgam', description: 'Pickup from Jammu, transfer to Pahalgam.' },
      { day: 2, title: 'Pahalgam Exploration', description: 'Explore Chandanwadi, Aru Valley and Betaab Valley.' },
      { day: 3, title: 'Pahalgam - Srinagar', description: 'Drive to Srinagar, visit Shankracharya Temple, Shikara ride.' },
      { day: 4, title: 'Sonmarg Excursion', description: 'Full day excursion to Sonmarg - Meadow of Gold.' },
      { day: 5, title: 'Gulmarg Excursion', description: 'Visit Gulmarg, enjoy Gondola ride.' },
      { day: 6, title: 'Srinagar & Houseboat', description: 'Visit Mughal Gardens, overnight in Houseboat.' },
      { day: 7, title: 'Departure', description: 'Transfer to Jammu Railway Station.' }
    ]
  },
  {
    id: 'himachal-shimla-manali-5n6d',
    title: 'Himachal Highlights',
    location: 'Shimla - Manali',
    days: 6,
    price: 39500,
    category: 'Adventure',
    packageType: 'domestic',
    featured: true,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop',
    description: 'Experience the best of Himachal Pradesh from Shimla to Manali.',
    highlights: ['2N Shimla', '3N Manali', 'Kufri Sightseeing', 'Solang Valley', 'Kullu Valley'],
    itinerary: [
      { day: 1, title: 'Delhi - Shimla', description: 'Drive to Shimla, visit Christ Church, Scandal Point, Mall Road.' },
      { day: 2, title: 'Shimla - Kufri', description: 'Visit Kufri, Green Valley, adventure activities.' },
      { day: 3, title: 'Shimla - Manali', description: 'Journey to Manali via Kullu Valley.' },
      { day: 4, title: 'Solang Valley', description: 'Visit Solang Valley, enjoy adventure activities.' },
      { day: 5, title: 'Manali Local', description: 'Visit Hadimba Temple, Tibetan Monastery, Vashisht.' },
      { day: 6, title: 'Manali - Delhi', description: 'Drive back to Delhi.' }
    ]
  },
  {
    id: 'kullu-manali-volvo-5n6d',
    title: 'Kullu Manali Volvo Special',
    location: 'Delhi - Kullu - Manali',
    days: 6,
    price: 38500,
    category: 'Adventure',
    packageType: 'group-departures',
    featured: false,
    image: 'https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?q=80&w=1600&auto=format&fit=crop',
    description: 'Budget-friendly adventure to Kullu and Manali by Volvo.',
    highlights: ['Volvo Bus Delhi-Manali-Delhi', '3N Hotel Stay', 'Solang Valley', 'Kullu Valley'],
    itinerary: [
      { day: 1, title: 'Delhi - Manali (Volvo)', description: 'Overnight Volvo journey from Delhi.' },
      { day: 2, title: 'Manali Local', description: 'Arrive Manali, visit local attractions.' },
      { day: 3, title: 'Solang Valley', description: 'Explore Solang Valley and adventure activities.' },
      { day: 4, title: 'Kullu Valley', description: 'Visit Kullu, rafting, paragliding.' },
      { day: 5, title: 'Manali - Delhi (Volvo)', description: 'Overnight Volvo return.' },
      { day: 6, title: 'Arrive Delhi', description: 'Arrive Delhi morning.' }
    ]
  },
  {
    id: 'kerala-backwaters-5n6d',
    title: 'Kerala Backwaters & Hills',
    location: 'Cochin - Munnar - Thekkady - Alleppey',
    days: 6,
    price: 21500,
    category: 'Nature',
    packageType: 'domestic',
    featured: true,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop',
    description: 'Experience Gods Own Country with this comprehensive Kerala tour.',
    highlights: ['1N Cochin', '2N Munnar', '1N Thekkady', '1N Alleppey', 'Tea Gardens', 'Spice Plantations'],
    itinerary: [
      { day: 1, title: 'Arrival Cochin', description: 'Visit Fort Cochin, Chinese Fishing Nets.' },
      { day: 2, title: 'Cochin - Munnar', description: 'Drive to Munnar, visit waterfalls.' },
      { day: 3, title: 'Munnar Sightseeing', description: 'Visit Eravikulam, Tea Museum, Mattupetty Dam.' },
      { day: 4, title: 'Munnar - Thekkady', description: 'Drive to Thekkady, spice plantation tour.' },
      { day: 5, title: 'Thekkady - Alleppey', description: 'Explore backwaters of Alleppey.' },
      { day: 6, title: 'Departure', description: 'Transfer to Cochin Airport.' }
    ]
  },
  {
    id: 'meghalaya-explorer-8n9d',
    title: 'Meghalaya Explorer',
    location: 'Shillong - Cherrapunji - Guwahati',
    days: 9,
    price: 35000,
    category: 'Adventure',
    packageType: 'domestic',
    featured: false,
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=1600&auto=format&fit=crop',
    description: 'Discover the Scotland of the East - Meghalaya.',
    highlights: ['4N Shillong', '2N Cherrapunji', '2N Guwahati', 'Living Root Bridge', 'Dawki River'],
    itinerary: [
      { day: 1, title: 'Guwahati - Shillong', description: 'Drive to Shillong via Umiam Lake.' },
      { day: 2, title: 'Mawlynnong & Dawki', description: 'Visit cleanest village and crystal clear Dawki river.' },
      { day: 3, title: 'Shillong Local', description: 'Don Bosco Museum, Ward Lake, Police Bazaar.' },
      { day: 4, title: 'Krang Suri - Cherrapunji', description: 'Visit Krang Suri Falls, Laitlum Canyon.' },
      { day: 5, title: 'Cherrapunji', description: 'Seven Sisters Falls, Mawsmai Cave.' },
      { day: 6, title: 'Living Root Bridge', description: 'Trek to Double Decker Living Root Bridge.' },
      { day: 7, title: 'Shillong - Guwahati', description: 'Drive to Guwahati, river cruise.' },
      { day: 8, title: 'Guwahati Local', description: 'Kamakhya Temple, local sightseeing.' },
      { day: 9, title: 'Departure', description: 'Transfer to Guwahati Airport.' }
    ]
  },
  {
    id: 'uttarakhand-5n6d',
    title: 'Uttarakhand Hill Escape',
    location: 'Nainital - Rishikesh - Mussoorie',
    days: 6,
    price: 16500,
    category: 'Nature',
    packageType: 'group-departures',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555554317-889a17d7d455?q=80&w=1600&auto=format&fit=crop',
    description: 'Experience the divine beauty of Uttarakhand.',
    highlights: ['2N Nainital', '1N Rishikesh', '2N Mussoorie', 'Ganga Aarti', 'Kempty Falls'],
    itinerary: [
      { day: 1, title: 'Delhi - Nainital', description: 'Drive to Nainital, check in hotel.' },
      { day: 2, title: 'Nainital Sightseeing', description: 'Mall Road, Naini Lake, Snow View Point.' },
      { day: 3, title: 'Nainital - Rishikesh', description: 'Drive to Rishikesh, Ganga Aarti.' },
      { day: 4, title: 'Rishikesh - Mussoorie', description: 'Drive to Queen of Hills.' },
      { day: 5, title: 'Mussoorie Sightseeing', description: 'Kempty Falls, Mall Road.' },
      { day: 6, title: 'Mussoorie - Delhi', description: 'Drive back to Delhi.' }
    ]
  },
  {
    id: 'tamilnadu-temple-4n5d',
    title: 'Tamil Nadu Temple Trail',
    location: 'Rameshwaram - Madurai - Coimbatore',
    days: 5,
    price: 22000,
    category: 'Spiritual',
    packageType: 'domestic',
    featured: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1600&auto=format&fit=crop',
    description: 'Spiritual journey through Tamil Nadu temples.',
    highlights: ['2N Rameshwaram', '1N Madurai', '1N Coimbatore', 'Meenakshi Temple', 'Isha Foundation'],
    itinerary: [
      { day: 1, title: 'Arrival Rameshwaram', description: 'Visit Abdul Kalam Museum, Dhanushkodi.' },
      { day: 2, title: 'Rameshwaram Temple', description: 'Ramanathaswamy Temple visit.' },
      { day: 3, title: 'Rameshwaram - Madurai', description: 'Meenakshi Temple visit.' },
      { day: 4, title: 'Madurai - Coimbatore', description: 'Isha Foundation, Adiyogi statue.' },
      { day: 5, title: 'Departure', description: 'Transfer to Coimbatore Airport.' }
    ]
  },
  {
    id: 'rajasthan-royal-7n8d',
    title: 'Royal Rajasthan Circuit',
    location: 'Jaipur - Jodhpur - Jaisalmer - Udaipur',
    days: 8,
    price: 27500,
    category: 'Culture',
    packageType: 'domestic',
    featured: true,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop',
    description: 'Experience the royal grandeur of Rajasthan.',
    highlights: ['1N Jaipur', '2N Jodhpur', '2N Jaisalmer', '2N Udaipur', 'Sam Sand Dunes', 'Lake Pichola'],
    itinerary: [
      { day: 1, title: 'Arrive Jaipur', description: 'Transfer to hotel, explore markets.' },
      { day: 2, title: 'Jaipur - Jodhpur', description: 'Drive via Ajmer & Pushkar.' },
      { day: 3, title: 'Jodhpur - Jaisalmer', description: 'Mehrangarh Fort, drive to Golden City.' },
      { day: 4, title: 'Jaisalmer - Sam Dunes', description: 'Desert safari, camp stay.' },
      { day: 5, title: 'Jaisalmer - Jodhpur', description: 'Sunrise, drive back.' },
      { day: 6, title: 'Jodhpur - Udaipur', description: 'Via Ranakpur Temples.' },
      { day: 7, title: 'Udaipur Sightseeing', description: 'City Palace, Lake Pichola boat ride.' },
      { day: 8, title: 'Udaipur - Kota', description: 'Via Chittorgarh, drop at Kota.' }
    ]
  }
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();

    // GET - Fetch all tours
    if (req.method === 'GET') {
      let tours = await db.collection('tours').find({}).toArray();

      // If no tours exist, seed with default tours
      if (tours.length === 0) {
        await db.collection('tours').insertMany(DEFAULT_TOURS);
        tours = await db.collection('tours').find({}).toArray();
        console.log('✅ Seeded default tours');
      }

      // Transform _id to id for frontend compatibility
      const transformed = tours.map(tour => ({
        ...tour,
        id: tour.id || tour._id.toString(),
        _id: undefined
      }));

      return res.status(200).json(transformed);
    }

    // POST - Create new tour
    if (req.method === 'POST') {
      const tourData = req.body;
      
      // Ensure tour has an id
      if (!tourData.id) {
        tourData.id = `tour-${Date.now()}`;
      }
      
      tourData.createdAt = new Date().toISOString();

      const result = await db.collection('tours').insertOne(tourData);

      return res.status(201).json({
        ...tourData,
        id: tourData.id
      });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Tours API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

