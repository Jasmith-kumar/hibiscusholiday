import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not defined');
  console.error('   Please add MONGODB_URI to your Vercel environment variables');
  console.error('   or create a .env.local file with MONGODB_URI=your_connection_string');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // Check if URI exists
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined. Please configure it in Vercel environment variables.');
  }

  // Return cached connection if exists
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    const db = client.db('hibiscus_holiday');

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    console.log('✅ Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw new Error('Failed to connect to MongoDB: ' + error.message);
  }
}
