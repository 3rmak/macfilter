const bcrypt = require('bcrypt');

const { jwtConfig } = require('../config');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  hashPass: (password) => bcrypt.hash(password, jwtConfig.SALT_ROUNDS),
  isPassMatches: async (password, hashedPass) => {
    try {
      const isMatch = await bcrypt.compare(password, hashedPass);

      if (!isMatch) {
        throw new Error('Email or password is wrong');
      }
    } catch (error) {
      throw new ErrorHandler(400, error.message);
    }
  }
};
