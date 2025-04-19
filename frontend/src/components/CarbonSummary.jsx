import React from 'react';

const CarbonSummary = ({ totalAmount, carbonFootprint }) => {
  return (
    <div>
      <h3>Total Amount: ₹{totalAmount}</h3>
      <h3>Total Carbon Footprint: {carbonFootprint} kg CO2</h3>
    </div>
  );
};

export default CarbonSummary;
