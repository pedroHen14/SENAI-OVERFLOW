const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      ra: Joi.string()
        .required()
        .length(7)
        .pattern(/^[0-9]+$/),
      name: Joi.string().required().min(3).max(255),
      email: Joi.string().email().required().min(3).max(255),
      password: Joi.string().required().min(6).max(255),
    }),
  }),
};
