const express = require('express');
const router = express.Router();

const { registerUser, loginUser ,getUserProfile,updateCarbonEmission , getGreenLeaderboard } = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.patch('/update', authMiddleware,updateCarbonEmission);
router.get('/leaderboard', getGreenLeaderboard);



module.exports = router;
