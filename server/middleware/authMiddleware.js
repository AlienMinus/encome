import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming you might need user details

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    req.user = null; // Explicitly set req.user to null for guest users
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Fetch the user from the database to ensure they still exist and get full details
    const user = await User.findById(decoded.id).select('-passwords'); // Exclude password hashes
    
    if (!user) {
      return res.status(403).json({ message: 'User not found or invalid token.' });
    }
    
    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Try Log Out and Log In again.' });
    }
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

export default authenticateToken;