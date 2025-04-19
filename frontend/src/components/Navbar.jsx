import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login'); // Redirect to login page
  };

  // Check if the user is logged in by the presence of the token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-teal-600">YourBrand</div>

        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className="text-gray-700 hover:text-teal-600 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-teal-600 transition-colors duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-teal-600 transition-colors duration-200 flex items-center"
            >
              <span>Cart</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className="text-gray-700 hover:text-teal-600 transition-colors duration-200"
            >
              Profile
            </Link>
          </li>
          
          {/* Conditional rendering based on login status */}
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link 
                to="/login" 
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200"
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
