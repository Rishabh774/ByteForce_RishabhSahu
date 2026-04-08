# API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://byteforce-backend.render.com/api`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Auth Endpoints

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "user"  // "user" or "organizer"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token",
  "user": { ... }
}
```

## Event Endpoints

### Get All Events
```http
GET /events?category=festival&search=college&page=1&limit=10&latitude=28.6139&longitude=77.2090

Response:
{
  "success": true,
  "events": [...],
  "pagination": {
    "current": 1,
    "total": 5,
    "totalRecords": 50
  }
}
```

### Create Event (Organizer)
```http
POST /events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tech Fest 2024",
  "description": "Annual tech festival",
  "category": "festival",
  "startDate": "2024-12-25",
  "endDate": "2024-12-26",
  "time": "10:00",
  "venue": {
    "name": "Convention Center",
    "address": "123 Main St",
    "city": "Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "capacity": 500,
  "ticketPrice": 500,
  "tags": ["tech", "college"],
  "images": ["image_url"]
}
```

## Booking Endpoints

### Book Tickets
```http
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": "event_id",
  "numberOfTickets": 2
}

Response:
{
  "success": true,
  "message": "Tickets booked successfully",
  "booking": {
    "_id": "booking_id",
    "numberOfTickets": 2,
    "totalPrice": 1000,
    "status": "confirmed",
    "tickets": [
      {
        "ticketId": "ticket_1",
        "qrCode": "data:image/png;base64,..."
      }
    ]
  }
}
```

### Get User Bookings
```http
GET /bookings/my-bookings
Authorization: Bearer <token>

Response:
{
  "success": true,
  "bookings": [...]
}
```

### Verify Attendance
```http
PUT /bookings/verify-attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "ticketId": "ticket_1",
  "bookingId": "booking_id"
}
```

## Rating Endpoints

### Add Rating
```http
POST /ratings
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": "event_id",
  "bookingId": "booking_id",
  "rating": 5,
  "comment": "Great event!"
}
```

### Get Event Ratings
```http
GET /ratings/event/:eventId?page=1&limit=10

Response:
{
  "success": true,
  "ratings": [...],
  "averageRating": 4.5,
  "pagination": {...}
}
```

## Error Responses

```json
{
  "success": false,
  "message": "Error message here"
}
```

### Common Status Codes
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
