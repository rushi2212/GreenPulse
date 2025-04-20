const Product = require('../models/productModel');

exports.addProduct = async (req, res) => {
  const { 
    name, 
    description, 
    price, 
    category, 
    image, 
    isRecycled, 
    carbonEmission, 
    stock 
  } = req.body;

  try {
    // Create a new product based on the request body and the schema model
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      isRecycled: isRecycled !== undefined ? isRecycled : true, // Default to true if not provided
      carbonEmission,
      stock: stock || 0, // Default to 0 if not provided
    });

    // Save the new product to the database
    await newProduct.save();

    // Send the newly created product as a response
    res.status(201).json(newProduct);
  } catch (error) {
    // Handle any error that occurs during the product creation
    res.status(500).json({ message: error.message });
  }
};

const User = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
