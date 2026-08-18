const { Product } = require('../models');

async function renderHome(req, res) {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    const storeName = process.env.STORE_NAME || 'Toko Kita';

    res.render('index', {
      products: products.map((p) => p.toJSON()),
      storeName,
    });
  } catch (err) {
    res.status(500).send('Gagal memuat halaman: ' + err.message);
  }
}

function renderAdminLogin(req, res) {
  if (req.session && req.session.adminId) {
    return res.redirect('/admin/dashboard');
  }
  res.render('login', {
    storeName: process.env.STORE_NAME || 'Toko Kita',
  });
}

async function renderAdminDashboard(req, res) {
  if (!req.session || !req.session.adminId) {
    return res.redirect('/admin/login');
  }
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.render('dashboard', {
      products: products.map((p) => p.toJSON()),
      storeName: process.env.STORE_NAME || 'Toko Kita',
    });
  } catch (err) {
    res.status(500).send('Gagal memuat dashboard: ' + err.message);
  }
}

module.exports = { renderHome, renderAdminLogin, renderAdminDashboard };