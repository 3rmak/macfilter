const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../config');

const OAuthSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbTablesEnum.USERS
    }
}, { timestamps: true });

module.exports = model(dbTablesEnum.OAUTH, OAuthSchema);
