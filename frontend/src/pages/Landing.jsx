import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, MapPin, Users, QrCode, Zap, Shield, ArrowRight, Check } from 'lucide-react';

const Landing = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover & Book <br />Local Events Instantly
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              EventSphere connects you to the most exciting hyper-local events, workshops, concerts, and festivals in your area. Buy tickets securely with UPI payments and get instant QR codes.
            </p>
            <div className="flex gap-4 justify-center flex-col sm:flex-row mb-12">
              <Link
                to="/register"
                className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-lg"
              >
                Get Started Free
                <ArrowRight size={24} />
              </Link>
              <Link
                to="/events"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition shadow-lg"
              >
                Browse Events
              </Link>
            </div>
            <p className="text-gray-200">Join 1000+ event enthusiasts discovering amazing experiences</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EventSphere?</h2>
            <p className="text-xl text-gray-600">Everything you need for seamless event booking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                <MapPin size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Hyper-Local Events</h3>
              <p className="text-gray-600">
                Discover exciting events, festivals, concerts, and workshops happening near you in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Ticket size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Browse events, select tickets, and book instantly with our simple and intuitive interface.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                <QrCode size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Instant QR Codes</h3>
              <p className="text-gray-600">
                Get unique QR codes for each ticket instantly. No printing needed, just scan and enter!
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Zap size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">UPI Payments</h3>
              <p className="text-gray-600">
                Secure UPI payments directly to event organizers. Fast, safe, and hassle-free transactions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Organizers</h3>
              <p className="text-gray-600">
                Create and manage events easily. Scan QR codes to verify attendance at your events.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Shield size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Secure & Trusted</h3>
              <p className="text-gray-600">
                Your data is safe with JWT authentication and secure database encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get your tickets in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-bold text-center mb-3">Sign Up</h3>
              <p className="text-gray-600 text-center">
                Create your account as a user or organizer. Takes less than a minute!
              </p>
              {/* Arrow */}
              <div className="hidden md:block absolute top-20 -right-6 text-primary text-4xl">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-bold text-center mb-3">Browse & Book</h3>
              <p className="text-gray-600 text-center">
                Discover amazing events near you and book tickets instantly with UPI payment.
              </p>
              {/* Arrow */}
              <div className="hidden md:block absolute top-20 -right-6 text-primary text-4xl">→</div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-bold text-center mb-3">Get & Scan QR</h3>
              <p className="text-gray-600 text-center">
                Receive instant QR codes. Show them at the event and enjoy the experience!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Organizers Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Organize Events Easily</h2>
              <p className="text-xl text-gray-600 mb-8">
                EventSphere makes it simple for organizers to create and manage events with built-in ticketing and verification.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Check size={24} className="text-primary flex-shrink-0" />
                  <p className="text-lg">Create unlimited events with detailed information</p>
                </div>
                <div className="flex gap-3">
                  <Check size={24} className="text-primary flex-shrink-0" />
                  <p className="text-lg">Real-time booking tracking and analytics</p>
                </div>
                <div className="flex gap-3">
                  <Check size={24} className="text-primary flex-shrink-0" />
                  <p className="text-lg">Scan QR codes for instant attendee verification</p>
                </div>
                <div className="flex gap-3">
                  <Check size={24} className="text-primary flex-shrink-0" />
                  <p className="text-lg">Receive payments directly to your UPI account</p>
                </div>
              </div>
              <Link
                to="/register"
                className="mt-8 inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
              >
                Start Organizing Today
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-12 text-white text-center">
              <Ticket size={64} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Organize?</h3>
              <p className="text-lg mb-6">
                Sign up as an organizer and create your first event now. It's completely free!
              </p>
              <Link
                to="/register"
                className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Become an Organizer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join EventSphere today and discover amazing events in your city. Whether you're looking for concerts, workshops, festivals, or meetups, we've got you covered!
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link
              to="/register"
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition inline-block"
            >
              Sign Up Now
            </Link>
            <Link
              to="/events"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition inline-block"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
