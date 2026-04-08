import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold">BF</span>
              </div>
              <span className="font-bold text-xl">EventSphere</span>
            </div>
            <p className="text-gray-400 text-sm">
              Hyper-Local Event Ticketing Platform
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="/" className="hover:text-primary transition">Home</a></li>
              <li><a href="/events" className="hover:text-primary transition">Events</a></li>
              <li><a href="/about" className="hover:text-primary transition">About</a></li>
              <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="text-gray-400 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>saurabh555pandey@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 8294950445</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-8 flex justify-between items-center flex-col md:flex-row gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2024 EventSphere. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
