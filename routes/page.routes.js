const express = require('express');
const router = express.Router();
const {
  renderHome,
  renderAdminLogin,
  renderAdminDashboard,
} = require('../controllers/page.controller');

router.get('/', renderHome);
router.get('/admin/login', renderAdminLogin);
router.get('/admin/dashboard', renderAdminDashboard);

module.exports = router;