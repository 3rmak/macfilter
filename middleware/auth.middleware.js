const OAuth = require('../models/OAuth');
const User = require('../models/User');

const ErrorHandler = require('../errors/ErrorHandler');

const { jwtService } = require('../services');

const { httpStatusCodes, userRoleEnum } = require('../config');

module.exports = {
  // find user by token from request header
  findUserByToken: async (req, res, next) => {
    try {
      const token = req.get('Authorization');
      if (!token) {
        throw new ErrorHandler(httpStatusCodes.Bad_Request, 'Запрос без использования токена авторизации. Запрещено');
      }

      await jwtService.verifyUserToken(token);

      const dbToken = await OAuth.findOne({ token });
      if (!dbToken) {
        throw new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad token');
      }

      const user = await User.findById(dbToken.user);
      if (!user) {
        throw new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad token');
      }

      req.locals = {
        ...req.locals,
        token: dbToken,
        user
      };

      next();
    } catch (e) {
      next(e);
    }
  },

  hasUserRoleAccess: (allowedAccessForRoles = [userRoleEnum.ADMIN]) => (req, res, next) => {
    try {
      const { user } = req.locals;

      if (!allowedAccessForRoles.includes(user.role)) {
        throw new ErrorHandler(httpStatusCodes.Unauthorized, 'Недостаточно полномочий');
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
