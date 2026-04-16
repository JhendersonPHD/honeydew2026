import * as authService from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.json(result);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.json(result);
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  res.json(user);
});