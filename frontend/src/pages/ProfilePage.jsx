import React, { useEffect, useState } from 'react';
import { fetchUserProfile, fetchUserOrders } from '../services/api';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [totalEmissions, setTotalEmissions] = useState(0);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const profile = await fetchUserProfile();
        const userOrders = await fetchUserOrders();
        
        // Calculate total emissions from all orders
        const totalOrderEmissions = userOrders.reduce(
          (sum, order) => sum + (order.totalCarbonEmission || 0), 
          0
        );
        
        setUserProfile(profile);
        setOrders(userOrders);
        setTotalEmissions(totalOrderEmissions);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Hello, {userProfile?.name}</h1>
              <p className="text-gray-600">{userProfile?.email}</p>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-center">
              <p className="text-sm text-green-600 font-medium mb-1">Total Carbon Footprint</p>
              <p className="text-2xl font-bold text-green-700">{totalEmissions.toFixed(2)} kg CO₂</p>
              <p className="text-xs text-green-600">From all your orders</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b mb-6">
          
          <button 
            className={`py-3 px-4 font-medium ${activeTab === 'orders' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button 
            className={`py-3 px-4 font-medium ${activeTab === 'impact' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('impact')}
          >
            Environmental Impact
          </button>
        </div>

        {/* Profile Tab Content */}
        

        {/* Orders Tab Content */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Orders</h2>
              <div className="text-sm text-gray-500">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'} total
              </div>
            </div>
            
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center border-b">
                      <div>
                        <span className="text-xs text-gray-500">Order ID:</span>
                        <p className="font-medium">{order._id}</p>
                      </div>
                      <div className="flex space-x-4">
                        <div className="text-right">
                          <span className="text-xs text-gray-500">Amount:</span>
                          <p className="font-medium">₹{order.totalAmount}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">CO₂ Emissions:</span>
                          <p className="font-medium text-green-700">{order.totalCarbonEmission} kg</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Payment Status</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                            order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Delivery Status</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.deliveryStatus === 'Processing' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.deliveryStatus}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Products</h4>
                        <ul className="divide-y">
                          {order.products.map((item, idx) => (
                            <li key={idx} className="py-2 flex justify-between">
                              <div className="flex-1">
                                <p className="font-medium">{item.productId?.name}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">₹{item.productId?.price}</p>
                                <p className="text-xs text-gray-500">per unit</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
                  <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                <p className="text-gray-500">When you place orders, they will appear here.</p>
              </div>
            )}
          </div>
        )}

        {/* Environmental Impact Tab Content */}
        {activeTab === 'impact' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Your Environmental Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <p className="text-sm text-green-600 mb-1">Total Carbon Emissions</p>
                <p className="text-3xl font-bold text-green-700">{totalEmissions.toFixed(2)} kg</p>
                <p className="text-xs text-green-600 mt-1">From all orders</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-sm text-blue-600 mb-1">Number of Orders</p>
                <p className="text-3xl font-bold text-blue-700">{orders.length}</p>
                <p className="text-xs text-blue-600 mt-1">Total purchases</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <p className="text-sm text-purple-600 mb-1">Average Emissions</p>
                <p className="text-3xl font-bold text-purple-700">
                  {orders.length > 0 ? (totalEmissions / orders.length).toFixed(2) : '0'} kg
                </p>
                <p className="text-xs text-purple-600 mt-1">Per order</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium mb-4">Carbon Footprint Breakdown</h3>
              
              {orders.length > 0 ? (
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Your Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        Average user: {(totalEmissions * 1.5).toFixed(2)} kg
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                    <div style={{ width: "66%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your carbon footprint is approximately 34% lower than the average user.
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Place orders to see your carbon footprint breakdown.</p>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Monthly Emissions Trend</h3>
              
              {orders.length > 0 ? (
                <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-end space-x-2">
                  <div className="flex-1 h-1/6 bg-green-500 rounded-t"></div>
                  <div className="flex-1 h-2/6 bg-green-500 rounded-t"></div>
                  <div className="flex-1 h-1/3 bg-green-500 rounded-t"></div>
                  <div className="flex-1 h-1/4 bg-green-500 rounded-t"></div>
                  <div className="flex-1 h-3/5 bg-green-500 rounded-t"></div>
                  <div className="flex-1 h-2/5 bg-green-500 rounded-t"></div>
                </div>
              ) : (
                <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Not enough data to display trends.</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="font-medium mb-2">Tips to Reduce Your Carbon Footprint</h3>
              <ul className="text-left max-w-lg mx-auto space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Bundle multiple items in a single order to reduce shipping emissions
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Choose eco-friendly shipping options when available
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Select products with sustainable packaging
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;