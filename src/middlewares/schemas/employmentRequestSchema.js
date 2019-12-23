import Joi from '@hapi/joi';

export const employmentRequestSchema = Joi.object().keys({
  title: Joi.string()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty') {
          return { message: 'title field should not be empty' };
        }
        return { message: 'title is a required field' };
      });
    }),
  employer: Joi.string()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty') {
          return { message: 'employer field should not be empty' };
        }
        return { message: 'employer is a required field' };
      });
    }),
  city: Joi.string()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty') {
          return { message: 'city field should not be empty' };
        }
        return { message: 'city is a required field' };
      });
    }),
  startDate: Joi.string()
    .required()
    .trim()
    .error(err => {
      return err.map(({ type }) => {
        if (type === 'any.empty') {
          return {
            message: 'startDate should be in the format yyyy-mm-dd',
          };
        }
        return { message: 'startDate is a required field' };
      });
    }),
  endDate: Joi.string()
    .trim()
    .error(err => {
      return err.map(() => {
        return { message: 'endDate should be in the format yyyy-mm-dd' };
      });
    }),
  description: Joi.string().error(err => {
    return err.map(() => {
      return {
        message: 'description field should not be empty',
      };
    });
  }),
});
