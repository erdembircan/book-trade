export const checkLength = (min, max) => str => str.length >= min && str.length <= max;

export const writeStoreToSession = (req, data) => {
  if (!req.session.store) req.session.store = {};
  req.session.store = { ...req.session.store, ...data };
};

export const flashWrite = (req, key, value) => {
  req.session[key] = value;
};

export const flashRead = (req, key) => {
  const message = req.session[key];

  req.session[key] = undefined;

  return message;
};

export const storeNotification = (req, key) => {
  const notification = flashRead(req, key);

  return { utils: { notifications: { message: notification } } };
};

export const sanitizeSessionStore = (req, sa) => {
  req.session.store = { ...req.session.store, ...sa };
};
