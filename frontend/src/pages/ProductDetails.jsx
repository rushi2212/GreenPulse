import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
  
        const foundProduct = data.find((item) => item._id === id);
        if (!foundProduct) {
          console.error('Product not found');
          return;
        }
  
        setProduct(foundProduct);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [
            {
              productId: product._id,
              quantity: quantity,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add to cart');
      }

      navigate('/cart');
    } catch (err) {
      console.error('Add to cart failed:', err.message);
      setAddingToCart(false);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-4 sm:mb-6 overflow-x-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
            <li>
              <a href="/" className="hover:text-blue-600">Home</a>
            </li>
            <li className="flex items-center">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <a href="/products" className="hover:text-blue-600">Products</a>
            </li>
            <li className="flex items-center">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-700 font-medium truncate max-w-[150px] sm:max-w-xs">{product.name}</li>
          </ol>
        </nav>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-3/5">
              <div className="relative h-72 sm:h-80 md:h-96 lg:h-[32rem] bg-gray-200 flex justify-center items-center overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 sm:px-2.5 sm:py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden xs:inline">Eco-friendly</span>
                </div>
                <img
                  src={product.image || 'https://via.placeholder.com/600x600?text=No+Image+Available'}
                  alt={product.name}
                  className="object-contain h-full w-full p-4 sm:p-8"
                />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-2/5 p-4 sm:p-6 lg:p-10 flex flex-col">
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-baseline mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                <div className="prose prose-sm text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  <p>{product.description}</p>
                </div>

                {/* Environmental Impact */}
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <h3 className="text-xs sm:text-sm font-medium text-green-800 flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Environmental Impact
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-xs sm:text-sm text-green-700">Carbon Footprint:</p>
                      <p className="text-base sm:text-lg font-semibold text-green-800">{product.carbonEmission} kg CO₂</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs text-green-700">Compared to traditional alternatives:</p>
                      <p className="text-xs sm:text-sm font-medium text-green-800">Saves up to {(product.carbonEmission * 2).toFixed(1)} kg CO₂</p>
                    </div>
                  </div>
                </div>

                {/* Product Highlights */}
                {product.highlights && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Highlights</h3>
                    <ul className="list-disc list-inside space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-gray-600">
                      {product.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Add to Cart Section */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Quantity</span>
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <button 
                      onClick={decreaseQuantity}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-l-full transition"
                    >
                      -
                    </button>
                    <span className="w-8 sm:w-10 text-center text-sm sm:text-base">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-r-full transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className={`flex justify-center items-center py-2 sm:py-3 px-3 sm:px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition text-sm sm:text-base ${addingToCart ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {addingToCart ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button className="py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition text-sm sm:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-6 sm:mt-10 bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="px-2 sm:px-4 flex divide-x divide-gray-200 whitespace-nowrap">
              <button className="text-blue-600 py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base font-medium border-b-2 border-blue-600 -mb-px">Description</button>
              <button className="text-gray-500 py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base font-medium hover:text-gray-700">Reviews</button>
              <button className="text-gray-500 py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base font-medium hover:text-gray-700">Sustainability</button>
            </nav>
          </div>
          <div className="p-4 sm:p-6">
            <div className="prose prose-sm max-w-none text-gray-700 text-sm sm:text-base">
              <p>{product.description}</p>
              <p className="mt-2 sm:mt-4">This eco-friendly product is part of our commitment to sustainability. By choosing this item, you're supporting environmentally responsible manufacturing processes and reducing your carbon footprint.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;