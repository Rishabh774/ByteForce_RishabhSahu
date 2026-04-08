# 🚀 MongoDB Setup Guide - Quick Start

## ⚠️ Current Status
- ✅ Frontend: Starting (http://localhost:3000)
- ❌ Backend: Waiting for MongoDB connection

## 🔧 Two Options to Get MongoDB Running

### Option 1: MongoDB Atlas (Cloud) ⭐ RECOMMENDED
**Easiest - No installation needed!**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster (free tier available)
4. Go to "Database" → "Connect"
5. Copy the connection string
6. Update `.env` in backend folder:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/byteforce?retryWrites=true&w=majority
```

7. Replace `username` and `password` with your MongoDB Atlas credentials
8. Restart backend server

### Option 2: Local MongoDB Installation
**If you prefer local development**

#### Windows:
1. Download: https://www.mongodb.com/try/download/community
2. Run installer → "Install MongoDB as a Service"
3. MongoDB will auto-start on `localhost:27017`
4. Backend should auto-connect with current `.env`

#### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux:
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

## ✨ Quick Test

After setting up MongoDB:

1. **Backend will auto-restart** (nodemon watches for changes)
2. You should see: `✅ Connected to MongoDB`
3. Open http://localhost:3000 in browser
4. Create account and test features!

## 📝 Current Environment Setup

**Backend (.env):**
```
MONGODB_URI=mongodb://localhost:27017/byteforce
JWT_SECRET=byteforce_super_secret_jwt_key_2024_hackathon_kalpathon
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

## 🎯 Once Connected

- ✅ Backend API: http://localhost:5000/api
- ✅ Frontend UI: http://localhost:3000
- ✅ Test Register → Login → Browse → Book → QR Code

## 🆘 Troubleshooting

**"Cannot connect to MongoDB":**
- Check MongoDB URI in `.env`
- Verify MongoDB is running
- Try MongoDB Atlas if local doesn't work

**"Port 5000 already in use":**
- Close other Node apps
- Or change PORT in `.env` to 5001

**"Port 3000 already in use":**
- Close other React apps  
- Or use: `set PORT=3001 && npm start`

## 📱 Test API Endpoint

```bash
# Should return JSON if backend is connected
curl http://localhost:5000/api
```

---

**Next: Set up MongoDB and both servers will run! ✅**
