const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => {
  const { name, email, phone, address, city, zip, cartItems } = req.body;

  if (!cartItems || !cartItems.length) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  // Insert the customer data and cart items (as JSON)
  const sql = `
    INSERT INTO orders (name, email, phone, address, city, zip, cart_data, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  const values = [name, email, phone, address, city, zip, JSON.stringify(cartItems)];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ MySQL Error:', err); // <--- ADD THIS
      return res.status(500).json({ error: "Failed to save order", details: err.message });
    }
  
    res.status(201).json({ message: "Order placed successfully", orderId: result.insertId });
  });
  
});

module.exports = router;
