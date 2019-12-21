import Joi from '@hapi/joi';

export const loginRequestSchema = Joi.object().keys({
  password: Joi.string()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty') {
          return { message: 'password field should not be empty' };
        }
        return { message: 'password is a required field' };
      });
    }),
  email: Joi.string()
    .email()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty' || type === 'string.email') {
          return { message: 'email must be in the form example@domain.com' };
        }
        return { message: 'email is a required field' };
      });
    }),
});
