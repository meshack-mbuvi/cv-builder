import Joi from '@hapi/joi';

export const signupRequestSchema = Joi.object().keys({
  firstName: Joi.string()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty') {
          return { message: 'firstName field should not be empty' };
        }
        return { message: 'firstName is a required field' };
      });
    }),
  lastName: Joi.string()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty') {
          return { message: 'lastName field should not be empty' };
        }
        return { message: 'lastName is a required field' };
      });
    }),
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
  confirmPassword: Joi.string()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty') {
          return {
            message: 'confirmPassword field should not be empty',
          };
        }
        return { message: 'confirmPassword is a required field' };
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
