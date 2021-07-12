const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    position: { 
        type: String, 
        required: true 
    },
    access: {
        type: Object,
    }
})

module.exports = model('User', schema)