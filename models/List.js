const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  }
});

module.exports = model('List', schema);
