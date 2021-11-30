const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../config');

const schema = new Schema({
  name: {
    type: String,
    unique: true
  },

  devices: [{
    type: Schema.Types.ObjectId,
    ref: dbTablesEnum.DEVICES
  }]
});

module.exports = model(dbTablesEnum.DEPARTMENTS, schema);
