import express from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { UserModel } from '../models/User.js';
import { generateTokens, verifyRefreshToken } from '../services/tokenService.js';
import { validatePasswordStrength, auditLog } from '../utils/security.js';
import { validate } from '../middleware/validators.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// --- Validation Schemas ---

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string().optional(),
  last_name: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const passwordResetSchema = z.object({
  email: z.string().email(),
  new_password: z.string().min(8)
});

// --- Helper Functions ---

const setTokenCookies = (res, accessToken, refreshToken) => {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

const clearTokenCookies = (res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
};

// --- Routes ---

router.post('/register', authLimiter, validate(registerSchema), async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!validatePasswordStrength(password)) {
    return res.status(400).json({ error: 'Password does not meet strength requirements' });
  }

  const existing = UserModel.findByEmail(email);
  if (existing) {
    auditLog('REGISTER_FAILURE_EMAIL_EXISTS', null, req.ip, { email });
    return res.status(409).json({ error: 'Email already registered' });
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = UserModel.create({
    email,
    password_hash,
    first_name: first_name || '',
    last_name: last_name || '',
    is_admin: false
  });

  const { accessToken, refreshToken } = generateTokens(user);
  UserModel.update(user.id, { refresh_token: refreshToken });

  setTokenCookies(res, accessToken, refreshToken);

  auditLog('USER_REGISTERED', user.id, req.ip, { email });

  res.json({
    user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name }
  });
});

router.post('/login', authLimiter, validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = UserModel.findByEmail(email);

  if (!user) {
    auditLog('LOGIN_FAILURE_NOT_FOUND', null, req.ip, { email });
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (UserModel.isLocked(user)) {
    auditLog('LOGIN_FAILURE_LOCKED', user.id, req.ip, { email });
    return res.status(423).json({ error: 'Account locked due to too many failed attempts' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    UserModel.incrementFailedLogin(user.id);
    auditLog('LOGIN_FAILURE_INVALID_PASSWORD', user.id, req.ip, { email });
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  UserModel.resetFailedLogin(user.id);

  const { accessToken, refreshToken } = generateTokens(user);
  UserModel.update(user.id, { refresh_token: refreshToken });

  setTokenCookies(res, accessToken, refreshToken);

  auditLog('USER_LOGGED_IN', user.id, req.ip, { email });

  res.json({
    user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name }
  });
});

router.post('/logout', authenticate, (req, res) => {
  const userId = req.user.id;
  UserModel.update(userId, { refresh_token: null });
  clearTokenCookies(res);
  auditLog('USER_LOGGED_OUT', userId, req.ip);
  res.json({ message: 'Logged out successfully' });
});

router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token provided' });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  const user = UserModel.findById(decoded.id);
  if (!user || user.refresh_token !== refreshToken) {
    return res.status(401).json({ error: 'Token revoked or invalid' });
  }

  const tokens = generateTokens(user);
  UserModel.update(user.id, { refresh_token: tokens.refreshToken });

  setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

  auditLog('TOKEN_REFRESHED', user.id, req.ip);
  res.json({ message: 'Token refreshed successfully' });
});

router.post('/reset-password', authLimiter, validate(passwordResetSchema), async (req, res) => {
  // In a real app, this would involve emailing a secure link
  // For this mock, we'll allow direct reset with just the email
  const { email, new_password } = req.body;

  if (!validatePasswordStrength(new_password)) {
    return res.status(400).json({ error: 'Password does not meet strength requirements' });
  }

  const user = UserModel.findByEmail(email);
  if (!user) {
    // Avoid user enumeration
    return res.json({ message: 'If the email exists, a password reset link has been sent.' });
  }

  const password_hash = await bcrypt.hash(new_password, 10);
  UserModel.update(user.id, { password_hash, refresh_token: null }); // Invalidate sessions

  auditLog('PASSWORD_RESET', user.id, req.ip);
  res.json({ message: 'Password reset successful' });
});

router.get('/me', authenticate, (req, res) => {
  const user = UserModel.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, is_admin: user.is_admin });
});

export default router;
