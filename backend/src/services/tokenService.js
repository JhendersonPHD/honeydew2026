import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'honeydew-dev-secret-2026';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'honeydew-refresh-secret-2026';

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, is_admin: user.is_admin },
    JWT_SECRET,
    { expiresIn: '15m' } // Short lived access token
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: '7d' } // Long lived refresh token
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};
