const Department = require('../models/Department');
const Device = require('../models/Device');

const ErrorHandler = require('../errors/ErrorHandler');

const { httpStatusCodes } = require('../config');

module.exports = {
  hasUserDepartmentAccess: (deviceCount = 'single') => (req, res, next) => {
    const { user } = req.locals;

    if (deviceCount === 'single') {
      const { department } = req.body;

      if (!department || !user.access.includes(department)) {
        throw new ErrorHandler(httpStatusCodes.Bad_Request, 'У пользователя недостаточно прав');
      }
    } else {
      const devices = req.body;

      devices.forEach((device) => {
        if (!user.access.includes(device.department)) {
          throw new ErrorHandler(httpStatusCodes.Bad_Request, 'У пользователя недостаточно прав');
        }
      });
    }

    next();
  },

  isMacUnique: async (req, res, next) => {
    try {
      const { mac, department } = req.body;
      const lowercaseMac = mac.toLowerCase();

      const dbDepartment = await Department.findById(department);

      if (!dbDepartment || dbDepartment.devices.length === 0) {
        next(new ErrorHandler(httpStatusCodes.Bad_Request, 'Bad input'));
      }

      const dbDevices = await Device.find({ _id: { $in: dbDepartment.devices } });
      const result = dbDevices.find((device) => device.mac === lowercaseMac);

      if (result) {
        next(new ErrorHandler(httpStatusCodes.Conflict, 'Устройство с таким же c MAC-адресом уже существует'));
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
