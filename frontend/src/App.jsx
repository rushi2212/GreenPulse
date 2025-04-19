// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage'
import './App.css';
import ProductDetails from './pages/ProductDetails';

function App() {
const  cartItems = [] ;

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/cart" element={<CartPage cartItems= { cartItems }/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage/>} />
          
          

          <Route path="/products/:id" element={<ProductDetails />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
