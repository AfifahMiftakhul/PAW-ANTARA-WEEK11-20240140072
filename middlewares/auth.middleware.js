function requireAdmin(req, res, next) {
  if (req.session && req.session.adminId) {
    return next();
  }

  if (req.xhr || req.headers.accept?.includes('json') || req.path.startsWith('/api/')) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak. Silakan login terlebih dahulu.',
    });
  }

  res.redirect('/admin/login');
}

module.exports = { requireAdmin };