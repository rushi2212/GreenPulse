// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAdmin, isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();  // Call the onLogout function passed from App
    navigate('/login');  // Redirect to login page
    setIsMenuOpen(false); // Close mobile menu on logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-3 px-4 md:py-4 md:px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="text-lg md:text-xl font-bold text-teal-600">GreenPulse</div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 focus:outline-none" 
          onClick={toggleMenu}
        >
          <svg 
            className="w-6 h-6 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menu links - desktop is horizontal, mobile is full width dropdown */}
        <ul className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col md:flex-row md:space-x-6 w-full md:w-auto mt-4 md:mt-0 space-y-3 md:space-y-0`}>
          <li>
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-teal-600 py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className="block text-gray-700 hover:text-teal-600 py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link 
                to="/leaderboard" 
                className="block text-gray-700 hover:text-teal-600 py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                LeaderBoard
              </Link>
            </li>
          )}

          {isLoggedIn && isAdmin && (
            <li>
              <Link 
                to="/admin" 
                className="block text-gray-700 hover:text-teal-600 py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                AdminDashboard
              </Link>
            </li>
          )}

          {isLoggedIn && !isAdmin && (
            <li>
              <Link 
                to="/cart" 
                className="block text-gray-700 hover:text-teal-600 py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
              </Link>
            </li>
          )}

          <li>
            <Link 
              to="/profile" 
              className="block text-gray-700 hover:text-teal-600 py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </li>

          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="w-full md:w-auto block text-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="w-full md:w-auto block text-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;