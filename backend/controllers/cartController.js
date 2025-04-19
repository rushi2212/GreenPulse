const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  const { items } = req.body;
  const userId = req.user.userId; // Extracted from the JWT middleware

  try {
    let cart = await Cart.findOne({ userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Loop through each item in the request body and push it to the cart
    for (const item of items) {
      const { productId, quantity } = item;

      if (!productId) {
        return res
          .status(400)
          .json({ message: "Product ID is required for each item." });
      }

      const existingProduct = cart.items.find(
        (cartItem) => cartItem.productId?.toString() === productId.toString()
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    // Save the updated cart
    await cart.save();

    // Send the updated cart in the response
    res.status(201).json(cart);
  } catch (error) {
    console.error(error); // Log error to the console for debugging
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  const { items } = req.body;
  const userId = req.user.userId;

  console.log(items);

  // ✅ Validate that items is an array
  if (!Array.isArray(items)) {
    return res
      .status(400)
      .json({ message: "Invalid request: items should be an array." });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    for (const item of items) {
      const { productId, quantity, action } = item;

      if (!productId) {
        return res
          .status(400)
          .json({ message: "Product ID is required for each item." });
      }

      // If the action is 'delete', remove the item from the cart
      // If the action is 'delete', remove the item from the cart
      if (action === "delete") {
        const itemIndex = cart.items.findIndex(
          (cartItem) =>
            cartItem.productId && cartItem.productId.equals(productId) // Use .equals() for ObjectId comparison
        );

        if (itemIndex !== -1) {
          cart.items.splice(itemIndex, 1); // Remove the item from the array
        } else {
          return res
            .status(404)
            .json({ message: "Item not found in the cart" });
        }
      }

      // If the action is 'update', update the quantity of the item
      else if (action === "update") {
        if (quantity <= 0) {
          return res
            .status(400)
            .json({ message: "Quantity must be greater than 0." });
        }

        const existingItem = cart.items.find(
          (cartItem) => cartItem.productId?.toString() === productId.toString()
        );

        if (existingItem) {
          existingItem.quantity = quantity;
        } else {
          cart.items.push({ productId, quantity });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Invalid action. Use 'update' or 'delete'." });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: "Failed to clear cart." });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  clearCart
};
