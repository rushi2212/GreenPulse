import React from "react";
//import { useNavigate } from "react-router-dom";


const RazorpayCheckout = ({ cartItems, totalAmount ,fetchCart}) => {
  //const navigate = useNavigate(); 
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

      const res = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Amount in paise
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
        key: "rzp_test_zTR8e0CVAFaw54", // Replace with your actual key
        amount: data.order.amount,
        currency: "INR",
        name: "GreenCart",
        description: "Sustainable purchase",
        order_id: data.order.id,
        handler: async function (response) {
          alert("Payment successful!");
          console.log("Razorpay Response:", response);

          try {
            // Verify payment
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

              await fetch("http://localhost:5000/api/cart/clear", {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (fetchCart) {
                await fetchCart(); // ✅ Refresh cart after clearing
              }
            } else {
              alert("Payment verification failed!");
            }
          } catch (err) {
            console.error("Error verifying payment or clearing cart:", err);
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
