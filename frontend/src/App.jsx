// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import ProductListing from "./pages/ProductListing";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import GreenLeaderboard from "./pages/GreenLeaderboard";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Update login state on logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  // Update isAdmin when app loads or when login/logout happens
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setIsLoggedIn(true);
          setIsAdmin(decoded.isAdmin);
        } catch (err) {
          console.error("Invalid token", err);
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkToken();

    // 👇 Listen for login changes
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);
  // Trigger update when isLoggedIn changes

  // console.log("nav" + isAdmin + isLoggedIn);
  return (
    <Router>
      <Navbar
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          {isLoggedIn && !isAdmin && (
            <Route path="/cart" element={<CartPage />} />
          )}
          <Route path="/profile" element={<ProfilePage />} />
          {isLoggedIn && isAdmin && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          {isLoggedIn && (
            <Route path="/leaderboard" element={<GreenLeaderboard />} />
          )}
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
