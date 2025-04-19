import React, { useState } from 'react';
import CarbonSummary from '../components/CarbonSummary';
import { createOrder } from '../services/api';

const CheckoutPage = () => {
  const [orderData, setOrderData] = useState({
    totalAmount: 0,
    carbonFootprint: 0
  });

  const handleCheckout = async () => {
    const order = await createOrder(orderData);
    alert('Order placed successfully!');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <CarbonSummary 
        totalAmount={orderData.totalAmount} 
        carbonFootprint={orderData.carbonFootprint} 
      />
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
