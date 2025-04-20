import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const categories = ['all', 'Skin Care', 'Clothing', 'Home', 'Accessories'];
  
  // Filter products by category and search query
  const filteredProducts = products
    .filter(product => category === 'all' || product.category === category)
    .filter(product => 
      searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      default: // 'featured'
        return 0;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Banner - Improved responsiveness */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">Discover Our Products</h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-xl sm:max-w-2xl">
            Browse our collection of sustainable and eco-friendly products designed with the planet in mind.
          </p>
          
          {/* Search Bar - Improved for mobile */}
          <div className="mt-6 sm:mt-8 relative max-w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8">
        {/* Filters Section - Better responsive layout */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter Pills - Scrollable on smaller screens */}
            <div className="overflow-x-auto pb-2 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="flex space-x-2 min-w-max">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      category === cat 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort Options - Better responsive layout */}
            <div className="flex items-center">
              <label htmlFor="sort" className="text-gray-700 text-sm sm:text-base mr-2">Sort by:</label>
              <select
                id="sort"
                className="bg-gray-100 border border-gray-300 text-gray-700 text-sm sm:text-base py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="nameAsc">Name: A to Z</option>
                <option value="nameDesc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Count - Responsive text sizing */}
        <div className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600">
          {isLoading ? 'Loading products...' : `Showing ${sortedProducts.length} products`}
        </div>

        {/* Product Grid - Improved responsive grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-sm sm:text-base text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mt-4">No products found</h2>
                <p className="text-sm sm:text-base text-gray-500 mt-2">Try selecting a different category or search term</p>
                <button 
                  onClick={() => {
                    setCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListing;