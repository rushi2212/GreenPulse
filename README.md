# ♻ Sustainable eCommerce Platform

A full-stack eCommerce platform promoting *sustainable living* by offering only *recycled* and *upcycled* products. It empowers eco-conscious shoppers with *real-time carbon footprint tracking, a **personalized environmental impact summary, and **gamified features* like leaderboards to encourage responsible consumption.

---

## 🚀 Live Demo


🔗Live Preview: http://greenpulse-45fd.onrender.com/

---

## 🧰 Tech Stack

| Part      | Tech Used                      |
|-----------|--------------------------------|
| Frontend  | React.js, Tailwind CSS / Bootstrap |
| Backend   | Node.js, Express.js            |
| Database  | MongoDB Atlas                  |
| Auth      | JWT, bcrypt                    |
| Hosting   | Vercel (Frontend), Render (Backend) |

---

## 🛠 Core Features

- *🛍 Product Listing:* View only recycled/upcycled products with individual carbon footprints.
- *🛒 Cart System:* Add, update, remove products from a dynamic shopping cart.
- *💳 Payment Gateway:* Secure Razorpay integration for checkout.
- *📦 Order Carbon Summary:* Calculate and display the environmental impact per order.
- *🌍 Global Footprint Tracker:* Dashboard showing total carbon impact of user purchases.
- *🔐 JWT Authentication:* Secure login with protected routes and session management.
- *📱 Mobile Responsive:* Fully optimized for desktop, tablet, and mobile.

---

## 🌟 Bonus Features

- *🥇 Green Leaderboard:* Rank users based on low carbon emissions and eco-friendly shopping.
- *🛠 Admin Dashboard:* Add/manage products, categories, and monitor sustainability stats.


---

## 🗃 Database Schemas (MongoDB)

### 🔹 User Schema

js
{
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean,
  carbonFootprint: Number
}


### 🔹 Product Schema
js
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  isRecycled: Boolean,
  carbonEmission: Number,
  stock: Number
}



### 🔹 Admin Schema
js
{
  userId: ObjectId,
  permissions: [String]
}



### 🔹 Order Schema
js
{
  userId: ObjectId,
  products: [{ productId: ObjectId, quantity: Number }],
  totalAmount: Number,
  totalCarbonEmission: Number,
  paymentStatus: ['pending', 'completed', 'failed'],
  deliveryStatus: ['processing', 'shipped', 'delivered']
}





### 🔹 Cart Schema
js
{
  userId: ObjectId,
  items: [{ productId: ObjectId, quantity: Number }]
}






## 📡 API Endpoints
### 

🛍 Products
GET /api/products – Get all products

🛒 Cart
GET /api/cart – Get cart items
POST /api/cart/add – Add product to cart
PUT /api/cart/update – Update product quantity
DELETE /api/cart/clear – Clear the cart

📦 Orders
POST /api/orders – Place order
GET /api/orders/my-orders – Get user orders
PATCH /api/orders/payment-status – Update payment status

🔐 Users
POST /api/users/register – Register new user
POST /api/users/login – Login user
GET /api/users/profile – Get user profile
PATCH /api/users/update – Update user carbon footprint
GET /api/users/leaderboard – Get user leaderboard

🛠 Admin
GET /api/admin/users – Get all users
POST /api/admin/add-product – Add a product

💳 Payments
POST /api/payment/order – Create Razorpay order
POST /api/payment/verify – Verify Razorpay payment

## 🔐 Authentication
JSON Web Token (JWT) for secure user sessions
Passwords are hashed using bcrypt
Role-based access control (isAdmin)

## 📱 Responsive Design
TailwindCSS/Bootstrap based layout
Fully responsive on mobile, tablet, and desktop



## Installation And Use

### Setup Frontend

terminal
cd frontend
npm i
npm run build


### Setup Backend

terminal
cd backend
npm i
npm run dev



### note 
#### Add .env to backend


PORT=
MONGODB_URI=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
JWT_SECRET=


#### Add .env to frontend


RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

