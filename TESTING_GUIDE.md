# Testing Guide

## Backend Testing

### Unit Tests
```bash
cd backend
npm test
```

### Manual API Testing

1. **Register a user**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "9876543210",
    "role": "user"
  }'
```

2. **Create an event**
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Fest 2024",
    "description": "Annual tech festival",
    "category": "festival",
    "startDate": "2024-12-25",
    "endDate": "2024-12-26",
    "time": "10:00",
    "venue": {
      "name": "Convention Center",
      "address": "123 Main St",
      "city": "Delhi"
    },
    "capacity": 500,
    "ticketPrice": 500
  }'
```

## Frontend Testing

### Component Tests
```bash
cd frontend
npm test
```

### Manual Testing Checklist

**Authentication**
- [ ] User registration
- [ ] User login
- [ ] Organizer registration
- [ ] Organizer login
- [ ] Profile update
- [ ] Logout

**Event Management**
- [ ] View all events
- [ ] Filter by category
- [ ] Search events
- [ ] View event details
- [ ] Create event (organizer)
- [ ] Update event (organizer)
- [ ] Delete event (organizer)

**Booking System**
- [ ] Book tickets
- [ ] View bookings
- [ ] Cancel booking
- [ ] QR code display
- [ ] QR code verification

**Rating System**
- [ ] Add rating
- [ ] View ratings
- [ ] Update rating
- [ ] Delete rating

## Performance Testing

### Frontend
- Lighthouse audit
- Bundle size analysis
- Code splitting

### Backend
- Load testing with Artillery
- Response time optimization
- Database query optimization

## Deployment Testing

1. Test environment variables
2. Test database connection
3. Test API endpoints
4. Test UI on different browsers
5. Test UI on mobile devices
