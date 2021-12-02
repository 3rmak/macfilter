const User = require('../models/User');

const ErrorHandler = require('../errors/ErrorHandler');

const { userRoleEnum, httpStatusCodes } = require('../config');

module.exports = {
  userIdListValidator: async (req, res, next) => {
    try {
      const { userIdList } = req.body;

      if (userIdList.length === 0) {
        next();
      }

      const users = await User.find({ _id: { $in: userIdList } });

      for (const user of users) {
        if ((user.role === userRoleEnum.ROUTER || user.role === userRoleEnum.NACH_ROP) && user.access.length > 0) {
          next(new ErrorHandler(
            httpStatusCodes.Bad_Request,
            `Пользователю ${user.email} невозможно предоставить доступ. Филиал не добавлен`
          ));
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
