const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../config');

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
    required: true
  },

  access: [{
    type: Schema.Types.ObjectId,
    ref: dbTablesEnum.DEPARTMENTS
  }],

  isActive: {
    type: Boolean,
    required: true
  }
});

module.exports = model(dbTablesEnum.USERS, schema);
