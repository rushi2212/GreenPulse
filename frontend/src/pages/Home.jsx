import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import "./Home.css"; // Import your CSS file for the animated background

const Home = () => {
  // const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      // setProducts(data);

      // Select first 4 products as featured
      if (data.length > 0) {
        setFeaturedProducts(data.slice(0, 4));
      }
    };

    getProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-50 to-amber-50 py-24 px-4 sm:px-6 lg:px-8 mb-16 rounded-lg shadow-lg relative overflow-hidden">
        <div className="relative">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-olive-50 to-olive-100">
              <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div className="absolute top-10 left-10 w-72 h-72 bg-olive-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-20 w-96 h-96 bg-brown-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-20 left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>

              {/* Accent patterns */}
              <div className="absolute top-10 left-1/4 w-20 h-20 rounded-full border-4 border-amber-200 opacity-40"></div>
              <div className="absolute bottom-20 right-1/4 w-16 h-16 rounded-full border-4 border-teal-200 opacity-40"></div>

              {/* Subtle leaf illustrations */}
              <div className="leaf-light leaf-top-right"></div>
              <div className="leaf-light leaf-bottom-left"></div>
            </div>

            <div className="container mx-auto max-w-5xl relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left content */}
                <div className="text-left space-y-6">
                  <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full font-medium text-sm tracking-wide">
                    Eco-friendly living
                  </span>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                    <span className="block text-teal-600">
                      Beautiful Products
                    </span>
                    <span className="block">For a Sustainable Life</span>
                  </h1>

                  <p className="text-lg text-gray-600 max-w-lg">
                    Discover our collection of eco-conscious products that help
                    you live more sustainably without compromising on style or
                    quality.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <a
                      href="#featured"
                      className="px-8 py-3.5 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition duration-300 shadow-md hover:shadow-lg"
                    >
                      Shop Collection
                    </a>
                    <a
                      href="/about"
                      className="px-8 py-3.5 bg-white text-teal-600 font-medium rounded-lg hover:bg-gray-50 transition duration-300 shadow-md hover:shadow-lg border border-teal-200"
                    >
                      Learn Our Story
                    </a>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex -space-x-2">
                      <img
                        src="https://cdn3.vectorstock.com/i/1000x1000/11/27/cartoon-businessman-in-suit-portrait-in-circle-vector-17571127.jpg"
                        alt="Customer"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                      <img
                        src="https://www.trader-dale.com/wp-content/uploads/2020/11/Dale-portrait-no-background.png"
                        alt="Customer"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                      <img
                        src="https://cdn3.vectorstock.com/i/1000x1000/30/37/man-businessman-cartoon-character-icon-vector-10183037.jpg"
                        alt="Customer"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      Loved by 1,000+ eco-conscious customers
                    </span>
                  </div>
                </div>

                {/* Right content - Featured product image */}
                <div className="hidden md:block relative ml-6">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-100 rounded-full z-0"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-100 rounded-full z-0"></div>

                  <div className="bg-white p-4 rounded-lg shadow-xl rotate-2 z-10 relative">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">
                        <img
                          src="../../public/best.png"
                          alt="Featured eco-friendly product"
                          className="h-6 w-6 rounded-md object-cover"
                        />
                      </span>
                      <span>Featured eco-friendly product</span>
                    </div>
                  </div>

                  <div className="absolute bottom-12 -left-12 bg-white p-3 rounded-lg shadow-lg -rotate-3 z-20">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="bg-green-100 text-green-600 p-1 rounded-full">
                        <img
                          src="../../public/planet-earth.png"
                          alt="100% Sustainable Materials"
                          className="h-6 w-6 rounded-md object-cover"
                        />
                      </span>
                      <span>100% Sustainable Materials</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Featured Collection */}
          <div id="featured" className="mb-16 scroll-mt-24">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-teal-800 relative">
                Featured Products
                <span className="absolute -bottom-2 left-0 w-24 h-1 bg-amber-500"></span>
              </h2>
              <a
                href="/products"
                className="text-teal-700 hover:text-teal-900 transition-colors duration-200 font-medium flex items-center"
              >
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
              </div>
            )}
          </div>

          {/* Values Section */}
          <div className="my-20 py-12 bg-white bg-opacity-70 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-teal-800 mb-12">
              Why Choose Our Products?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-6 transform transition-transform hover:scale-105">
                <div className="bg-teal-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-teal-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-amber-800">
                  Eco-Friendly Materials
                </h3>
                <p className="text-gray-700">
                  All our products are made from sustainable, renewable, or
                  recycled materials.
                </p>
              </div>

              <div className="text-center p-6 transform transition-transform hover:scale-105">
                <div className="bg-teal-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-teal-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2  text-amber-800">
                  Plastic-Free Packaging
                </h3>
                <p className="text-olive-700">
                  We ship all products in biodegradable or recyclable packaging.
                </p>
              </div>

              <div className="text-center p-6 transform transition-transform hover:scale-105">
                <div className="bg-teal-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-teal-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-amber-800">
                  Ethical Production
                </h3>
                <p className="text-olive-700">
                  We work with partners who provide fair wages and safe working
                  conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}

          {/* Footer Section */}
        </div>
      </div>
      <footer className="bg-teal-50 text-gray-700 border-t border-teal-100 w-full">
        <div className="w-full px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold text-teal-800 mb-4">
              EcoGoods
            </h3>
            <p className="text-sm">
              Empowering sustainable living through thoughtfully curated,
              eco-conscious products. Join us in making a greener planet.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-amber-700 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-teal-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-teal-600 transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-teal-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-teal-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-amber-700 mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="hover:text-teal-600 transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-teal-600 transition">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-teal-600 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-teal-600 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-amber-700 mb-3 mr-5">
              Stay in the Loop
            </h4>
            <p className="text-sm mb-3">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="flex flex-col  items-start sm:items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="w-full text-center py-6 border-t border-teal-100 text-sm text-gray-500">
          © {new Date().getFullYear()} EcoGoods. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
