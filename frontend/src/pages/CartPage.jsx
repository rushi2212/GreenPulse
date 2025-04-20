import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import { fetchCart } from "../services/api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCart();
        setCartItems(data);
        setError(null);
      } catch (err) {
        setError("Failed to load cart. Please try again.");
        console.error("Error fetching cart:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getCart();
  }, []);

  const refreshCart = async () => {
    try {
      const data = await fetchCart();
      setCartItems(data); // Update cartItems state with the latest cart data
    } catch (err) {
      console.error("Error fetching updated cart:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
            <button
              className="mt-3 bg-red-100 text-red-700 py-2 px-4 rounded hover:bg-red-200"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <Cart cartItems={cartItems} fetchCart={refreshCart} />
        )}

        <div className="mt-8 flex flex-col md:flex-row md:justify-between gap-4">
          <button
            className="bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => window.history.back()}
          >
            Continue Shopping
          </button>

          <div className="flex gap-4">
            <button className="bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
