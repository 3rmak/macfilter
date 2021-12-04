const User = require('../models/User');

const { passwordService } = require('../services');
const { httpStatusCodes } = require('../config');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const users = await User.find();

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  patch: async (req, res, next) => {
    try {
      const { userId } = req.params;
      let userToUpdate = req.body;

      if (userToUpdate.password) {
        const hashedPass = await passwordService.hashPass(userToUpdate.password);
        userToUpdate = {
          ...userToUpdate,
          password: hashedPass
        };
      }

      const updatedUser = await User.findByIdAndUpdate(userId, userToUpdate);

      if (!updatedUser) {
        res.status(httpStatusCodes.Internal_Server_Error)
          .json({ message: 'Ошибка. Устройство не было обновлено' });
      }

      res.json({ message: 'Успех. Изменения сохранены!' });
    } catch (e) {
      next(e);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findByIdAndDelete(userId);

      res.json({ user });
    } catch (e) {
      next(e);
    }
  }
};
