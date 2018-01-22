export const checkLength = (min, max) => str => str.length >= min && str.length <= max;

export const writeStoreToSession = (req, data) => {
  if (!req.session.store) req.session.store = {};
  req.session.store = { ...req.session.store, ...data };
};
