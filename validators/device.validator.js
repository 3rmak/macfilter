const Joi = require('joi');

const { deviceTypesEnum, regexp } = require('../config');

const createDeviceValidator = Joi.object({
  department: Joi.string()
    .trim()
    .required()
    .lowercase(),

  type: Joi.string()
    .trim()
    .allow(...Object.values(deviceTypesEnum))
    .required(),

  owner: Joi.string()
    .trim()
    .required(),

  mac: Joi.string()
    .lowercase()
    .trim()
    .regex(regexp.MAC_ADR_REGEXP)
    .required(),

  allowed: Joi.boolean(),

  comment: Joi.string()
    .trim()
});

module.exports = {
  createDeviceValidator
};
