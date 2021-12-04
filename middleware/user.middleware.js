const ErrorHandler = require('../errors/ErrorHandler');

const { httpStatusCodes, userRoleEnum } = require('../config');

module.exports = {
  userAccessListValidator: (req, res, next) => {
    const { role, access } = req.body;

    /* eslint-disable array-bracket-newline, array-element-newline */
    if ([userRoleEnum.ADMIN, userRoleEnum.REGIONAL].includes(role)) {
      next();
    }

    if (access.length > 1) {
      next(new ErrorHandler(
        httpStatusCodes.Bad_Request,
        'Роль пользователя не удовлетворяет требованиям запроса. Проверьте правильность введенных данных'
      ));
    }

    next();
  }
};
