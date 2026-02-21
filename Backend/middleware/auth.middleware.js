import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token missing
  if (!authHeader) {
    return res.status(401).json({
      message: 'Access denied. Token missing'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, department }
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Session expired or invalid token'
    });
  }
};
