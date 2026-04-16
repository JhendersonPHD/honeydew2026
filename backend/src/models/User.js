// In-memory array to simulate database for this mock
export const users = [];

export const UserModel = {
  findByEmail: (email) => users.find(u => u.email === email),

  findById: (id) => users.find(u => u.id === id),

  create: (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      failed_login_attempts: 0,
      locked_until: null,
      refresh_token: null,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  update: (id, updates) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      return users[userIndex];
    }
    return null;
  },

  incrementFailedLogin: (id) => {
    const user = UserModel.findById(id);
    if (user) {
      user.failed_login_attempts += 1;
      if (user.failed_login_attempts >= 5) {
        // Lock for 15 minutes
        user.locked_until = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      }
      return user;
    }
    return null;
  },

  resetFailedLogin: (id) => {
    return UserModel.update(id, { failed_login_attempts: 0, locked_until: null });
  },

  isLocked: (user) => {
    if (user.locked_until) {
      const lockTime = new Date(user.locked_until);
      if (lockTime > new Date()) {
        return true;
      }
      // Lock expired, reset
      UserModel.resetFailedLogin(user.id);
    }
    return false;
  }
};
