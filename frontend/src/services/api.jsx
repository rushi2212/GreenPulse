import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// export const fetchCart = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/cart`);
    
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     return [];
//   }
// };

export const fetchCart = async () => {
  const token = localStorage.getItem('token'); 
  console.log(token);// or wherever you're storing it
  const res = await axios.get('http://localhost:5000/api/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchUserOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
};


export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token"); // get the token

    const response = await axios.post(
      `${API_URL}/orders`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // throw it so calling functions can handle it
  }
};


export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/users/profile` ,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {};
  }
};


export const updatePaymentStatus = async (orderId, status , token) => {

  try {
    const response = await axios.patch(
      `${API_URL}/order  /payment-status`,
      { orderId, status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update payment status:", error);
    throw error; // so you can catch it in RazorpayCheckout
  }
};

