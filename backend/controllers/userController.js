const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, isAdmin = false, carbonFootprint = 0 } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    // const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = new User({
      name,
      email,
      password,
      isAdmin,
      carbonFootprint,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        carbonFootprint: user.carbonFootprint,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    console.log('Password:', password);
console.log('Stored Hashed Password:', user.password);
console.log('Match:', await bcrypt.compare(password, user.password));


    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        carbonFootprint: user.carbonFootprint,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// userController.js


exports.logoutUser = (req, res) => {
  // Since JWT is stateless, no need to remove or invalidate anything on the server.
  // Typically, we rely on the client to remove the token on logout.

  res.status(200).json({ message: 'Logged out successfully' });
};

