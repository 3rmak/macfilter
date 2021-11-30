const { v4 } = require('uuid');
const Department = require('../models/Department');
const User = require('../models/User');

module.exports = {
  getAllDepartments: async (req, res, next) => {
    try {
      const departments = await Department.find();
      res.status(200).json(departments);
    } catch (e) {
      next(e);
    }
  },

  getDepartmentById: async (req, res, next) => {
    try {
      const { departmentId } = req.params;
      const department = await Department.findById(departmentId);

      res.status(200).json(department);
    } catch (e) {
      next(e);
    }
  },

  createDepartment: async (req, res, next) => {
    try {
      const { name, devices } = req.body;
      const { user } = req.locals;

      const department = await Department.create({
        name,
        devices
      });

      let { userIdList } = req.body;
      if (!Array.isArray(userIdList) || !userIdList || userIdList.length === 0) {
        userIdList = [user._id];
      }

      await User.updateMany({
        _id: {
          $in: userIdList
        }
      }, {
        $push: {
          access: department._id
        }
      });

      res.status(201).json({ department, message: 'Филиал был успешно добавлен. Права пользователю добавлены' });
    } catch (e) {
      next(e);
    }
  }
};
