const Joi = require('joi');

const departmentCreateValidator = Joi.object({
  name: Joi.string()
    .trim()
    .required(),

  devices: Joi.array(),

  userIdList: Joi.array()
});

const departmentPatchValidator = Joi.object({
  devices: Joi.array()
});

module.exports = {
  departmentCreateValidator,
  departmentPatchValidator
};
