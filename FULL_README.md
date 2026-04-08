# ByteForce - Hyper-Local Event Ticketing Platform

A comprehensive, full-stack web application for discovering, booking, and managing tickets for nearby events such as college fests, workshops, pop-ups, and community gatherings.

![ByteForce](https://img.shields.io/badge/ByteForce-Hackathon-red?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## 🎯 Problem Statement

In many colleges and local communities, people struggle to discover nearby events, and event organizers face difficulty in managing registrations and attendance.

**Key Challenges:**
- No centralized platform for local events
- Unorganized ticket booking (Google Forms, WhatsApp, etc.)
- No proper attendance management
- Manual, time-consuming event management

## 💡 Solution

ByteForce provides a seamless, centralized web-based platform where:

### For Users
- 🔍 Discover nearby events using location-based filtering
- 🎟️ Book tickets instantly with real-time availability
- 📊 Access personal dashboard to manage bookings
- 📸 Receive unique QR code tickets
- ⭐ Leave ratings and feedback

### For Organizers
- ✏️ Create, update, and delete events
- 📊 Track registrations in real-time
- ✅ Verify attendees using QR code scanning
- 📈 View booking analytics and revenue

## ✨ Key Features

- **🔐 Dual Authentication System** - Separate login flows for Users and Organizers
- **🔍 Location-Based Discovery** - Find events near you on an interactive map
- **🎟️ Smart Booking System** - Real-time ticket availability and instant confirmation
- **📱 QR Code Integration** - Automatic QR generation and verification
- **👤 User Profiles** - Manage personal information and bookings
- **📊 Admin Dashboard** - Event management and analytics
- **⭐ Rating System** - Community-driven reviews and feedback
- **🔒 Secure Payment** - Ready for payment gateway integration
- **📱 Fully Responsive** - Mobile-first design for all devices
- **⚡ Real-time Updates** - Live availability and status updates

## 🛠️ Tech Stack

### Frontend
- **React.js** - Dynamic UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **QRCode.react** - QR code generation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **QRCode.js** - Server-side QR generation
- **Bcryptjs** - Password hashing

### Deployment
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **MongoDB Atlas** - Cloud database
- **GitHub Actions** - CI/CD

## 📋 Project Structure

```
ByteForce_RishabhSahu/
│
├── 📁 backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth & error handling
│   │   ├── utils/           # Helper functions
│   │   └── index.js         # Server entry point
│   ├── .env.example         # Environment template
│   └── package.json
│
├── 📁 frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   ├── utils/           # API & helpers
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── SETUP_GUIDE.md           # Installation guide
├── API_DOCUMENTATION.md     # API endpoints
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn
- MongoDB Atlas account
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/ByteForce_RishabhSahu.git
cd ByteForce_RishabhSahu
```

**2. Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

**3. Frontend Setup** (in a new terminal)
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

**4. Access the application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
PUT    /api/auth/profile
```

### Events
```
GET    /api/events
GET    /api/events/:id
POST   /api/events (Organizer)
PUT    /api/events/:id (Organizer)
DELETE /api/events/:id (Organizer)
```

### Bookings
```
POST   /api/bookings
GET    /api/bookings/my-bookings
GET    /api/bookings/:id
PUT    /api/bookings/:id/cancel
PUT    /api/bookings/verify-attendance (Organizer)
```

### Ratings
```
POST   /api/ratings
GET    /api/ratings/event/:eventId
PUT    /api/ratings/:id
DELETE /api/ratings/:id
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete details.

## 👥 User Roles

### User
- Browse events
- Filter by location and category
- Book tickets
- View booking history
- Leave ratings

### Organizer
- Create events
- Manage attendees
- Scan QR codes for check-in
- View analytics
- Update event details

## 🔄 Workflow

### User Journey
1. Register/Login
2. Browse nearby events
3. Filter by category/date
4. Book tickets
5. Get QR code ticket
6. Attend event
7. Leave rating

### Organizer Journey
1. Register as organizer
2. Create event
3. Publish event
4. Manage registrations
5. Scan QR codes at event
6. View analytics

## 🎨 UI/UX Features

- **Responsive Design** - Works perfectly on mobile, tablet, desktop
- **Intuitive Navigation** - Easy-to-use interface
- **Dark Mode Ready** - Can be extended with dark mode
- **Accessibility** - WCAG compliant
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Real-time feedback

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control
- ✅ Input validation
- ✅ CORS protection
- ✅ Environment variables
- ✅ Secure headers

## 📈 Potential Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Real-time notifications
- [ ] Advanced search with filters
- [ ] Event recommendations (ML)
- [ ] Chat system between users and organizers
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Referral system
- [ ] Email verification

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm install -g vercel
vercel
```

### Backend (Render)
1. Connect GitHub repository
2. Create Web Service
3. Configure environment variables
4. Deploy

## 📞 Support & Contact

- **Team:** ByteForce
- **Email:** support@byteforce.com
- **GitHub:** [Repository Link]

## 👨‍💼 Team Members

| Name | Role | Contact |
|------|------|---------|
| Rishabh Sahu | Team Leader / Full Stack | [Contact] |
| Saurabh Pandey | Frontend Developer | [Contact] |
| Saksham Bhatt | Backend Developer | [Contact] |

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for the Kalpathon Hackathon
- Thanks to all contributors and supporters
- Special thanks to the open-source community

---

## 🌟 Show Your Support

If you found this project helpful, please star ⭐ the repository!

**Made with ❤️ by ByteForce Team**
