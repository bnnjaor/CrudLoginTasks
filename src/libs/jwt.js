import jwt from 'jsonwebtoken'

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d", //Expira en 1 dia
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
