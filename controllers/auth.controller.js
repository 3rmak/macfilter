const { v4 } = require('uuid');

const User = require('../models/User');
const OAuth = require('../models/OAuth');

const { userNormalizer } = require('../helpers');
const { jwtService, passwordService } = require('../services');

module.exports = {
  register: async (req, res, next) => {
    try {
      const {
        email, password, role, access
      } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }

      const hashedPass = await passwordService.hashPass(password);
      const user = await User.create({
        email, password: hashedPass, role, id: v4(), access, isActive: true
      });

      const normalizedUser = await userNormalizer.deletePrivateFields(user);

      res.status(201).json({ message: 'Пользователь создан', user: normalizedUser });
    } catch (e) {
      next(e);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password +isActive');

      if (!user) {
        res.status(400).json({ message: 'Пользователя с таким email - не существует' });
      }

      await passwordService.isPassMatches(password, user.password);

      const { token } = jwtService.createUserToken();

      await OAuth.create({
        token, user: user._id
      });

      const normalizedUser = await userNormalizer.deletePrivateFields(user);
      res.json({ token, user: normalizedUser, message: 'Авторизовано' });
    } catch (e) {
      next(e);
    }
  }
};
