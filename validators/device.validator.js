const Joi = require('joi');

const { deviceTypesEnum, regexp } = require('../config');

const createDeviceValidator = Joi.object({
  department: Joi.string()
    .trim()
    .lowercase()
    .regex(regexp.MONGO_OBJECTID)
    .required(),

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

const patchSingleDeviceValidator = Joi.object({
  department: Joi.string()
    .trim()
    .lowercase()
    .regex(regexp.MONGO_OBJECTID)
    .required(),

  type: Joi.string()
    .trim()
    .allow(...Object.values(deviceTypesEnum)),

  owner: Joi.string()
    .trim(),

  allowed: Joi.boolean(),

  comment: Joi.string()
    .trim()
});

const _singleDevice = Joi.object({
  _id: Joi.string()
    .trim()
    .required(),

  department: Joi.string()
    .trim()
    .lowercase()
    .regex(regexp.MONGO_OBJECTID)
    .required(),

  allowed: Joi.boolean()
    .required()
});

const patchMultipleDeviceValidator = Joi.array().items(_singleDevice);

module.exports = {
  createDeviceValidator,
  patchSingleDeviceValidator,
  patchMultipleDeviceValidator
};
