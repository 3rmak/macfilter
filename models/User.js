const { Schema, model } = require('mongoose');

const ErrorHandler = require('../errors/ErrorHandler');

const { passwordService } = require('../services');

const {
  dbTablesEnum, defaultAdminCredentials, httpStatusCodes, userRoleEnum
} = require('../config');

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  role: {
    type: String,
    enum: Object.values(userRoleEnum),
    required: true
  },

  access: [{
    type: Schema.Types.ObjectId,
    ref: dbTablesEnum.DEPARTMENTS
  }],

  isActive: {
    type: Boolean,
    default: true,
    required: true
  }
});

const userModel = model(dbTablesEnum.USERS, schema);
const default_admin = {
  email: defaultAdminCredentials.EMAIL,
  role: userRoleEnum.ADMIN,
  access: [],
  password: defaultAdminCredentials.PASSWORD
};

(async () => {
  try {
    const admin = await userModel.findOne({ email: defaultAdminCredentials.EMAIL });
    if (admin) {
      return;
    }

    const hashedPass = await passwordService.hashPass(default_admin.password);
    await userModel.create({ ...default_admin, password: hashedPass });
  } catch (e) {
    throw new ErrorHandler(
      httpStatusCodes.Internal_Server_Error,
      'Во время создания профиля default админа произошла ошибка'
    );
  }
})();

module.exports = userModel;
