const OAuth = require('../models/OAuth');
const User = require('../models/User');

const ErrorHandler = require('../errors/ErrorHandler');

const { jwtService, passwordService } = require('../services');

const { httpStatusCodes, userRoleEnum } = require('../config');

module.exports = {
  // find user by token from request header
  findUserByToken: async (req, res, next) => {
    try {
      const token = req.get('Authorization');
      if (!token) {
        next(new ErrorHandler(httpStatusCodes.Bad_Request, 'Запрос без использования токена авторизации. Запрещено'));
      }

      await jwtService.verifyUserToken(token);

      const dbToken = await OAuth.findOne({ token });
      if (!dbToken) {
        next(new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad token'));
      }

      const user = await User.findById(dbToken.user);
      if (!user) {
        next(new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad token'));
      }

      if (!user.isActive) {
        next(new ErrorHandler(httpStatusCodes.Unauthorized, 'Пользователь не активен. Обратитесь к администратору'));
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
        next(new ErrorHandler(httpStatusCodes.Unauthorized, 'Недостаточно полномочий'));
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  basicAuth: async (req, res, next) => {
    try {
      if (req.headers.authorization.indexOf('Basic ') === -1) {
        next(new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad token'));
      }

      const base64Credentials = req.get('Authorization').split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [
        email,
        password
      ] = credentials.split(':');

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        next(new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad token'));
      }

      if (!user.isActive) {
        next(new ErrorHandler(httpStatusCodes.Unauthorized, 'Пользователь не активен. Обратитесь к администратору'));
      }

      await passwordService.isPassMatches(password, user.password);

      req.locals = {
        ...req.locals,
        user
      };

      next();
    } catch (e) {
      next(e);
    }
  }
};
