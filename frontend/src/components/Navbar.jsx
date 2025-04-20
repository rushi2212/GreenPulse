// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAdmin, isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  // console.log("nav" + isAdmin + isLoggedIn);

  const handleLogout = () => {
    onLogout();  // Call the onLogout function passed from App
    navigate('/login');  // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-teal-600">GreenPulse</div>

        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-teal-600">Home</Link>
          </li>
          <li>
            <Link to="/products" className="text-gray-700 hover:text-teal-600">Products</Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link to="/leaderboard" className="text-gray-700 hover:text-teal-600">LeaderBoard</Link>
            </li>
          )}

          {isLoggedIn && isAdmin && (
            <li>
              <Link to="/admin" className="text-gray-700 hover:text-teal-600">AdminDashboard</Link>
            </li>
          )}

          {isLoggedIn && !isAdmin && (
            <li>
              <Link to="/cart" className="text-gray-700 hover:text-teal-600">Cart</Link>
            </li>
          )}

          <li>
            <Link to="/profile" className="text-gray-700 hover:text-teal-600">Profile</Link>
          </li>

          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
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
