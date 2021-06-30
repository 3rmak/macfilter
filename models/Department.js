const {Schema, model} = require('mongoose')
const schema = new Schema({
    list: {
        type: Schema.Types.ObjectId,
        ref: "List"
    },
    name: {
        type: String,
        unique: true
    },
    devices: [{
        type: Schema.Types.ObjectId,
        ref: "Device"
    }]
})

module.exports = model('Department', schema)


