const messageCookie = (req, res, next) => {
  if (!req.cookies['m']) {
    res.cookie('m', '', { maxAge: 30 * 24 * 60 * 60 * 1000 });
  }

  next();
};

export default messageCookie;
