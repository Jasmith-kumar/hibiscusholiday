# Hibiscus Holiday - Deployment Guide

## 🚀 Deploy to Vercel

### Step 1: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a free account
3. Create a new **FREE Shared Cluster**
4. Set up Database Access:
   - Go to "Database Access" → "Add New Database User"
   - Create username and password (save these!)
5. Set up Network Access:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for Vercel)
6. Get your connection string:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

Your connection string will look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hibiscus_holiday
```

### Step 2: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. **Add Environment Variable**:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string from Step 1
6. Click "Deploy"

### Step 3: Seed Tours to MongoDB

After deployment, run this command to populate your tours:

```bash
curl -X POST https://your-app-name.vercel.app/api/tours/reseed
```

Or visit: `https://your-app-name.vercel.app/api/tours/reseed` (POST request needed)

---

## 🖥️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file (optional - for MongoDB):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hibiscus_holiday
```

3. Start development servers:

**Without MongoDB (in-memory storage):**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

**With MongoDB:**
Add your `MONGODB_URI` to `.env.local` first, then run the same commands.

4. Open http://localhost:3000

---

## 📁 Project Structure

```
├── api/                    # Vercel Serverless Functions
│   ├── tours/
│   │   ├── index.js       # GET/POST tours
│   │   ├── [id].js        # GET/PATCH/DELETE single tour
│   │   └── reseed.js      # POST to reseed all tours
│   ├── inquiries/
│   │   ├── index.js
│   │   └── [id].js
│   ├── admin/
│   │   ├── login.js
│   │   ├── verify.js
│   │   └── reset.js
│   └── lib/
│       └── mongodb.js     # MongoDB connection
├── server/                 # Local Express server
│   └── index.js
├── src/                    # React frontend
├── constants.ts            # Fallback tour data
├── vercel.json            # Vercel configuration
└── package.json
```

---

## 🔐 Admin Dashboard

- URL: `/dashboard`
- Default credentials:
  - Username: `admin`
  - Password: `hibiscus2025`

---

## 📋 Available Tours (9 Total)

### Trending Packages 🔥
1. Goa Beach Escape (4D) - ₹30,500
2. Dreamland Kashmir (7D) - ₹18,500

### Domestic Packages 🇮🇳
3. Himachal Highlights (6D) - ₹39,500
4. Kerala Backwaters & Hills (6D) - ₹21,500
5. Meghalaya Explorer (9D) - ₹35,000
6. Tamil Nadu Temple Trail (5D) - ₹22,000
7. Royal Rajasthan Circuit (8D) - ₹27,500

### Group Departures 👥
8. Kullu Manali Volvo Special (6D) - ₹38,500
9. Uttarakhand Hill Escape (6D) - ₹16,500

---

## 🛠️ Troubleshooting

### Tours not showing?
1. Check if MongoDB is connected (check Vercel logs)
2. Run the reseed endpoint: `POST /api/tours/reseed`

### MongoDB connection error?
1. Verify MONGODB_URI is correct
2. Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for Vercel)
3. Check username/password

### Local server not starting?
```bash
cd server
npm install
cd ..
npm run server
```

---

## 📞 Support

For issues, contact: sales.hibiscusholidays@gmail.com

