// middleware/authorization.js

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.role || !req.user.role.includes('admin')) {
    return res.status(401).json({ error: 'Unauthorized: Admin access required.' });
  }
  next();
};

module.exports = isAdmin;