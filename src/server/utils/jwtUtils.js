import jwt from 'jsonwebtoken';

export const sign = (data, pass) => {
  const payload = { sub: data };

  const token = jwt.sign(payload, pass);
  return token;
};

export const verify = (token, pass) =>
  new Promise((res, rej) => {
    jwt.verify(token, pass, (err, decoded) => {
      if (err) return rej(new Error('Authorization failed'));

      const data = decoded.sub;
      return res(data);
    });
  });
