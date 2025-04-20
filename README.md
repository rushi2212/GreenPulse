# ♻ Sustainable eCommerce Platform

A full-stack eCommerce platform promoting *sustainable living* by offering only **recycled** and **upcycled** products. It empowers eco-conscious shoppers with **real-time carbon footprint tracking**, a **personalized environmental impact summary**, and **gamified features** like leaderboards to encourage responsible consumption.

---

## 🚀 Live Demo

🔗 [Live Preview](http://greenpulse-45fd.onrender.com/)

---

## 🧰 Tech Stack

| Part      | Tech Used                          |
|-----------|------------------------------------|
| Frontend  | React.js, Tailwind CSS / Bootstrap |
| Backend   | Node.js, Express.js                |
| Database  | MongoDB Atlas                      |
| Auth      | JWT, bcrypt                        |
| Hosting   | Vercel (Frontend), Render (Backend)|

---

## 🛠 Core Features

- 🛍 **Product Listing:** View only recycled/upcycled products with individual carbon footprints.
- 🛒 **Cart System:** Add, update, and remove products from a dynamic shopping cart.
- 💳 **Payment Gateway:** Secure Razorpay integration for smooth checkout.
- 📦 **Order Carbon Summary:** Display environmental impact per order.
- 🌍 **Global Footprint Tracker:** Dashboard showing the total carbon impact of purchases.
- 🔐 **JWT Authentication:** Secure login with protected routes and session management.
- 📱 **Mobile Responsive:** Optimized for desktop, tablet, and mobile devices.

---

## 🌟 Bonus Features

- 🥇 **Green Leaderboard:** Rank users based on low carbon emissions and eco-friendly shopping.
- 🛠 **Admin Dashboard:** Manage products, categories, and monitor sustainability metrics.

---

## 🗃 Database Schemas (MongoDB)

### 🔹 User Schema

```js
{
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean,
  carbonFootprint: Number
}
```

### 🔹 Product Schema

```js
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
```

### 🔹 Admin Schema

```js
{
  userId: ObjectId,
  permissions: [String]
}
```

### 🔹 Order Schema

```js
{
  userId: ObjectId,
  products: [{ productId: ObjectId, quantity: Number }],
  totalAmount: Number,
  totalCarbonEmission: Number,
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'] },
  deliveryStatus: { type: String, enum: ['processing', 'shipped', 'delivered'] }
}
```

### 🔹 Cart Schema

```js
{
  userId: ObjectId,
  items: [{ productId: ObjectId, quantity: Number }]
}
```

---

## 📡 API Endpoints

### 🛍 Products
- `GET /api/products` – Get all products

### 🛒 Cart
- `GET /api/cart` – Get cart items  
- `POST /api/cart/add` – Add product to cart  
- `PUT /api/cart/update` – Update product quantity  
- `DELETE /api/cart/clear` – Clear the cart  

### 📦 Orders
- `POST /api/orders` – Place order  
- `GET /api/orders/my-orders` – Get user orders  
- `PATCH /api/orders/payment-status` – Update payment status  

### 🔐 Users
- `POST /api/users/register` – Register new user  
- `POST /api/users/login` – Login user  
- `GET /api/users/profile` – Get user profile  
- `PATCH /api/users/update` – Update user carbon footprint  
- `GET /api/users/leaderboard` – Get user leaderboard  

### 🛠 Admin
- `GET /api/admin/users` – Get all users  
- `POST /api/admin/add-product` – Add a product  

### 💳 Payments
- `POST /api/payment/order` – Create Razorpay order  
- `POST /api/payment/verify` – Verify Razorpay payment  

---

## 🔐 Authentication

- JSON Web Token (JWT) for secure user sessions  
- Passwords are hashed using bcrypt  
- Role-based access control using `isAdmin` field  

---

## 📱 Responsive Design

- TailwindCSS/Bootstrap based layout  
- Fully responsive on mobile, tablet, and desktop  

---

## 🛠 Installation and Usage

### 📦 Setup Frontend

```bash
cd frontend
npm install
npm run build
```

### 🔧 Setup Backend

```bash
cd backend
npm install
npm run dev
```

### 📁 Environment Variables

#### Backend `.env`

```
PORT=
MONGODB_URI=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
JWT_SECRET=
```

#### Frontend `.env`

```
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

Made with ❤️ for a greener future.