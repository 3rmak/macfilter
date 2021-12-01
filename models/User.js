const { Schema, model } = require('mongoose');

const { dbTablesEnum, userRoleEnum } = require('../config');

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

module.exports = model(dbTablesEnum.USERS, schema);
