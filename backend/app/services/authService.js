import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/mockData.js';
import ApiError from '../utils/ApiError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'honeydew-dev-secret-2026';

export const registerUser = async (userData) => {
  const { email, password, first_name, last_name } = userData;
  if (!email || !password) {
    throw new ApiError(400, 'Email and password required');
  }
  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new ApiError(409, 'Email already registered');
  }
  const password_hash = await bcrypt.hash(password, 10);
  const user = {
    id: users.length + 1,
    email,
    password_hash,
    first_name: first_name || '',
    last_name: last_name || '',
    is_admin: false,
    created_at: new Date().toISOString(),
  };
  users.push(user);
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  });
  return {
    access_token: token,
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  };
};

export const loginUser = async (email, password) => {
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  });
  return {
    access_token: token,
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  };
};

export const getUserById = async (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) throw new ApiError(404, 'User not found');
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    is_admin: user.is_admin,
  };
};