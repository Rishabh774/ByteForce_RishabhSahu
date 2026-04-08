# Project Overview & Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │  React Frontend  │         │  Mobile Browser  │              │
│  │   (Tailwind)     │         │   View (RWD)     │              │
│  └────────┬─────────┘         └────────┬─────────┘              │
│           │                            │                         │
│           └─────────────┬──────────────┘                         │
│                         │                                        │
├─────────────────────────┼──────────────────────────────────────┤
│                    NETWORK LAYER                                 │
│              (HTTPS/WebSocket/REST API)                          │
├─────────────────────────┼──────────────────────────────────────┤
│                         │                                        │
│           ┌─────────────▼──────────────┐                        │
│           │    Express.js Server       │                        │
│           │  (API Routes & Logic)      │                        │
│           └────────────┬────────────────┘                        │
│                        │                                         │
│        ┌───────────────┼───────────────┐                        │
│        │               │               │                        │
│   ┌────▼────┐    ┌─────▼──────┐  ┌───▼────────┐              │
│   │  Auth   │    │  Events    │  │  Bookings  │              │
│   │ Routes  │    │  Routes    │  │  Routes    │              │
│   └────┬────┘    └─────┬──────┘  └───┬────────┘              │
│        │                │             │                        │
│   ┌────▼──────────────┬─▼──────────┬──▼──────┐               │
│   │   Controllers &   │ Middleware │ Utils   │               │
│   │   Business Logic  │            │         │               │
│   └────┬──────────────┴─┬──────────┴──┬──────┘               │
│        │                │             │                        │
│        └────────────────┼─────────────┘                        │
│                         │                                       │
│           ┌─────────────▼──────────────┐                       │
│           │    Mongoose Models        │                       │
│           │  (Data Validation Layer)  │                       │
│           └─────────────┬──────────────┘                       │
│                         │                                       │
├────────────────────────────────────────────────────────────────┤
│                    DATABASE LAYER                              │
│  ┌──────────────────────────────────────┐                     │
│  │   MongoDB Atlas (Cloud Database)     │                     │
│  │                                      │                     │
│  │  Collections:                        │                     │
│  │  ├── Users                          │                     │
│  │  ├── Events                         │                     │
│  │  ├── Bookings                       │                     │
│  │  └── Ratings                        │                     │
│  └──────────────────────────────────────┘                     │
└────────────────────────────────────────────────────────────────┘
```

## Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String (10 digits),
  role: "user" | "organizer",
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  profilePicture: String,
  bio: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Event Schema
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  organizer: ObjectId (ref: User),
  startDate: Date,
  endDate: Date,
  time: String,
  venue: {
    name: String,
    address: String,
    city: String,
    latitude: Number,
    longitude: Number
  },
  capacity: Number,
  ticketPrice: Number,
  totalTicketsBooked: Number,
  images: [String],
  tags: [String],
  status: "draft" | "published" | "cancelled" | "completed",
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Schema
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  event: ObjectId (ref: Event),
  numberOfTickets: Number,
  totalPrice: Number,
  bookingDate: Date,
  status: "confirmed" | "cancelled" | "completed",
  qrCode: String (DataURL),
  tickets: [{
    ticketId: String,
    qrCode: String,
    isUsed: Boolean,
    usedAt: Date
  }],
  paymentStatus: "pending" | "completed" | "failed",
  paymentId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Rating Schema
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  event: ObjectId (ref: Event),
  booking: ObjectId (ref: Booking),
  rating: Number (1-5),
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Flow Diagram

```
User Request
    │
    ├─ Authentication Check (JWT)
    │
    ├─ Route Matching
    │
    ├─ Controller Logic
    │
    ├─ Database Query (Mongoose)
    │
    ├─ Response Formatting
    │
    └─ Send Response (JSON)
```

## Security Layers

1. **JWT Authentication**
   - Token-based stateless auth
   - Expires in 7 days

2. **Role-Based Access Control**
   - User routes
   - Organizer routes
   - Protected endpoints

3. **Input Validation**
   - Email validation
   - Phone number format
   - Mongoose schemas

4. **Password Security**
   - Bcryptjs hashing
   - 10 salt rounds
   - Never stored in plain text

5. **CORS Protection**
   - Whitelist origins
   - Include credentials

## Deployment Architecture

```
Developer
   │
   ├─► GitHub Repository
   │
   ├─► GitHub Actions (CI/CD)
   │
   ├─► Frontend: Vercel
   │   └─► Hosted at vercel.app
   │
   └─► Backend: Render
       ├─► Node.js Server
       └─► Connected to MongoDB Atlas
           └─► Cloud Database
```

## Performance Optimizations

1. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Caching strategies

2. **Backend**
   - Database indexing
   - Query optimization
   - Pagination
   - Middleware caching

3. **Database**
   - Geospatial indexing
   - Field indexing
   - Connection pooling

## Error Handling Strategy

```
Request
   │
   ├─ Try-Catch Block
   │
   ├─ Validation Error
   │   └─ 400 Bad Request
   │
   ├─ Authentication Error
   │   └─ 401 Unauthorized
   │
   ├─ Authorization Error
   │   └─ 403 Forbidden
   │
   ├─ Not Found Error
   │   └─ 404 Not Found
   │
   ├─ Server Error
   │   └─ 500 Internal Server Error
   │
   └─ Error Handler Middleware
       └─ Send Formatted Response
```

## Scalability Considerations

1. **Horizontal Scaling**
   - Containerized with Docker (future)
   - Load balancing ready
   - Stateless API

2. **Vertical Scaling**
   - Database indexing
   - Query optimization
   - Caching layer (Redis)

3. **Database Scaling**
   - MongoDB Atlas supports sharding
   - Connection pooling
   - Replica sets

4. **CDN Integration**
   - Vercel provides CDN for frontend
   - Image optimization
   - Global edge caching
