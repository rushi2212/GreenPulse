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


export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {};
  }
};
