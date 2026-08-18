// Menggunakan kredensial dari .env atau fallback default jika belum diatur
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Simpan session
      req.session.adminId = 'admin_session_active';
      return res.json({ success: true, message: 'Login berhasil' });
    }

    return res.status(401).json({
      success: false,
      message: 'Username atau password salah',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server: ' + err.message,
    });
  }
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Gagal logout',
      });
    }
    res.clearCookie('connect.sid'); // Hapus cookie session Express
    return res.json({ success: true, message: 'Logout berhasil' });
  });
}

module.exports = { login, logout };