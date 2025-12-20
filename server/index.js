import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Try to load MongoDB, but don't fail if it's not available
let MongoClient, ObjectId;
try {
  const mongodb = await import('mongodb');
  MongoClient = mongodb.MongoClient;
  ObjectId = mongodb.ObjectId;
} catch (e) {
  console.log('MongoDB not available, using in-memory storage');
}

// Load environment variables from .env.local
dotenv.config({ path: '../.env.local' });

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (optional)
const MONGODB_URI = process.env.MONGODB_URI;
let db = null;
let useInMemory = !MONGODB_URI;

// ==================== IN-MEMORY STORAGE ====================
let inMemoryTours = [];
let inMemoryInquiries = [];
let inMemoryAdmin = {
  username: 'admin',
  password: 'hibiscus2025',
  passwordVersion: 1,
  createdAt: new Date().toISOString()
};

// ==================== DEFAULT TOURS DATA ====================
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
    highlights: ['North Goa Sightseeing', 'South Goa Sightseeing', 'Boat Cruise at River Mandovi'],
    itinerary: []
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
    highlights: ['2N Pahalgam', '3N Srinagar', '1N Houseboat', 'Shikara Ride'],
    itinerary: []
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
    description: 'Experience the best of Himachal Pradesh.',
    highlights: ['2N Shimla', '3N Manali', 'Solang Valley', 'Kullu Valley'],
    itinerary: []
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
    highlights: ['1N Cochin', '2N Munnar', '1N Thekkady', '1N Alleppey'],
    itinerary: []
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
    highlights: ['Volvo Bus Delhi-Manali-Delhi', '3N Hotel Stay', 'Solang Valley'],
    itinerary: []
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
    description: 'Discover the Scotland of the East.',
    highlights: ['4N Shillong', '2N Cherrapunji', '2N Guwahati', 'Living Root Bridge'],
    itinerary: []
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
    highlights: ['2N Nainital', '1N Rishikesh', '2N Mussoorie', 'Ganga Aarti'],
    itinerary: []
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
    highlights: ['2N Rameshwaram', '1N Madurai', '1N Coimbatore', 'Meenakshi Temple'],
    itinerary: []
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
    highlights: ['1N Jaipur', '2N Jodhpur', '2N Jaisalmer', '2N Udaipur', 'Desert Safari'],
    itinerary: []
  }
];

// Initialize in-memory tours
inMemoryTours = [...DEFAULT_TOURS];

async function connectDB() {
  if (!MONGODB_URI || !MongoClient) {
    console.log('⚠️  No MongoDB URI configured. Using in-memory storage.');
    console.log('   Data will be lost when server restarts.');
    useInMemory = true;
    return;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('hibiscus_holiday');
    useInMemory = false;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Falling back to in-memory storage.');
    useInMemory = true;
  }
}

// ==================== TOUR ROUTES ====================

// GET all tours
app.get('/api/tours', async (req, res) => {
  try {
    if (useInMemory) {
      return res.json(inMemoryTours);
    }

    let tours = await db.collection('tours').find({}).toArray();

    // If no tours exist, seed with default tours
    if (tours.length === 0) {
      await db.collection('tours').insertMany(DEFAULT_TOURS);
      tours = await db.collection('tours').find({}).toArray();
      console.log('✅ Seeded default tours');
    }

    const transformed = tours.map(tour => ({
      ...tour,
      id: tour.id || tour._id.toString(),
      _id: undefined
    }));

    res.json(transformed);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ error: 'Failed to fetch tours' });
  }
});

// GET single tour by ID
app.get('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (useInMemory) {
      const tour = inMemoryTours.find(t => t.id === id);
      if (!tour) {
        return res.status(404).json({ error: 'Tour not found' });
      }
      return res.json(tour);
    }

    let tour = await db.collection('tours').findOne({ id: id });
    
    if (!tour) {
      try {
        tour = await db.collection('tours').findOne({ _id: new ObjectId(id) });
      } catch (e) {}
    }

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    res.json({
      ...tour,
      id: tour.id || tour._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({ error: 'Failed to fetch tour' });
  }
});

// POST new tour
app.post('/api/tours', async (req, res) => {
  try {
    const tourData = req.body;
    
    if (!tourData.id) {
      tourData.id = `tour-${Date.now()}`;
    }
    
    tourData.createdAt = new Date().toISOString();

    if (useInMemory) {
      inMemoryTours.unshift(tourData);
      return res.status(201).json(tourData);
    }

    await db.collection('tours').insertOne(tourData);

    res.status(201).json({
      ...tourData,
      id: tourData.id
    });
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(500).json({ error: 'Failed to create tour' });
  }
});

// PATCH update tour
app.patch('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedAt = new Date().toISOString();

    if (useInMemory) {
      const index = inMemoryTours.findIndex(t => t.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Tour not found' });
      }
      inMemoryTours[index] = { ...inMemoryTours[index], ...updates };
      return res.json({ success: true });
    }

    let result = await db.collection('tours').updateOne(
      { id: id },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      try {
        result = await db.collection('tours').updateOne(
          { _id: new ObjectId(id) },
          { $set: updates }
        );
      } catch (e) {}
    }

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating tour:', error);
    res.status(500).json({ error: 'Failed to update tour' });
  }
});

// DELETE tour
app.delete('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (useInMemory) {
      const index = inMemoryTours.findIndex(t => t.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Tour not found' });
      }
      inMemoryTours.splice(index, 1);
      return res.json({ success: true });
    }

    let result = await db.collection('tours').deleteOne({ id: id });

    if (result.deletedCount === 0) {
      try {
        result = await db.collection('tours').deleteOne({ _id: new ObjectId(id) });
      } catch (e) {}
    }

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting tour:', error);
    res.status(500).json({ error: 'Failed to delete tour' });
  }
});

