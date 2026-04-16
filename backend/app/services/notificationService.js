// In-memory preferences
const userPreferences = new Map();

export const initializePreferences = (userId) => {
  if (!userPreferences.has(userId)) {
    userPreferences.set(userId, {
      emailMarketing: true,
      smsMarketing: false,
      orderUpdates: true,
      promotions: true
    });
  }
  return userPreferences.get(userId);
};

export const getPreferences = (userId) => {
  return initializePreferences(userId);
};

export const updatePreferences = (userId, newPrefs) => {
  const current = initializePreferences(userId);
  const updated = { ...current, ...newPrefs };
  userPreferences.set(userId, updated);
  return updated;
};

export const sendNotification = (userId, type, message) => {
  const prefs = initializePreferences(userId);

  // Mock sending logic
  console.log(`[NOTIFICATION] Attempting to send ${type} to user ${userId}`);

  if (type === 'marketing_email' && !prefs.emailMarketing) {
    console.log(`[NOTIFICATION] Suppressed marketing_email for ${userId} due to preferences.`);
    return false;
  }

  if (type === 'marketing_sms' && !prefs.smsMarketing) {
    console.log(`[NOTIFICATION] Suppressed marketing_sms for ${userId} due to preferences.`);
    return false;
  }

  // Record mock notification
  console.log(`[NOTIFICATION] SENT: [${type}] ${message}`);
  return true;
};
