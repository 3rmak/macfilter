const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../config');

const schema = new Schema({
  department: {
    type: Schema.Types.ObjectId,
    ref: dbTablesEnum.DEPARTMENTS,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  mac: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  allowed: {
    type: Boolean,
    default: false
  },
  comment: {
    type: String
  },
  addingDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = model(dbTablesEnum.DEVICES, schema);
