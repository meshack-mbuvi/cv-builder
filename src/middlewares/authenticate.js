import jwt from 'jsonwebtoken';

export const authenticate = (request, response, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = request.query['user-key'] || request.headers['user-key'];

  if (token && token.split(' ')[0] === 'Bearer') {
    jwt.verify(token.split(' ')[1], secretKey, (error, user) => {
      if (error) {
        return response.status(401).send({
          error: {
            status: 401,
            message: 'Invalid authorization token',
          },
        });
      }

      // User is authenticated
      request['user'] = user;
      return next();
    });
  } else {
    return response.status(401).send({
      error: {
        status: 401,
        message: 'Missing authorization token',
      },
    });
  }
};
