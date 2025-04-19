import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Products</h2>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <button>Update</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
