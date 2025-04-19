import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background on hover */}
      <div className="absolute inset-0 bg-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Eco badge */}
      {product.carbonFootprint < 10 && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-teal-100 text-teal-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6.382 5.968a1 1 0 011.32.133l.722.781a1 1 0 11-1.465 1.363l-.722-.781a1 1 0 01.145-1.496zm7.237 2.344a1 1 0 10-1.32-.133l-.722.781a1 1 0 101.465 1.363l.722-.781a1 1 0 00-.145-1.23zM10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd"></path>
            </svg>
            Eco-Friendly
          </div>
        </div>
      )}

      {/* Product image with zoom effect */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image || 'https://via.placeholder.com/300x200?text=Product+Image'} 
          alt={product.name}
          className="h-full w-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Content area */}
      <div className="relative p-5">
        <div className="mb-2 flex justify-between items-start">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h2>
          <span className="text-lg font-bold text-teal-700">₹{product.price}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        {/* Carbon footprint indicator */}
        <div className="flex items-center mb-4">
          <svg className="w-4 h-4 text-teal-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="text-xs text-teal-700">Carbon Footprint: {product.carbonEmission} kg CO2</span>
        </div>
        
        {/* Buttons */}
        <div className="flex space-x-2">
          <Link 
            to={`/products/${product._id}`}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors duration-200"
          >
            View Details
          </Link>
          <button 
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-2 rounded-lg transition-colors duration-200"
            aria-label="Add to cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>
        </div>

        {/* Animated pulse indicator for eco-friendly products */}
        {product.carbonFootprint < 5 && (
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-teal-500"></span>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      {isHovered && (
        <div className="absolute top-0 left-0 right-0 h-48 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute bottom-2 left-2 text-white text-xs font-medium px-2 py-1 rounded bg-teal-600">
            {product.category || 'Eco Product'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;