# Hyper-Local Event Ticketing Platform - Setup Guide

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
cp .env.example .env
```

### 4. Configure environment variables
Edit `.env` with your:
- MongoDB URI
- JWT Secret
- Port and other settings

### 5. Start the server
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

---

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
cp .env.example .env
```

### 4. Start the development server
```bash
npm start
```

Frontend will run on `http://localhost:3000`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (organizer)
- `PUT /api/events/:id` - Update event (organizer)
- `DELETE /api/events/:id` - Delete event (organizer)
- `GET /api/events/organizer/my-events` - Get organizer's events

### Bookings
- `POST /api/bookings` - Book tickets
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `PUT /api/bookings/verify-attendance` - Verify QR code
- `GET /api/bookings/event/:eventId` - Get event bookings (organizer)

### Ratings
- `POST /api/ratings` - Add rating
- `GET /api/ratings/event/:eventId` - Get event ratings
- `PUT /api/ratings/:id` - Update rating
- `DELETE /api/ratings/:id` - Delete rating

---

## Deployment

### Frontend (Vercel)
1. Install Vercel CLI: `npm install -g vercel`
2. From frontend directory: `vercel`
3. Follow the prompts

### Backend (Render)
1. Create a Render account
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure environment variables
5. Deploy

---

## Project Structure

```
ByteForce_RishabhSahu/
├── backend/
│   ├── src/
│   │   ├── config/      # Database config
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Route handlers
│   │   ├── middleware/  # Auth and error handling
│   │   ├── utils/       # Helper functions
│   │   └── index.js     # Main server file
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Auth context
│   │   ├── utils/       # API calls and helpers
│   │   ├── styles/      # CSS files
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── public/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## Technologies Used

**Frontend:**
- React.js
- Tailwind CSS
- Lucide React (icons)
- Axios (HTTP client)
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- QRCode.js (QR generation)
- Bcryptjs (Password hashing)

**Deployment:**
- Vercel (Frontend)
- Render (Backend)

---

## Features Implemented

✅ User Authentication (JWT)
✅ Location-based event discovery
✅ Event booking system
✅ QR code ticket generation
✅ QR-based attendance tracking
✅ User dashboard with bookings
✅ Organizer dashboard with event management
✅ Ratings and feedback system
✅ Responsive UI (mobile & desktop)
✅ Secure API with validation

---

## Team Information

- **Team Name:** ByteForce
- **GitHub Repo:** [Your GitHub Link]
- **Live Project:** [Your Deployment Link]

Enjoy using ByteForce! 🚀
