const whitelist = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(';') : [];

module.exports = {
  CORS_WHITELIST: whitelist
};
