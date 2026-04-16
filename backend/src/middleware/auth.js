import { verifyAccessToken } from '../services/tokenService.js';
import { auditLog } from '../utils/security.js';

export const authenticate = (req, res, next) => {
  // Check for token in cookies first, then Authorization header
  let token = req.cookies?.access_token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    auditLog('AUTH_FAILURE_NO_TOKEN', null, req.ip, { path: req.path });
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    auditLog('AUTH_FAILURE_INVALID_TOKEN', null, req.ip, { path: req.path });
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  req.user = decoded;
  next();
};
