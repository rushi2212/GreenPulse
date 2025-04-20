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
    <div className="min-h-screen transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold  mb-6">Your Shopping Cart</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16 sm:py-20">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg shadow-sm mb-6">
            <p className="font-medium">{error}</p>
            <button
              className="mt-3 bg-red-100 dark:bg-red-800/40 text-red-700 dark:text-red-300 py-2 px-4 rounded-md hover:bg-red-200 dark:hover:bg-red-800/60 transition-colors duration-200 font-medium text-sm"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <Cart cartItems={cartItems} fetchCart={refreshCart} />
          </div>
        )}

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 sm:px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors shadow-sm font-medium text-sm sm:text-base"
            onClick={() => window.history.back()}
          >
            Continue Shopping
          </button>

          <div className="flex gap-3 mt-3 sm:mt-0">
            <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 sm:px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors shadow-sm font-medium text-sm sm:text-base">
              Save for Later
            </button>
            
            <button className="bg-blue-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm sm:text-base">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;