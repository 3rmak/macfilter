const Joi = require('joi');

const { userRoleEnum, regexp } = require('../config');

const userCreateValidator = Joi.object({
  email: Joi.string()
    .email({
      tlds: {
        allow: [
          'com',
          'net',
          'ua'
        ]
      }
    })
    .required()
    .lowercase()
    .trim(),

  role: Joi.string()
    .allow(...Object.values(userRoleEnum))
    .required(),

  access: Joi.array(),

  password: Joi.string()
    .trim()
    .required()
    .regex(regexp.PASS_REGEXP)
});

const userPatchValidator = Joi.object({
  role: Joi.string()
    .allow(...Object.values(userRoleEnum)),

  access: Joi.array(),

  password: Joi.string()
    .trim()
    .regex(regexp.PASS_REGEXP),

});

module.exports = {
  userCreateValidator,
  userPatchValidator
};
