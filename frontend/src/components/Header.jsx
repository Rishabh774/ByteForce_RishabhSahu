import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ES</span>
            </div>
            <span className="font-bold text-xl text-dark hidden sm:inline">EventSphere</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/events" className="text-dark hover:text-primary transition">
              Events
            </Link>
            {isAuthenticated && user?.role === 'organizer' && (
              <Link to="/organizer/dashboard" className="text-dark hover:text-primary transition">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-dark hover:text-primary">
                  <User size={20} />
                  <span>{user?.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-dark hover:text-primary transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link to="/events" className="text-dark hover:text-primary">
                Events
              </Link>
              {isAuthenticated && user?.role === 'organizer' && (
                <Link to="/organizer/dashboard" className="text-dark hover:text-primary">
                  Dashboard
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-dark hover:text-primary">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="text-primary hover:bg-light px-4 py-2 rounded">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-dark hover:text-primary">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
