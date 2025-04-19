const express = require('express');
const { addToCart, getCart , updateCartItem ,clearCart} = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.put('/update', authMiddleware, updateCartItem);
router.delete("/clear", authMiddleware, clearCart);


 // 🔥 New route to fetch cart

module.exports = router;
