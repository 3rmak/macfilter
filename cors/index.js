const { cors: { CORS_WHITELIST }, httpStatusCodes } = require('../config');

const ErrorHandler = require('../errors/ErrorHandler');

const corsOptions = {
  origin(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new ErrorHandler(httpStatusCodes.Bad_Gateway, 'Not allowed by CORS'));
    }
  }
};

module.exports = {
  corsOptions
};
