const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
// const leaderboardRoutes = require('./routes/greenLeaderboard');

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://greenpulse-45fd.onrender.com'
// ];

// ({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true // if you're using cookies/auth
// })
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
// app.use('/api/leaderboard', leaderboardRoutes);

// Serve frontend from ../frontend/dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
