const express = require('express');
const { addProduct , getAllUsers , updateProduct , deleteProduct} = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/add-product', authMiddleware, adminMiddleware, addProduct);

router.get('/users',authMiddleware, adminMiddleware, getAllUsers);
router.delete('/delete-product/:id', authMiddleware, adminMiddleware,deleteProduct);
router.put('/update-product/:id', authMiddleware, adminMiddleware, updateProduct);

module.exports = router;
