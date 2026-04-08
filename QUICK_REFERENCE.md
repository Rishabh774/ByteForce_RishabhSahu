# 🚀 Developer Quick Reference

## Start Development

### Terminal 1: Backend
```bash
cd backend
cp .env.example .env
# Edit .env with MongoDB URI
npm install
npm run dev
```

### Terminal 2: Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Access: **Frontend** `http://localhost:3000` | **Backend** `http://localhost:5000`

---

## 📁 Key Files Location

### Backend Routes
- Auth: `backend/src/routes/authRoutes.js`
- Events: `backend/src/routes/eventRoutes.js`
- Bookings: `backend/src/routes/bookingRoutes.js`
- Ratings: `backend/src/routes/ratingRoutes.js`

### Backend Controllers
- Auth: `backend/src/controllers/authController.js`
- Events: `backend/src/controllers/eventController.js`
- Bookings: `backend/src/controllers/bookingController.js`
- Ratings: `backend/src/controllers/ratingController.js`

### Backend Models
- User: `backend/src/models/User.js`
- Event: `backend/src/models/Event.js`
- Booking: `backend/src/models/Booking.js`
- Rating: `backend/src/models/Rating.js`

### Frontend Pages
- Home: `frontend/src/pages/Home.jsx`
- Login: `frontend/src/pages/Login.jsx`
- Register: `frontend/src/pages/Register.jsx`
- Events: `frontend/src/pages/Events.jsx`
- EventDetails: `frontend/src/pages/EventDetails.jsx`
- UserDashboard: `frontend/src/pages/UserDashboard.jsx`
- OrganizerDashboard: `frontend/src/pages/OrganizerDashboard.jsx`

### Frontend Components
- Header: `frontend/src/components/Header.jsx`
- Footer: `frontend/src/components/Footer.jsx`
- EventCard: `frontend/src/components/EventCard.jsx`
- Toast: `frontend/src/components/Toast.jsx`
- RatingCard: `frontend/src/components/RatingCard.jsx`

---

## 🔑 API Endpoints Quick List

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
PUT    /api/auth/profile
```

### Events
```
GET    /api/events?category=festival&search=tech&page=1&limit=10
GET    /api/events/:id
POST   /api/events (organizer)
PUT    /api/events/:id (organizer)
DELETE /api/events/:id (organizer)
GET    /api/events/organizer/my-events (organizer)
```

### Bookings
```
POST   /api/bookings (user)
GET    /api/bookings/my-bookings (user)
GET    /api/bookings/:id
PUT    /api/bookings/:id/cancel (user)
PUT    /api/bookings/verify-attendance (organizer)
GET    /api/bookings/event/:eventId (organizer)
```

### Ratings
```
POST   /api/ratings (user)
GET    /api/ratings/event/:eventId
PUT    /api/ratings/:id (user)
DELETE /api/ratings/:id (user)
```

---

## 🗂️ Environment Variables

### Backend `.env`
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/byteforce
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
QR_CODE_SIZE=10
QR_CODE_ERROR_CORRECTION=H
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

---

## 🔐 Authentication Flow

```
User Input
    ↓
POST /auth/login
    ↓
Verify Email & Password
    ↓
Generate JWT Token
    ↓
Return Token + User Info
    ↓
Store in LocalStorage
    ↓
Use in API Headers: Authorization: Bearer <token>
```

---

## 🎟️ Booking Flow

```
User Selects Event
    ↓
Choose Number of Tickets
    ↓
POST /api/bookings
    ↓
Check Availability
    ↓
Generate QR Codes
    ↓
Create Booking
    ↓
Update Event Capacity
    ↓
