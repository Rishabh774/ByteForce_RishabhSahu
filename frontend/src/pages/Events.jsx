import React, { useState, useEffect } from 'react';
import { eventAPI } from '../utils/apiCalls';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, Filter } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, [category, page]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getAllEvents({
        category: category || undefined,
        search: search || undefined,
        page,
        limit: 12,
      });
      setEvents(response.data.events);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEvents();
  };

  if (loading && page === 1) {
    return <LoadingSpinner />;
  }

  const categories = ['festival', 'workshop', 'meetup', 'conference', 'concert', 'sports'];

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-2">Discover Events</h1>
        <p className="text-gray-600 mb-8">Find amazing events happening near you</p>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <form onSubmit={handleSearch} className="md:col-span-2">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="flex-1 ml-2 outline-none"
              />
              <button type="submit" className="text-primary font-bold">
                Search
              </button>
            </div>
          </form>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:border-primary"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {events.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-light disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg">
                Page {page}
              </span>
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
