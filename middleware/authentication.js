//
// middleware/authentication.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'oneRingToRuleThemAll';

const authenticateToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header missing.' });
  }

  const [bearer, token] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid authorization header format.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    req.user = decodedToken;
    next();
  });
};

module.exports = authenticateToken;
