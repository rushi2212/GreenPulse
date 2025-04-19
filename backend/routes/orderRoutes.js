const express = require('express');
const { createOrder , updatePaymentStatus,getUserOrders} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/', authMiddleware, createOrder);

router.patch('/payment-status', authMiddleware, updatePaymentStatus);
router.get('/my-orders', authMiddleware, getUserOrders);


module.exports = router;
