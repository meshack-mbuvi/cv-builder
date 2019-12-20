import Joi from "@hapi/joi";

export function joiValidate(source, schema) {
  return (req, res, next) => {
    const { error } = Joi.validate(req[source], schema, { abortEarly: false });

    if (error) {
      const data = [];

      error.details.forEach(({ message, context: { label } }) => {
        data.push({ [label]: message });
      });
      return res.status(400).json({
        data
      });
    }
    return next();
  };
}
