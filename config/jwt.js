module.exports = {
  JWT_ACCESS_SECRET: process.env.JWT_SECRET || 'word',
  JWT_ACCESS_EXPIRES_IN: '1h',
  SALT_ROUNDS: 10
};