// ==================== INQUIRY ROUTES ====================

// GET all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    if (useInMemory) {
      return res.json(inMemoryInquiries);
    }

    const inquiries = await db.collection('inquiries')
      .find({})
      .sort({ date: -1 })
      .toArray();
    
    const transformed = inquiries.map(inquiry => ({
      ...inquiry,
      id: inquiry._id.toString(),
      _id: undefined
    }));
    
    res.json(transformed);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// POST new inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, tripLocation, message } = req.body;
    
    const newInquiry = {
      id: `inquiry-${Date.now()}`,
      name,
      email,
      phone,
      tripLocation,
      message,
      date: new Date().toISOString(),
      status: 'new'
    };

    if (useInMemory) {
      inMemoryInquiries.unshift(newInquiry);
      return res.status(201).json(newInquiry);
    }
    
    const result = await db.collection('inquiries').insertOne(newInquiry);
    
    res.status(201).json({
      ...newInquiry,
      id: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

// PATCH - Mark inquiry as read
app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (useInMemory) {
      const index = inMemoryInquiries.findIndex(i => i.id === id);
      if (index !== -1) {
        inMemoryInquiries[index].status = status;
      }
      return res.json({ success: true });
    }
    
    await db.collection('inquiries').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// DELETE inquiry
app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (useInMemory) {
      const index = inMemoryInquiries.findIndex(i => i.id === id);
      if (index !== -1) {
        inMemoryInquiries.splice(index, 1);
      }
      return res.json({ success: true });
    }
    
    await db.collection('inquiries').deleteOne({ _id: new ObjectId(id) });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// ==================== ADMIN AUTH ROUTES ====================

// Initialize default admin if not exists
async function initializeAdmin() {
  if (useInMemory) {
    console.log('✅ Using in-memory admin (admin/hibiscus2025)');
    return;
  }

  try {
    const existingAdmin = await db.collection('admin').findOne({});
    if (!existingAdmin) {
      await db.collection('admin').insertOne({
        username: 'admin',
        password: 'hibiscus2025',
        passwordVersion: 1,
        createdAt: new Date().toISOString()
      });
      console.log('✅ Default admin credentials created');
    } else {
      if (!existingAdmin.passwordVersion) {
        await db.collection('admin').updateOne(
          { _id: existingAdmin._id },
          { $set: { passwordVersion: 1 } }
        );
      }
      console.log('✅ Admin exists:', existingAdmin.username);
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

// POST - Verify admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (useInMemory) {
      if (username === inMemoryAdmin.username && password === inMemoryAdmin.password) {
        return res.json({ 
          success: true, 
          message: 'Login successful',
          passwordVersion: inMemoryAdmin.passwordVersion
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const admin = await db.collection('admin').findOne({ 
      username: username,
      password: password 
    });
    
    if (admin) {
      res.json({ 
        success: true, 
        message: 'Login successful',
        passwordVersion: admin.passwordVersion || 1
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// POST - Verify session
app.post('/api/admin/verify', async (req, res) => {
  try {
    const { passwordVersion } = req.body;

    if (useInMemory) {
      if (passwordVersion && parseInt(passwordVersion) === inMemoryAdmin.passwordVersion) {
        return res.json({ valid: true, passwordVersion: inMemoryAdmin.passwordVersion });
      }
      return res.status(401).json({ valid: false, message: 'Session expired' });
    }
    
    const admin = await db.collection('admin').findOne({});
    
    if (!admin) {
      return res.status(401).json({ valid: false, message: 'No admin found' });
    }

    const currentVersion = admin.passwordVersion || 1;
    
    if (passwordVersion && parseInt(passwordVersion) === currentVersion) {
      res.json({ valid: true, passwordVersion: currentVersion });
    } else {
      res.status(401).json({ valid: false, message: 'Session expired - password was changed' });
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ valid: false, message: 'Verification failed' });
  }
});

// GET - Check admin exists
app.get('/api/admin/check', async (req, res) => {
  try {
    if (useInMemory) {
      return res.json({ exists: true });
    }
    const admin = await db.collection('admin').findOne({});
    res.json({ exists: !!admin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check admin' });
  }
});

// POST - Reset admin credentials
app.post('/api/admin/reset', async (req, res) => {
  try {
    if (useInMemory) {
      inMemoryAdmin.passwordVersion += 1;
      inMemoryAdmin.password = 'hibiscus2025';
      return res.json({ 
        success: true, 
        message: 'Admin credentials reset to default (admin/hibiscus2025)',
        passwordVersion: inMemoryAdmin.passwordVersion
      });
    }

    const currentAdmin = await db.collection('admin').findOne({});
    const newVersion = (currentAdmin?.passwordVersion || 0) + 1;

    await db.collection('admin').deleteMany({});
    await db.collection('admin').insertOne({
      username: 'admin',
      password: 'hibiscus2025',
      passwordVersion: newVersion,
      createdAt: new Date().toISOString()
    });
    res.json({ 
      success: true, 
      message: 'Admin credentials reset to default (admin/hibiscus2025). All sessions invalidated.',
      passwordVersion: newVersion
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset admin' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    storage: useInMemory ? 'in-memory' : 'mongodb'
  });
});

// Start server
connectDB().then(() => {
  initializeAdmin();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Storage: ${useInMemory ? 'In-Memory (data resets on restart)' : 'MongoDB'}`);
  });
});
