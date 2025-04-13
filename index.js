const express = require('express');
const app = express();
const path = require("path")
const orderRoutes = require('./orderRoutes');
const adminRoutes = require('./adminRoutes');
const cors = require('cors');
app.use(cors({
  origin: 'https://reactapp.attechdigital.in',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/dist')))
// Route for placing orders via Checkout (POST /orders)
app.use('/orders', orderRoutes);
// Route for fetching orders for the admin page (GET /admin/orders)
app.use('/admin', adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
