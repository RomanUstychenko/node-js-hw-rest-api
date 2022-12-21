const Joi = require("joi");

const updateFavoriteScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = updateFavoriteScheme;
