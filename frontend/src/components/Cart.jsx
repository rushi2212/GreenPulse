import React from "react";
import RazorpayCheckout from "./RazorpayCheckout"; // Adjust the path as needed

const Cart = ({ cartItems, fetchCart }) => {
  const token = localStorage.getItem("token");

  // Update quantity of an item
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected the Authorization header
        },
        body: JSON.stringify({
          items: [{ productId, quantity: newQuantity, action: "update" }],
        }),
      });

      if (res.ok) fetchCart(); // Refresh cart
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // Delete an item from the cart
  const deleteItem = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected the Authorization header
        },
        body: JSON.stringify({
          items: [{ productId, action: "delete" }],
        }),
      });

      if (res.ok) fetchCart(); // Refresh cart
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Calculate the cart total price
  const cartTotal = cartItems.items
    ? cartItems.items.reduce(
        (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
        0
      )
    : 0;

  // Calculate the total carbon saved
  const totalCarbonSaved = cartItems.items
    ? cartItems.items.reduce(
        (sum, item) =>
          sum + (item.productId?.carbonEmission || 0) * item.quantity,
        0
      )
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 pb-2 border-b border-gray-200">
        Your Cart
      </h2>

      {cartItems.items && cartItems.items.length > 0 ? (
        <div>
          {/* Cart Items */}
          <div className="space-y-6">
            {cartItems.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-6 transition-all hover:bg-gray-50 p-3 rounded"
              >
                {/* Product Image and Info */}
                <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0 w-full sm:w-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg mr-6 flex items-center justify-center overflow-hidden shadow-sm">
                    {item.productId?.image ? (
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>
                  <div className="text-center sm:text-left mt-3 sm:mt-0">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.productId?.name}
                    </h3>
                    <p className="text-md text-gray-700 font-medium mt-1">
                      ₹{item.productId?.price?.toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      CO₂ Saved: {(item.productId?.carbonEmission * item.quantity).toFixed(2)} kg
                    </p>
                  </div>
                </div>

                {/* Quantity Controls and Delete */}
                <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
                  <div className="flex items-center border rounded-full shadow-sm bg-white">
                    <button
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full transition-colors focus:outline-none"
                      onClick={() =>
                        updateQuantity(
                          item.productId._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-medium">{item.quantity}</span>
                    <button
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full transition-colors focus:outline-none"
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center group focus:outline-none"
                    onClick={() => deleteItem(item.productId._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="ml-1 hidden group-hover:inline text-sm">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-300 mt-3">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-gray-800">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Environmental Impact */}
            <div className="bg-green-50 p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-green-700 mb-3">Environmental Impact</h3>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Your purchase saves <strong>{totalCarbonSaved.toFixed(2)} kg</strong> of CO₂</span>
              </div>
              <div className="text-xs text-green-700 mt-2">
                This is equivalent to planting approximately {Math.round(totalCarbonSaved / 20)} trees
              </div>
            </div>
            
            {/* Checkout Button */}
            <RazorpayCheckout 
  cartItems={cartItems} 
  totalAmount={cartTotal.toFixed(2)} 
  fetchCart={fetchCart}
/>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-6 text-2xl font-medium text-gray-700">
            Your cart is empty
          </h3>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Explore our products and find eco-friendly alternatives!
          </p>
          
          <button
            onClick={() => (window.location.href = "/products")}
            className="mt-8 bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
