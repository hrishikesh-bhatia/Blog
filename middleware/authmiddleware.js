const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


const requireAuth = async (req, res, next) => {
  try {
    
    const { logintoken } = req.cookies;

    
    if (!logintoken) {
      return res.status(401).json({ message: 'No token provided' });
    }

    
    const decoded = jwt.verify(logintoken, JWT_SECRET_KEY);

    // You can optionally attach user info to request
    req.user = decoded;

    // If everything is fine, call next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
module.exports = requireAuth;