Return Booking + QR Codes
```

---

## 📝 Adding a New API Endpoint

### 1. Create Route Handler
```javascript
// routes/exampleRoutes.js
router.post('/example', verifyJWT, exampleController.create);
```

### 2. Create Controller
```javascript
// controllers/exampleController.js
const create = async (req, res) => {
  try {
    // Business logic
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { create };
```

### 3. Create Model (if needed)
```javascript
// models/Example.js
const schema = new mongoose.Schema({ ... });
module.exports = mongoose.model('Example', schema);
```

### 4. Add to Main App
```javascript
// backend/src/index.js
app.use('/api/examples', exampleRoutes);
```

---

## 🎨 Adding a New React Component

### Component Template
```jsx
import React from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

### Page Template
```jsx
import React, { useState, useEffect } from 'react';
import { someAPI } from '../utils/apiCalls';

const MyPage = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await someAPI.fetch();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      {/* Page JSX */}
    </div>
  );
};

export default MyPage;
```

---

## 🧪 Testing API Endpoints

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"user@test.com","password":"pass123","phone":"9876543210","role":"user"}'

# Get Events
curl http://localhost:5000/api/events?category=festival&page=1

# With Token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/auth/profile
```

### Using Postman
1. Import API collection
2. Set variables (base_url, token)
3. Run requests with proper headers
4. Check responses

---

## 🚀 Deployment Checklist

### Before Deploying

- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Verify all environment variables
- [ ] Run local tests
- [ ] Check API responses
- [ ] Test authentication flow
- [ ] Verify database connection
- [ ] Update API documentation

### Frontend Deployment (Vercel)
```bash
cd frontend
vercel
```

### Backend Deployment (Render)
1. Push to main branch
2. Render auto-deploys
3. Set environment variables in dashboard
4. Monitor logs


---

## 📊 Database Collections

### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  phone: String,
  role: "user" | "organizer",
  // ... other fields
}
```

### Events
```javascript
{
  _id: ObjectId,
  title: String,
  organizer: ObjectId,
  capacity: Number,
  totalTicketsBooked: Number,
  // ... other fields
}
```

### Bookings
```javascript
{
  _id: ObjectId,
  user: ObjectId,
  event: ObjectId,
  numberOfTickets: Number,
  qrCode: String (DataURL),
  tickets: Array,
  // ... other fields
}
```

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Error
```
Solution: Check MONGODB_URI in .env
Verify IP whitelist in MongoDB Atlas
Ensure cluster is active
```

### Issue: JWT Token Invalid
```
Solution: Check JWT_SECRET in .env
Verify token format in header
Check token expiration
```

### Issue: CORS Error
```
Solution: Check CORS_ORIGIN matches frontend URL
Verify credentials: true in axios
Check origin header
```

### Issue: QR Code Not Generating
```
Solution: Check qrcode package installed
Verify data format being encoded
Check browser console for errors
```

---

## 📚 Documentation Links

- **Full README:** [FULL_README.md](./FULL_README.md)
- **Setup Guide:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **API Docs:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Architecture:** [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Features:** [FEATURES.md](./FEATURES.md)
- **Testing:** [TESTING_GUIDE.md](./TESTING_GUIDE.md)

---

## 💻 Useful Commands

### Backend
```bash
npm run dev          # Start dev server with nodemon
npm test            # Run tests
npm start           # Start production server
npm install         # Install dependencies
```

### Frontend
```bash
npm start           # Start dev server
npm build           # Create production build
npm test            # Run tests
npm install         # Install dependencies
```

### Database
```bash
# MongoDB commands (in MongoDB Atlas dashboard)
db.<collection>.find()
db.<collection>.insertOne({...})
db.<collection>.updateOne({...}, {$set: {...}})
db.<collection>.deleteOne({...})
```

---

## 🔗 Useful Tools

- **Postman:** API testing - [postman.com](https://postman.com)
- **MongoDB Compass:** Database GUI - [mongodb.com/products/compass](https://mongodb.com/products/compass)
- **VS Code:** Code editor - [code.visualstudio.com](https://code.visualstudio.com)
- **Vercel:** Frontend deployment - [vercel.com](https://vercel.com)
- **Render:** Backend hosting - [render.com](https://render.com)

---

## ✅ Checklist for New Developers

- [ ] Clone repository
- [ ] Install Node.js v14+
- [ ] Read README and setup guide
- [ ] Configure .env files
- [ ] Install backend dependencies
- [ ] Install frontend dependencies  
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Test application locally
- [ ] Familiarize with file structure
- [ ] Read API documentation
- [ ] Review contributing guidelines

---

**Happy Coding! 🚀**

For more help, check the documentation files or contact the team.
