export const validatePasswordStrength = (password) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const auditLog = (event, userId, ip, details = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    userId: userId || 'anonymous',
    ip: ip || 'unknown',
    ...details
  };
  // In a real app, write to a file or database
  console.log(`[AUDIT] ${JSON.stringify(logEntry)}`);
};
