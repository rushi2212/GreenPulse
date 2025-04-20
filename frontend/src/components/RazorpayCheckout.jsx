import React from "react";
import {
  createOrder,
  updatePaymentStatus,
  updateUserCarbon,
} from "../services/api"; // Make sure this path is correct

const RazorpayCheckout = ({ cartItems, totalAmount, fetchCart }) => {
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalAmount * 100,
          items: cartItems.items.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            carbonEmission: item.productId.carbonEmission,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!data || !data.order) {
        console.error("Invalid response from backend:", data);
        return;
      }

      const options = {
        key: "rzp_test_zTR8e0CVAFaw54",
        amount: data.order.amount,
        currency: "INR",
        name: "GreenCart",
        description: "Sustainable purchase",
        order_id: data.order.id,
        handler: async function (response) {
          alert("Payment successful!");
          console.log("Razorpay Response:", response);

          try {
            const verifyRes = await fetch(
              "/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  order_id: data.order.id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment verified!");

              // ✅ Step 1: Create order
              const createdOrder = await createOrder({
                products: cartItems.items.map((item) => ({
                  productId: item.productId._id,
                  quantity: item.quantity,
                })),
                totalAmount,
                totalCarbonEmission: cartItems.items.reduce(
                  (acc, item) =>
                    acc + item.productId.carbonEmission * item.quantity,
                  0
                ),
              });

              // ✅ Step 2: Update payment status
              if (createdOrder && createdOrder._id) {
                console.log("Order ID for status update:", createdOrder._id);

                await updatePaymentStatus(createdOrder._id, "completed", token);
                await updateUserCarbon(
                  createdOrder.userId,
                  createdOrder.totalCarbonEmission,
                  token
                );
              }

              // ✅ Step 3: Clear cart
              await fetch("/api/cart/clear", {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              // ✅ Step 4: Refresh cart
              if (fetchCart) {
                await fetchCart();
              }
            } else {
              alert("Payment verification failed!");
            }
          } catch (err) {
            console.error("Error verifying payment or updating order:", err);
          }
        },
        prefill: {
          name: "Your Name",
          email: "email@example.com",
        },
        theme: {
          color: "#10B981", // Changed to teal-500 to match GreenCart eco-friendly theme
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed", err);
    }
  };

  return (
    <div className="w-full mt-4 md:mt-6 flex flex-col space-y-3">
      <button
        className="w-full bg-teal-600 text-white text-sm sm:text-base font-medium py-2 sm:py-3 px-4 rounded-md sm:rounded-lg hover:bg-teal-700 active:bg-teal-800 transition-colors duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center"
        onClick={handlePayment}
        aria-label="Proceed to Checkout"
      >
        <svg 
          className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        Proceed to Checkout
      </button>
      <p className="text-xs text-center text-gray-500 px-2">
        Secure payment powered by Razorpay
      </p>
    </div>
  );
};

export default RazorpayCheckout;