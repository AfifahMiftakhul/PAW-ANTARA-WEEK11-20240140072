require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const pageRoutes = require('./routes/page.routes');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecretkey_toko_roti',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // Session berlaku 2 jam
      secure: false, // Set true jika menggunakan HTTPS
    },
  })
);

// Register Routes
app.use('/', pageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', authRoutes);

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});