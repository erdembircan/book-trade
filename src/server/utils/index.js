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

export const writeToWindowGlobal = (pairs) => {
  const temp = [];
  Object.keys(pairs).map((key) => {
    const value = typeof pairs[key] === 'object' ? JSON.stringify(pairs[key]) : pairs[key];
    const preKey = `__${key.toUpperCase()}__`;

    const stringVal = `${preKey}=${value}`;
    temp.push(stringVal);
  });

  return `<script>${temp.join(';')}</script>`;
};
