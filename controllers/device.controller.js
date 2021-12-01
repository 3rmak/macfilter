const Device = require('../models/Device');
const Department = require('../models/Department');

const { httpStatusCodes } = require('../config');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const { user } = req.locals;

      const devices = await Device.find({ department: { $in: user.access } });
      res.status(200).json(devices);
    } catch (e) {
      next(e);
    }
  },

  getDeviceById: async (req, res, next) => {
    try {
      const { deviceId } = req.params;
      const { user } = req.locals;

      const dbDevice = await Device.findById(deviceId);

      if (!dbDevice || !user.access.includes(dbDevice.department)) {
        res.status(httpStatusCodes.Bad_Request, 'Нет устройства с заданным id');
      }

      res.json(dbDevice);
    } catch (e) {
      next(e);
    }
  },

  post: async (req, res, next) => {
    try {
      const item = await Device.create({ ...req.body, addingDate: new Date() });

      // creating reference to device in department collection
      await Department.findOneAndUpdate(
        { _id: item.department },
        {
          $push: {
            devices: item._id
          }
        }
      );

      res.status(201).json({ message: 'Устройство добавлено', device: item });
    } catch (e) {
      next(e);
    }
  },

  patchSingleDevice: async (req, res, next) => {
    try {
      const { deviceId } = req.params;
      const device = req.body;

      // deleting field to take out a possibility to change devices department
      delete device.department;

      const dbDevice = await Device.findByIdAndUpdate(deviceId, { $set: { ...device } }, { new: true });

      res.status(200).json({ device: dbDevice, message: 'Изменения успешно сохранены!' });
    } catch (e) {
      next(e);
    }
  },

  patchDevicesAllowedParam: (req, res, next) => {
    const devicesToUpdate = req.body;
    devicesToUpdate.forEach((device) => {
      Device.findByIdAndUpdate(device._id, { allowed: device.allowed })
        .exec()
        .catch((e) => next(e));
    });

    res.json({ message: 'Изменения успешно сохранены' });
  },

  delete: async (req, res, next) => {
    try {
      const { deviceId } = req.params;

      const device = await Device.findById(deviceId);

      if (!device) {
        res.status(httpStatusCodes.Bad_Request, 'Нет устройства с заданным id');
      }

      await Department.findByIdAndUpdate(
        device.department,
        {
          $pull: { devices: deviceId }
        }
      );

      await Device.findByIdAndDelete(deviceId);

      res.status(200).json({ message: 'Удалено!' });
    } catch (e) {
      next(e);
    }
  }
};
