import React from "react";
import { createOrder, updatePaymentStatus } from "../services/api"; // Make sure this path is correct

const RazorpayCheckout = ({ cartItems, totalAmount, fetchCart }) => {
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/payment/order", {
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
            const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
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
            });

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
                  (acc, item) => acc + item.productId.carbonEmission * item.quantity,
                  0
                ),
              });

              // ✅ Step 2: Update payment status
              if (createdOrder && createdOrder._id) {
                console.log("Order ID for status update:", createdOrder._id);

                await updatePaymentStatus(createdOrder._id, "completed", token);
              }

              // ✅ Step 3: Clear cart
              await fetch("http://localhost:5000/api/cart/clear", {
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
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed", err);
    }
  };

  return (
    <button
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      onClick={handlePayment}
    >
      Proceed to Checkout
    </button>
  );
};

export default RazorpayCheckout;
