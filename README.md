# ByteForce - Hyper-Local Event Ticketing Platform
**Kalpathon Hackathon Submission** | **Web Development Track**

[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)](.)
[![Status](https://img.shields.io/badge/status-Active-success?style=flat-square)](.)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](.)

---

## 🚀 Project Overview

**ByteForce** is a comprehensive full-stack web application for discovering, booking, and managing tickets for hyper-local events including college fests, workshops, pop-ups, and community gatherings.

**Live Demo:** [Coming Soon]  
**GitHub:** [Repository Link]  
**Documentation:** See [FULL_README.md](./FULL_README.md) for complete details

---

## 🏆 Hackathon Submission Details

| Category | Details |
|----------|---------|
| **Team Name** | ByteForce |
| **Track** | Web Development |
| **Project** | Hyper-Local Event Ticketing Platform |
| **Submission Type** | Full-Stack Web Application |

---

## 👥 Team Members

| Name | Role | Expertise |
|------|------|-----------|
| **Rishabh Sahu** | Team Leader / Full Stack Developer | Backend & Architecture |
| **Saurabh Pandey** | Frontend Developer | React & UI/UX |
| **Saksham Bhatt** | Backend Developer | API & Database |

**Team Leader Contact:** Rishabh Sahu | Phone: 6388917907

---

## 🎯 Problem Statement

### The Challenge 🔴
In many colleges and local communities:
- ❌ **Fragmented Event Discovery** - No centralized platform for local events
- ❌ **Unorganized Ticketing** - Reliance on Google Forms, WhatsApp, emails
- ❌ **Poor Attendance Management** - Manual, error-prone check-ins
- ❌ **Organizer Burden** - Difficult registration and verification processes

### The Solution 🟢
ByteForce provides a **centralized, seamless platform** where:
- ✅ Users discover nearby events with one click
- ✅ Organizers manage everything from dashboard
- ✅ Automatic QR code generation and verification
- ✅ Real-time availability and analytics

---

## ✨ Key Features

### 👤 For Users
- 🔐 Secure authentication with JWT
- 🔍 Discover nearby events (location-based filtering)
- 🎟️ Instant ticket booking with real-time availability
- 📊 Personal dashboard with booking history
- 📸 Unique QR code tickets
- ⭐ Leave ratings and reviews
- 📱 Fully responsive mobile interface

### 👨‍💼 For Organizers
- ✏️ Create, update, delete events easily
- 📊 Real-time booking analytics
- 👥 Manage attendees and registrations
- 📱 Scan QR codes for instant check-in
- 📈 View revenue and occupancy metrics
- 🎯 Event status management
- 📋 Export booking data

---

## 🛠️ Technology Stack

### Frontend Architecture
```
React.js + Tailwind CSS
├── Components (Reusable UI)
├── Pages (Route-based)
├── Context (State Management)
├── Utilities (API & Helpers)
└── Responsive Design (Mobile-first)
```

### Backend Architecture
```
Node.js + Express.js
├── Models (MongoDB Schemas)
├── Controllers (Business Logic)
├── Routes (API Endpoints)
├── Middleware (Auth & Validation)
├── Utils (Helper Functions)
└── Config (Database Connection)
```

### Database & Storage
- **MongoDB Atlas** - Cloud NoSQL Database
- **Mongoose** - ODM for schema validation
- **Geospatial Indexing** - Location-based queries

### Authentication & Security
- **JWT** - Token-based authentication
- **Bcryptjs** - Password hashing (10 salt rounds)
- **CORS** - Cross-origin protection
- **Input Validation** - Server-side validation

### Deployment Infrastructure
- **Frontend:** Vercel (Global CDN, auto-deploy)
- **Backend:** Render (Managed Node.js hosting)
- **CI/CD:** GitHub Actions workflows
- **Monitoring:** Real-time error tracking

---

## 📋 Project Structure

```
ByteForce_RishabhSahu/
│
├── 📁 backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Event.js
│   │   │   ├── Booking.js
│   │   │   └── Rating.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── eventRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   └── ratingRoutes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── eventController.js
│   │   │   ├── bookingController.js
│   │   │   └── ratingController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── 📁 frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── RatingCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── OrganizerDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── apiCalls.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── public/
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   └── package.json
│
├── 📄 FULL_README.md
├── 📄 SETUP_GUIDE.md
├── 📄 API_DOCUMENTATION.md
├── 📄 ARCHITECTURE.md
├── 📄 FEATURES.md
├── 📄 TESTING_GUIDE.md
├── 📄 CONTRIBUTING.md
└── 📄 README.md (this file)
```

---

## 🚀 Quick Start

### 1️⃣ Prerequisites
- Node.js v14+ 
- npm/yarn
- MongoDB Atlas account
- Git

### 2️⃣ Installation

```bash
# Clone repository
git clone https://github.com/yourusername/ByteForce_RishabhSahu.git
cd ByteForce_RishabhSahu

# Backend setup
cd backend
cp .env.example .env
# Edit .env with MongoDB URI and JWT secret
npm install
npm run dev  # Runs on http://localhost:5000

# Frontend setup (in new terminal)
cd frontend
cp .env.example .env
npm install
npm start  # Runs on http://localhost:3000
```

**For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

## 📊 Feature Checklist

| Feature | Status | Details |
|---------|--------|---------|
| User Authentication | ✅ | JWT-based, role-based access |
| Event Discovery | ✅ | Location + category filtering |
| Ticket Booking | ✅ | Real-time availability |
| QR Code System | ✅ | Generation + verification |
| Dashboards | ✅ | User + Organizer views |
| Ratings System | ✅ | 1-5 stars with comments |
| Responsive UI | ✅ | Mobile, tablet, desktop |
| API Documentation | ✅ | Complete endpoint docs |
| Deployment Ready | ✅ | Vercel + Render configs |

**Full checklist available in [FEATURES.md](./FEATURES.md)**

---

## 🌍 Impact & Benefits

| Stakeholder | Benefits |
|------------|----------|
| **Students** | 🎓 Easy event discovery, quick bookings, joined community |
| **Organizers** | 📊 Automated management, real-time analytics, reduced workload |
| **Community** | 🌐 Increased event visibility, better crowd management |
| **Colleges** | 📈 Higher participation rates, centralized event management |

---

## 🔗 Important Links

- 📖 **[Full Documentation](./FULL_README.md)** - Complete project details
- 🔧 **[Setup Guide](./SETUP_GUIDE.md)** - Installation instructions
- 📚 **[API Docs](./API_DOCUMENTATION.md)** - API endpoint reference
- 🏗️ **[Architecture](./ARCHITECTURE.md)** - System design & flow
- ✨ **[Features](./FEATURES.md)** - Complete feature list
- 🧪 **[Testing Guide](./TESTING_GUIDE.md)** - Testing procedures
- 🤝 **[Contributing](./CONTRIBUTING.md)** - Contribution guidelines

---

## 🎨 Screenshots & Demo

[Demo video and screenshots coming soon]

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm install -g vercel
vercel
```

### Backend (Render)
Connect GitHub repo → Create Web Service → Set environment variables → Deploy

**Detailed deployment in [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

## 💡 Future Enhancements

- 💬 Real-time chat between users & organizers
- 💳 Payment gateway integration (Razorpay/Stripe)
- 🤖 AI-based event recommendations
- 📱 Native mobile app (React Native)
- 🔔 Push notifications
- 📧 Email & SMS integration
- 🌙 Dark mode
- 🔐 Two-factor authentication

---

## 📞 Support & Contact

**Questions or feedback?** Reach out to us:
- **Email:** support@byteforce.com
- **GitHub:** [Repository Issues](.)
- **LinkedIn:** [Team profiles]

---

## 📄 License

This project is licensed under the **MIT License** - see LICENSE file for details.

---

## 🙏 Acknowledgments

- Built for **Kalpathon Hackathon 2024**
- Thanks to the open-source community
- Special mention to all contributors and supporters

---

## ⭐ Show Your Support

If you found this project helpful, please **star ⭐ this repository**!

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     Made with ❤️  by ByteForce Team                      ║
║     Kalpathon Hackathon 2024                             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

**Happy Coding! 🚀**
