import React from 'react';
import { MapPin, Calendar, Users, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const availableTickets = event.capacity - event.totalTicketsBooked;

  return (
    <Link to={`/event/${event._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
        {event.images && event.images[0] && (
          <div className="h-48 bg-light overflow-hidden">
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          </div>
        )}
        <div className="p-4">
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="text-xs bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full">
              {event.category}
            </span>
            {availableTickets < 10 && availableTickets > 0 && (
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                Last {availableTickets} tickets
              </span>
            )}
            {availableTickets === 0 && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                Sold Out
              </span>
            )}
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-dark">{event.title}</h3>

          <div className="space-y-1 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <span>{new Date(event.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span className="line-clamp-1">{event.venue?.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-primary" />
              <span>{availableTickets} tickets available</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2">
              <Ticket size={20} className="text-primary" />
              <span className="font-bold">₹{event.ticketPrice}</span>
            </div>
            <button className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-90 transition text-sm font-medium">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
