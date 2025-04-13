// server/adminRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/orders', (req, res) => {
  const sql = `
    SELECT id, name, email, phone, address, city, zip, cart_data, created_at
    FROM orders
    ORDER BY created_at DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: "Failed to fetch orders", details: err.message });
    }
    
    const orders = results.map(order => ({
      customer: {
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        city: order.city,
        zip: order.zip,
        created_at: order.created_at
      },
      products: JSON.parse(order.cart_data)
    }));
    
    res.json(orders);
  });
});

module.exports = router;
