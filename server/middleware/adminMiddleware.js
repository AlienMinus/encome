import authenticateToken from './authMiddleware.js';

const adminMiddleware = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required.' });
    }
  });
};

export default adminMiddleware;
