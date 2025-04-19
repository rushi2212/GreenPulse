const express = require('express');
const { addProduct , getAllUsers} = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/add-product', authMiddleware, adminMiddleware, addProduct);

router.get('/users',authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;
